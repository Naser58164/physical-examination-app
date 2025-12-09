/*
 * Arduino Simple Bridge Server (No DFPlayer Required!)
 * 
 * This Node.js server:
 * 1. Connects to Arduino via USB
 * 2. Provides HTTP API for web application
 * 3. Plays audio directly from computer speakers
 * 
 * No DFPlayer Mini needed - audio files stored on computer!
 * 
 * Requirements:
 * - Node.js installed
 * - npm packages: express, serialport, cors, play-sound
 * 
 * Installation:
 * npm install express serialport cors play-sound
 * npm install @serialport/parser-readline
 * 
 * Usage:
 * node arduino-simple-bridge.js
 * 
 * Audio files should be in ./audio/ folder:
 * ./audio/respiratory/normal.mp3
 * ./audio/respiratory/crackles.mp3
 * ./audio/cardiac/normal.mp3
 * etc.
 */

const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');
const player = require('play-sound')(opts = {});
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serial Port Configuration
let serialPort = null;
let parser = null;
let arduinoReady = false;
let lastResponse = "";
let currentAudio = null; // Current playing audio process

// Device information
const deviceInfo = {
  name: "Manikin-Training-01",
  type: "usb-simple",
  audioSource: "computer",
  port: "",
  status: "disconnected",
  version: "2.0"
};

// Audio file mapping
const audioMap = {
  respiratory: {
    normal: 'respiratory/normal.mp3',
    wheeze: 'respiratory/wheeze.mp3',
    crackles: 'respiratory/crackles.mp3',
    rhonchi: 'respiratory/rhonchi.mp3',
    stridor: 'respiratory/stridor.mp3',
    diminished: 'respiratory/diminished.mp3',
    absent: 'respiratory/absent.mp3'
  },
  cardiac: {
    normal: 'cardiac/normal.mp3',
    'murmur-systolic': 'cardiac/murmur-systolic.mp3',
    'murmur-diastolic': 'cardiac/murmur-diastolic.mp3',
    s3: 'cardiac/s3.mp3',
    s4: 'cardiac/s4.mp3',
    split: 'cardiac/split.mp3',
    stenosis: 'cardiac/stenosis.mp3',
    regurgitation: 'cardiac/regurgitation.mp3',
    prolapse: 'cardiac/prolapse.mp3'
  }
};

// Audio directory
const AUDIO_DIR = path.join(__dirname, 'audio');

// ==================== Serial Port Functions ====================

// Auto-detect Arduino port
async function detectArduinoPort() {
  console.log('Scanning for Arduino...');
  
  const { SerialPort } = require('serialport');
  const ports = await SerialPort.list();
  
  console.log('Available ports:');
  ports.forEach(port => {
    console.log(`  ${port.path} - ${port.manufacturer || 'Unknown'}`);
  });
  
  // Look for Arduino
  for (const port of ports) {
    const manufacturer = port.manufacturer || '';
    const vendorId = port.vendorId || '';
    
    if (manufacturer.includes('Arduino') || 
        manufacturer.includes('Silicon Labs') ||
        manufacturer.includes('FTDI') ||
        vendorId === '2341' ||
        vendorId === '1a86') {
      return port.path;
    }
  }
  
  if (ports.length > 0) {
    console.log(`Arduino not auto-detected. Using first port: ${ports[0].path}`);
    return ports[0].path;
  }
  
  return null;
}

// Connect to Arduino
async function connectArduino(portPath) {
  try {
    if (process.argv[2]) {
      portPath = process.argv[2];
      console.log(`Using specified port: ${portPath}`);
    }
    
    if (!portPath) {
      portPath = await detectArduinoPort();
    }
    
    if (!portPath) {
      throw new Error('No serial ports found. Please connect Arduino UNO.');
    }
    
    console.log(`\nConnecting to Arduino on ${portPath}...`);
    
    serialPort = new SerialPort({
      path: portPath,
      baudRate: 115200
    });
    
    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    
    serialPort.on('open', () => {
      console.log('✓ Serial port opened');
      deviceInfo.port = portPath;
      deviceInfo.status = 'connected';
    });
    
    serialPort.on('error', (err) => {
      console.error('Serial port error:', err.message);
      deviceInfo.status = 'error';
    });
    
    serialPort.on('close', () => {
      console.log('Serial port closed');
      deviceInfo.status = 'disconnected';
      arduinoReady = false;
    });
    
    parser.on('data', (data) => {
      const line = data.trim();
      console.log(`Arduino: ${line}`);
      
      if (line === 'READY') {
        arduinoReady = true;
        console.log('✓ Arduino is ready!');
      }
      
      // Handle play audio command from Arduino
      if (line.startsWith('PLAY_AUDIO:')) {
        const parts = line.substring(11).split(':');
        const system = parts[0];
        const soundType = parts[1];
        playAudioFile(system, soundType);
      }
      
      // Handle stop audio command
      if (line === 'STOP_AUDIO') {
        stopAudio();
      }
      
      // Handle volume change
      if (line.startsWith('SET_VOLUME:')) {
        const volume = parseInt(line.substring(11));
        console.log(`Setting system volume to ${volume}%`);
        // System volume control would go here
      }
      
      lastResponse = line;
    });
    
    await waitForReady();
    
    console.log('✓ Arduino connection established\n');
    return true;
    
  } catch (error) {
    console.error('Failed to connect to Arduino:', error.message);
    return false;
  }
}

// Wait for Arduino ready signal
function waitForReady() {
  return new Promise((resolve) => {
    const checkReady = setInterval(() => {
      if (arduinoReady) {
        clearInterval(checkReady);
        resolve();
      }
    }, 100);
    
    setTimeout(() => {
      clearInterval(checkReady);
      if (!arduinoReady) {
        console.log('Warning: Arduino READY signal not received, continuing...');
      }
      resolve();
    }, 10000);
  });
}

// Send command to Arduino
function sendCommand(command) {
  return new Promise((resolve, reject) => {
    if (!serialPort || !serialPort.isOpen) {
      reject(new Error('Serial port not open'));
      return;
    }
    
    lastResponse = "";
    
    const timeout = setTimeout(() => {
      reject(new Error('Command timeout'));
    }, 5000);
    
    const checkResponse = setInterval(() => {
      if (lastResponse) {
        clearTimeout(timeout);
        clearInterval(checkResponse);
        resolve(lastResponse);
      }
    }, 50);
    
    serialPort.write(command + '\n', (err) => {
      if (err) {
        clearTimeout(timeout);
        clearInterval(checkResponse);
        reject(err);
      }
    });
  });
}

// ==================== Audio Playback Functions ====================

function playAudioFile(system, soundType) {
  // Stop any currently playing audio
  stopAudio();
  
  // Get audio file path
  const audioFile = audioMap[system] && audioMap[system][soundType];
  
  if (!audioFile) {
    console.error(`Audio file not found: ${system}/${soundType}`);
    return;
  }
  
  const audioPath = path.join(AUDIO_DIR, audioFile);
  
  // Check if file exists
  if (!fs.existsSync(audioPath)) {
    console.error(`Audio file does not exist: ${audioPath}`);
    console.log('Please create audio files in the ./audio/ directory');
    return;
  }
  
  console.log(`Playing audio: ${audioPath}`);
  
  // Play audio file
  currentAudio = player.play(audioPath, (err) => {
    if (err) {
      console.error('Error playing audio:', err);
    } else {
      console.log('Audio playback finished');
      if (serialPort && serialPort.isOpen) {
        serialPort.write('PLAYING_STOP\n');
      }
    }
    currentAudio = null;
  });
  
  // Notify Arduino that playback started
  if (serialPort && serialPort.isOpen) {
    serialPort.write('PLAYING_START\n');
  }
}

function stopAudio() {
  if (currentAudio && currentAudio.kill) {
    console.log('Stopping audio playback');
    currentAudio.kill();
    currentAudio = null;
  }
}

// ==================== HTTP API Endpoints ====================

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Arduino Simple Bridge</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .status { padding: 15px; border-radius: 5px; margin: 20px 0; }
        .online { background: #d4edda; color: #155724; }
        .offline { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 20px 0; }
        ul { line-height: 2; }
        code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔌 Arduino Simple Bridge Server</h1>
        <div class="info">
          <strong>✨ Simplified Version!</strong><br>
          • No DFPlayer Mini needed<br>
          • No SD card required<br>
          • Audio plays from computer speakers
        </div>
        <div class="status ${deviceInfo.status === 'connected' ? 'online' : 'offline'}">
          <strong>Status:</strong> ${deviceInfo.status === 'connected' ? 'Online ✓' : 'Offline ✗'}<br>
          <strong>Device:</strong> ${deviceInfo.name}<br>
          <strong>Port:</strong> ${deviceInfo.port || 'Not connected'}<br>
          <strong>Type:</strong> ${deviceInfo.type}<br>
          <strong>Audio Source:</strong> ${deviceInfo.audioSource}
        </div>
        <h3>API Endpoints:</h3>
        <ul>
          <li><code>GET /info</code> - Device information</li>
          <li><code>POST /play</code> - Play sound</li>
          <li><code>POST /stop</code> - Stop sound</li>
          <li><code>POST /volume</code> - Set volume</li>
          <li><code>GET /status</code> - Current status</li>
          <li><code>GET /test</code> - Test sound</li>
        </ul>
        <h3>Audio Files Location:</h3>
        <p>Place your MP3 files in: <code>./audio/respiratory/</code> and <code>./audio/cardiac/</code></p>
        <p><strong>Server running on:</strong> http://localhost:${PORT}</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/info', async (req, res) => {
  try {
    res.json({
      name: deviceInfo.name,
      type: deviceInfo.type,
      audioSource: deviceInfo.audioSource,
      port: deviceInfo.port,
      status: deviceInfo.status,
      version: deviceInfo.version,
      capabilities: {
        respiratory: true,
        cardiac: true,
        volume: true,
        computerAudio: true
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/play', async (req, res) => {
  try {
    const { system, location, soundType } = req.body;
    
    if (!system || !soundType) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    
    const command = `PLAY:${system}:${location}:${soundType}`;
    const response = await sendCommand(command);
    
    if (response.includes('SUCCESS')) {
      res.json({
        success: true,
        message: 'Sound playing from computer',
        system: system,
        location: location,
        soundType: soundType,
        audioSource: 'computer'
      });
    } else if (response.includes('ERROR')) {
      res.status(404).json({ error: 'Sound not found' });
    } else {
      res.json({ success: true, message: 'Command sent' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/stop', async (req, res) => {
  try {
    stopAudio();
    await sendCommand('STOP');
    
    res.json({
      success: true,
      message: 'Sound stopped'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/volume', async (req, res) => {
  try {
    const { volume } = req.body;
    
    if (volume === undefined || volume < 0 || volume > 100) {
      return res.status(400).json({ error: 'Invalid volume (0-100)' });
    }
    
    const command = `VOLUME:${volume}`;
    await sendCommand(command);
    
    res.json({
      success: true,
      volume: volume
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/status', async (req, res) => {
  try {
    res.json({
      connected: deviceInfo.status === 'connected',
      port: deviceInfo.port,
      audioSource: deviceInfo.audioSource,
      arduinoReady: arduinoReady,
      playing: currentAudio !== null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test', async (req, res) => {
  try {
    await sendCommand('TEST');
    
    res.json({
      success: true,
      message: 'Test sound played from computer'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/ping', (req, res) => {
  res.json({ 
    status: 'online',
    connected: deviceInfo.status === 'connected',
    audioSource: 'computer'
  });
});

// ==================== Audio Directory Setup ====================

function setupAudioDirectory() {
  console.log('\nChecking audio directory...');
  
  // Create audio directory if it doesn't exist
  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR);
    console.log('✓ Created ./audio/ directory');
  }
  
  // Create subdirectories
  const subdirs = ['respiratory', 'cardiac'];
  subdirs.forEach(dir => {
    const dirPath = path.join(AUDIO_DIR, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`✓ Created ./audio/${dir}/ directory`);
    }
  });
  
  // Check for audio files
  let fileCount = 0;
  subdirs.forEach(dir => {
    const dirPath = path.join(AUDIO_DIR, dir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mp3'));
    fileCount += files.length;
    if (files.length > 0) {
      console.log(`  Found ${files.length} files in ${dir}/`);
    }
  });
  
  if (fileCount === 0) {
    console.log('\n⚠️  No audio files found!');
    console.log('Please add MP3 files to:');
    console.log('  ./audio/respiratory/normal.mp3');
    console.log('  ./audio/respiratory/crackles.mp3');
    console.log('  ./audio/cardiac/normal.mp3');
    console.log('  etc.\n');
  } else {
    console.log(`✓ Total audio files: ${fileCount}\n`);
  }
}

// ==================== Server Startup ====================

async function startServer() {
  console.log('=================================');
  console.log('Arduino Simple Bridge Server');
  console.log('(No DFPlayer Required!)');
  console.log('=================================\n');
  
  // Setup audio directory
  setupAudioDirectory();
  
  // Connect to Arduino
  const connected = await connectArduino();
  
  if (!connected) {
    console.log('\n⚠️  Warning: Could not connect to Arduino');
    console.log('Server will start anyway. Connect Arduino and restart.\n');
  }
  
  // Start HTTP server
  app.listen(PORT, () => {
    console.log('=================================');
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Access at: http://localhost:${PORT}`);
    console.log('=================================\n');
    
    console.log('✨ Audio plays from COMPUTER speakers!');
    console.log('No DFPlayer Mini needed.\n');
    console.log('Ready for connections from web application!');
    console.log('Press Ctrl+C to stop server\n');
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down...');
  stopAudio();
  if (serialPort && serialPort.isOpen) {
    serialPort.close();
  }
  process.exit(0);
});

// Start the server
startServer();
