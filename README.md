# Physical Examination Training System v2.3

Interactive web-based training system for nursing students with Arduino-controlled manikin integration.

## 🎯 What's New in v2.3

- ✅ **Arduino UNO USB Integration** - Control manikin via USB connection
- ✅ **Computer Audio Playback** - No DFPlayer Mini required!
- ✅ **Real-time Connection Status** - Visual indicators
- ✅ **Node.js Bridge Server** - Web app to Arduino communication
- ✅ **Cost-Effective** - Only ~$10 per manikin

## 📦 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR-USERNAME/physical-examination-training.git
cd physical-examination-training
npm install
```

### 2. Setup Arduino

1. Open `Arduino_Simple_Controller.ino` in Arduino IDE
2. Upload to Arduino UNO
3. Keep Arduino plugged into USB

### 3. Add Audio Files

```bash
mkdir -p audio/respiratory audio/cardiac
# Add MP3 files to these folders
```

### 4. Start Server

```bash
npm start
```

### 5. Open Web App

Open `index.html` in browser or deploy to Vercel/GitHub Pages

## 🏥 System Architecture

```
Web App → Node.js Server → Arduino UNO → Computer Speakers
```

## 📝 Files to Add to GitHub

Required files:
- `index.html` - Web application
- `arduino-simple-bridge.js` - Node.js server
- `Arduino_Simple_Controller.ino` - Arduino code
- `package.json` - Dependencies
- `README.md` - This file

Optional documentation:
- `NODEJS_DEEP_GUIDE.md` - Complete Node.js tutorial
- `NODEJS_QUICK_REFERENCE.txt` - Command reference
- `SIMPLE_SETUP_GUIDE.txt` - Setup instructions

## 🔧 Configuration

Server URL in `index.html`:
```javascript
value="http://localhost:3000"
```

Password in `index.html`:
```javascript
const PASSWORD = 'NHtest@2025';
```

Device name in `Arduino_Simple_Controller.ino`:
```cpp
String deviceName = "Manikin-Training-01";
```

## 🚀 Deployment

### GitHub Pages
```bash
git push origin main
# Enable Pages in repo Settings
```

### Vercel
```bash
vercel
```

## 💰 Cost

- Arduino UNO: $7
- USB Cable: $3
- **Total: $10**

Software & hosting: FREE

## 📚 Documentation

Full documentation in repository:
- Setup guides
- Troubleshooting
- API reference
- Shopping lists

## 📧 Contact

**Naser** - Clinical Facilitator  
Nizwa Hospital - Nursing Department, Oman

---

**Version**: 2.3  
**License**: MIT  
Made with ❤️ for nursing education
