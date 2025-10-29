# physical-examination-app
# Physical Examination Training System

A comprehensive web-based training application for medical students to practice physical examination skills using a connected manikin.

![Version](https://img.shields.io/badge/version-1.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

### For Examiners (Instructors)
- Configure respiratory sounds for 4 lung zones
- Configure cardiac sounds for 4 heart areas
- WiFi and Bluetooth connectivity options
- Device selection with visual interface
- Real-time manikin control
- Apply settings with confirmation feedback

### For Examinees (Students)
- User registration (Name + Staff ID)
- Interactive examination interface
- 8 respiratory examination points
- 4 cardiac examination points
- Dropdown selection for sound identification
- Automatic scoring system
- Detailed performance review
- Print results functionality

### Scoring System
- Automatic grading
- Percentage-based scoring
- System-by-system breakdown (Respiratory & Cardiac)
- Location-by-location detailed review
- Color-coded results (correct/incorrect)
- Correct answer revelation for mistakes

## 🚀 Live Demo

Visit the live application: [Your Vercel URL will appear here after deployment]

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Physical examination manikin with WiFi/Bluetooth capability (for actual use)

## 🛠️ Installation

### Option 1: Use Directly from GitHub Pages or Vercel
Simply visit the deployed URL (no installation needed)

### Option 2: Run Locally

1. Clone the repository:
```bash
git clone https://github.com/Naser58164/physical-examination-app.git
cd physical-examination-app
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## 📖 Usage

### For Examiners:

1. Select **"Examiner"** role
2. Click **"Connect WiFi"** or **"Connect Bluetooth"**
3. Select your manikin from the device list
4. Configure sounds:
   - **Respiratory**: Apex, Middle, Base, Posterior
   - **Cardiac**: Aortic, Pulmonic, Tricuspid, Mitral
5. Click **"Apply All Settings to Manikin"**
6. Wait for confirmation (green checkmark)

### For Examinees:

1. Select **"Examinee"** role
2. Register with your name and staff ID
3. Click **"Start Examination"**
4. Connect to the manikin
5. Listen at each examination point
6. Select the sound you hear from dropdowns
7. Click **"Submit Examination"**
8. Review your detailed score report
9. Print or retake as needed

## 🎨 Screenshots

### Role Selection
Clean interface to choose between Examiner and Examinee roles.

### Device Connection
Select from available WiFi or Bluetooth devices with signal strength indicators.

### Examiner Control Panel
Configure all respiratory and cardiac sounds with dropdown menus.

### Examinee Examination
Select sounds for each anatomical location with instant feedback.

### Score Report
Detailed breakdown showing correct and incorrect answers with color coding.

## 🏗️ Project Structure

```
physical-examination-app/
├── index.html              # Main application file
├── README.md               # This file
├── USER_GUIDE.md          # Comprehensive user guide
├── CONNECTION_GUIDE.md    # Connection & submission guide
└── vercel.json            # Vercel configuration
```

## 🔧 Configuration

### Mock Devices
The application includes mock devices for testing:

**WiFi:**
- Manikin-Training-01 (192.168.1.100)
- Manikin-Training-02 (192.168.1.101)
- Manikin-Training-03 (192.168.1.102)

**Bluetooth:**
- SimMan Manikin A
- SimMan Manikin B
- Training Manikin C

### Customization
To add real device connectivity:
1. Modify the `generateMockDevices()` function
2. Implement Web Bluetooth API for Bluetooth
3. Implement WebSocket/HTTP for WiFi connectivity

## 🌐 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"

### Deploy to GitHub Pages

1. Go to repository Settings > Pages
2. Select branch: `main`
3. Select folder: `/ (root)`
4. Click "Save"

### Deploy to Netlify

1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Site is live instantly

## 🧪 Testing

### Mock Examination Flow:

1. **Examiner** sets: Right Base = Crackles, Rest = Normal
2. **Examinee** registers and connects
3. **Examinee** selects sounds at each location
4. System calculates score automatically
5. Detailed results displayed with correct answers

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔒 Privacy & Security

- All data stored locally during session
- No external data transmission (except to manikin)
- No cookies or tracking
- Personal information cleared on logout
- Safe for use in educational environments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Physical Examination Training System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍⚕️ About

Developed for medical education and training purposes. This system helps students practice auscultation skills in a safe, repeatable environment with objective assessment.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Medical educators for feedback and requirements
- Students for testing and suggestions
- Open source community

## 🗺️ Roadmap

- [ ] Add audio playback of reference sounds
- [ ] Implement timer for timed examinations
- [ ] Add student progress tracking
- [ ] Export results to PDF
- [ ] Multi-language support
- [ ] Real Web Bluetooth API integration
- [ ] Video demonstration library
- [ ] Mobile app version

---

**Built with ❤️ for medical education**
