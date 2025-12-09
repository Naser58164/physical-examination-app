/*
 * Physical Examination Manikin Controller (Simple Version)
 * Arduino UNO - Computer Audio Playback
 * 
 * This simplified version uses Arduino as a communication device only.
 * Audio is played directly from the computer (no DFPlayer needed!)
 * 
 * Hardware Requirements:
 * - Arduino UNO Board
 * - USB Cable (Type B for Arduino UNO)
 * - Optional: LED for status indication
 * - Optional: Push button for manual trigger
 * 
 * What's NOT needed:
 * ✗ DFPlayer Mini (removed!)
 * ✗ MicroSD Card (removed!)
 * ✗ Speaker (use computer speakers!)
 * ✗ Jumper wires for DFPlayer (removed!)
 * 
 * Audio playback happens on the computer via Node.js server
 * Arduino only sends/receives control signals
 * 
 * Connections:
 * Arduino UNO -> Computer
 * USB Port -> Computer USB (data + power)
 * 
 * Optional:
 * Pin 13 (Built-in LED) -> Status indicator
 * Pin 2 -> Push button to GND -> Manual test
 * 
 * Version: 2.0 (Simplified - No DFPlayer)
 * Compatible with: Physical Examination Training System v2.2
 */

// ==================== Pin Configuration ====================
#define LED_PIN 13               // Built-in LED for status
#define BUTTON_PIN 2             // Optional button for manual control

// ==================== Audio State ====================
struct AudioState {
  String system;        // "respiratory" or "cardiac"
  String location;      // e.g., "apex", "base", "aortic"
  String soundType;     // e.g., "normal", "crackles", "murmur-systolic"
  bool playing;
  int volume;           // 0-100 (percentage for computer audio)
};

AudioState currentAudio = {"", "", "", false, 80};

// ==================== Command Buffer ====================
String commandBuffer = "";
bool commandComplete = false;

// ==================== Device Information ====================
String deviceName = "Manikin-Training-01";
String deviceType = "usb-simple";
String firmwareVersion = "2.0";

// ==================== Setup Function ====================
void setup() {
  // Initialize hardware serial for communication with computer
  Serial.begin(115200);
  
  // Wait for serial connection
  delay(500);
  
  Serial.println();
  Serial.println(F("================================="));
  Serial.println(F("Physical Examination Manikin"));
  Serial.println(F("Arduino UNO Simple Controller"));
  Serial.println(F("No DFPlayer Required!"));
  Serial.println(F("================================="));
  Serial.println();

  // Initialize pins
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // LED blink to show startup
  blinkLED(3, 200);

  // Send ready signal
  Serial.println(F("DEVICE:Simple"));
  Serial.println(F("AUDIO:Computer"));
  Serial.println(F("READY"));
  Serial.println(F("Device ready - Audio plays from computer"));
  Serial.println(F("================================="));
  Serial.println();

  // LED on to show ready state
  digitalWrite(LED_PIN, HIGH);
}

// ==================== Main Loop ====================
void loop() {
  // Read commands from Serial (computer)
  if (Serial.available()) {
    char c = Serial.read();
    
    if (c == '\n' || c == '\r') {
      if (commandBuffer.length() > 0) {
        commandComplete = true;
      }
    } else {
      commandBuffer += c;
    }
  }

  // Process complete command
  if (commandComplete) {
    processCommand(commandBuffer);
    commandBuffer = "";
    commandComplete = false;
  }

  // Check button for manual control (optional)
  static unsigned long lastButtonPress = 0;
  if (digitalRead(BUTTON_PIN) == LOW && millis() - lastButtonPress > 500) {
    lastButtonPress = millis();
    handleTest();
  }

  // Update status LED
  if (!currentAudio.playing) {
    digitalWrite(LED_PIN, HIGH);  // Solid when idle
  } else {
    // Blink when playing
    static unsigned long lastBlink = 0;
    if (millis() - lastBlink > 100) {
      digitalWrite(LED_PIN, !digitalRead(LED_PIN));
      lastBlink = millis();
    }
  }

  delay(10);
}

// ==================== Command Processing ====================
void processCommand(String cmd) {
  cmd.trim();
  
  // Parse command format:
  // INFO
  // PLAY:respiratory:apex:crackles
  // STOP
  // VOLUME:80
  // STATUS
  // TEST
  
  if (cmd == "INFO") {
    handleInfo();
  }
  else if (cmd.startsWith("PLAY:")) {
    handlePlay(cmd);
  }
  else if (cmd == "STOP") {
    handleStop();
  }
  else if (cmd.startsWith("VOLUME:")) {
    handleVolume(cmd);
  }
  else if (cmd == "STATUS") {
    handleStatus();
  }
  else if (cmd == "TEST") {
    handleTest();
  }
  else if (cmd == "PING") {
    Serial.println("PONG");
  }
  else if (cmd == "PLAYING_START") {
    // Computer notifies Arduino that audio started playing
    currentAudio.playing = true;
    Serial.println("ACK:PLAYING_START");
  }
  else if (cmd == "PLAYING_STOP") {
    // Computer notifies Arduino that audio stopped
    currentAudio.playing = false;
    Serial.println("ACK:PLAYING_STOP");
  }
  else {
    Serial.println("ERROR:Unknown_Command");
  }
}

void handleInfo() {
  Serial.println(F("INFO:{"));
  Serial.print(F("  \"name\":\""));
  Serial.print(deviceName);
  Serial.println(F("\","));
  Serial.println(F("  \"type\":\"usb-simple\","));
  Serial.println(F("  \"audioSource\":\"computer\","));
  Serial.println(F("  \"status\":\"online\","));
  Serial.print(F("  \"version\":\""));
  Serial.print(firmwareVersion);
  Serial.println(F("\","));
  Serial.println(F("  \"capabilities\":{"));
  Serial.println(F("    \"respiratory\":true,"));
  Serial.println(F("    \"cardiac\":true,"));
  Serial.println(F("    \"volume\":true,"));
  Serial.println(F("    \"computerAudio\":true"));
  Serial.println(F("  }"));
  Serial.println(F("}"));
}

void handlePlay(String cmd) {
  // Parse: PLAY:respiratory:apex:crackles
  int firstColon = cmd.indexOf(':');
  int secondColon = cmd.indexOf(':', firstColon + 1);
  int thirdColon = cmd.indexOf(':', secondColon + 1);
  
  if (firstColon == -1 || secondColon == -1 || thirdColon == -1) {
    Serial.println(F("ERROR:Invalid_Play_Command"));
    return;
  }
  
  String system = cmd.substring(firstColon + 1, secondColon);
  String location = cmd.substring(secondColon + 1, thirdColon);
  String soundType = cmd.substring(thirdColon + 1);
  
  Serial.println();
  Serial.println(F("--- Play Request ---"));
  Serial.print(F("System: "));
  Serial.println(system);
  Serial.print(F("Location: "));
  Serial.println(location);
  Serial.print(F("Sound: "));
  Serial.println(soundType);
  
  // Update current state
  currentAudio.system = system;
  currentAudio.location = location;
  currentAudio.soundType = soundType;
  currentAudio.playing = true;
  
  // Blink LED to indicate command received
  blinkLED(3, 50);
  
  // Send success response
  // Computer will receive this and play the audio
  Serial.println(F("SUCCESS:Play_Command_Received"));
  Serial.print(F("PLAY_AUDIO:"));
  Serial.print(system);
  Serial.print(F(":"));
  Serial.print(soundType);
  Serial.println();
}

void handleStop() {
  Serial.println(F("Stop request received"));
  
  currentAudio.playing = false;
  
  Serial.println(F("SUCCESS:Stop_Command_Received"));
  Serial.println(F("STOP_AUDIO"));
}

void handleVolume(String cmd) {
  // Parse: VOLUME:80
  int colonPos = cmd.indexOf(':');
  if (colonPos == -1) {
    Serial.println(F("ERROR:Invalid_Volume_Command"));
    return;
  }
  
  int volume = cmd.substring(colonPos + 1).toInt();
  
  if (volume < 0) volume = 0;
  if (volume > 100) volume = 100;
  
  currentAudio.volume = volume;
  
  Serial.print(F("Volume set to: "));
  Serial.print(volume);
  Serial.println(F("%"));
  Serial.println(F("SUCCESS:Volume_Set"));
  Serial.print(F("SET_VOLUME:"));
  Serial.println(volume);
}

void handleStatus() {
  Serial.println(F("STATUS:{"));
  Serial.println(F("  \"connected\":true,"));
  Serial.print(F("  \"playing\":"));
  Serial.print(currentAudio.playing ? "true" : "false");
  Serial.println(F(","));
  Serial.print(F("  \"volume\":"));
  Serial.print(currentAudio.volume);
  Serial.println(F(","));
  Serial.println(F("  \"audioSource\":\"computer\","));
  Serial.println(F("  \"currentSound\":{"));
  Serial.print(F("    \"system\":\""));
  Serial.print(currentAudio.system);
  Serial.println(F("\","));
  Serial.print(F("    \"location\":\""));
  Serial.print(currentAudio.location);
  Serial.println(F("\","));
  Serial.print(F("    \"soundType\":\""));
  Serial.print(currentAudio.soundType);
  Serial.println(F("\""));
  Serial.println(F("  }"));
  Serial.println(F("}"));
}

void handleTest() {
  Serial.println(F("Test sound requested"));
  Serial.println(F("PLAY_AUDIO:respiratory:normal"));
  Serial.println(F("SUCCESS:Test_Command_Sent"));
  
  // Blink LED
  blinkLED(5, 100);
}

// ==================== Utility Functions ====================
void blinkLED(int times, int delayMs) {
  for (int i = 0; i < times; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(delayMs);
    digitalWrite(LED_PIN, LOW);
    delay(delayMs);
  }
}

// ==================== Diagnostic Functions ====================
void printStatus() {
  Serial.println(F("\n--- Current Status ---"));
  Serial.print(F("Device: "));
  Serial.println(deviceName);
  Serial.print(F("Playing: "));
  Serial.println(currentAudio.playing ? "Yes" : "No");
  Serial.print(F("System: "));
  Serial.println(currentAudio.system);
  Serial.print(F("Location: "));
  Serial.println(currentAudio.location);
  Serial.print(F("Sound: "));
  Serial.println(currentAudio.soundType);
  Serial.print(F("Volume: "));
  Serial.print(currentAudio.volume);
  Serial.println(F("%"));
  Serial.println(F("-------------------\n"));
}
