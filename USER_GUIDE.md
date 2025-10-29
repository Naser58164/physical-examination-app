# Physical Examination Training System - User Guide

## Overview
This web application is designed for medical training with a physical examination manikin. It has two main user roles: **Examiner** and **Examinee**.

---

## 🎯 How It Works

### **Examiner Role** (Instructor/Teacher)
The examiner sets up the examination scenario by configuring what sounds the manikin should produce.

#### Steps:
1. Select **"Examiner"** role from the home screen
2. Connect to the manikin via **WiFi** or **Bluetooth**
3. Configure **Respiratory Sounds** for different lung areas:
   - Lung Apex, Middle, Base, and Posterior
   - Options: Normal, Wheezing, Crackles, Rhonchi, Stridor, Diminished, Absent
4. Configure **Cardiac Sounds** for heart auscultation points:
   - Aortic, Pulmonic, Tricuspid, and Mitral areas
   - Options: Normal S1-S2, Murmurs, Gallops, Stenosis, Regurgitation, etc.
5. Click **"Apply All Settings to Manikin"** to send the configuration
6. The manikin will now produce the configured sounds when examined

---

### **Examinee Role** (Student/Trainee)
The examinee listens to the manikin and identifies the sounds at each examination point.

#### Steps:
1. Select **"Examinee"** role from the home screen
2. **Register** with:
   - Full Name
   - Staff ID
3. Click **"Start Examination"**
4. Connect to the manikin via **WiFi** or **Bluetooth**
5. For each body location, select the sound you hear from the dropdown:
   - **8 Respiratory locations** (right/left apex, middle, base, posterior upper/lower)
   - **4 Cardiac locations** (aortic, pulmonic, tricuspid, mitral)
6. Click **"Submit Examination"** when complete
7. View your **detailed score report**

---

## 📊 Scoring System

### Automatic Grading
The system automatically compares the examinee's answers with the examiner's configured sounds.

### Score Display Includes:
- **Overall Percentage**: Total correct answers out of all questions
- **Respiratory Score**: Correct respiratory answers (out of 8)
- **Cardiac Score**: Correct cardiac answers (out of 4)

### Detailed Review
After submission, examinees receive:
- ✅ **Correct answers** highlighted in green
- ❌ **Incorrect answers** highlighted in red with the correct answer shown
- Location-by-location breakdown for both systems
- Option to print results for records

---

## 🔄 Workflow Example

### Scenario: Testing a student on pneumonia sounds

1. **Examiner sets up:**
   - Right Base: Crackles
   - Right Middle: Diminished
   - All other lung areas: Normal
   - All cardiac areas: Normal

2. **Examinee examines the manikin:**
   - Listens at each point
   - Selects sounds from dropdowns
   - Submits examination

3. **System calculates:**
   - Compares student answers to examiner settings
   - If student correctly identified:
     - Crackles at right base ✓
     - Diminished at right middle ✓
     - Normal everywhere else ✓
   - Score: 100% (12/12 correct)

---

## 💡 Key Features

### For Examiners:
- Real-time sound configuration
- Multiple pathological sound options
- WiFi/Bluetooth connectivity
- Reset to normal function
- Visual connection status

### For Examinees:
- User registration for tracking
- Dropdown selection for each location
- Visual feedback (green highlight when answered)
- Automatic scoring
- Detailed performance review
- Print results option
- Retake examination option

### Scoring Features:
- Instant grading upon submission
- Percentage and fraction scores
- System-by-system breakdown
- Answer-by-answer review
- Color-coded results (green/red)
- Correct answer revelation for wrong answers

---

## 🔧 Technical Details

### Connectivity:
- WiFi and Bluetooth options available
- Visual connection status indicator
- Must connect before using examination features

### Data Tracking:
- Examinee name and staff ID recorded
- Timestamp of examination
- All answers logged to console
- Results can be printed for records

### Validation:
- Requires all fields before submission
- Warning if incomplete examination
- Can submit partial examination if confirmed

---

## 📱 User Interface

### Color Coding:
- **Purple gradient**: Headers and primary buttons
- **Green**: Correct answers and connection status
- **Red**: Incorrect answers and disconnect status
- **White/Gray**: Content areas

### Responsive Design:
- Works on desktop, tablet, and mobile devices
- Adaptive grid layout for different screen sizes

---

## 🎓 Educational Benefits

1. **Objective Assessment**: Standardized scoring eliminates bias
2. **Immediate Feedback**: Students see results instantly
3. **Detailed Review**: Learn from mistakes with correct answers shown
4. **Record Keeping**: Print results for portfolios
5. **Repeatable Practice**: Retake option for skill improvement
6. **Realistic Simulation**: Multiple pathological sounds for varied scenarios

---

## 📝 Tips for Best Use

### For Examiners:
- Test manikin connection before the session
- Create varied scenarios (mix normal and abnormal sounds)
- Use "Reset All to Normal" between different students
- Document your sound settings for record keeping

### For Examinees:
- Listen carefully at each location before selecting
- Use the manikin systematically (e.g., top to bottom)
- Take your time - there's no time limit
- Review detailed results to understand mistakes
- Use retake feature to practice until proficient

---

## 🔒 Privacy & Data

- Registration data (name, staff ID) stored locally during session
- No external data transmission (except to manikin)
- Results logged to browser console for instructor review
- Print function available for record keeping
- Logout clears all personal data from session

---

## 🆘 Troubleshooting

### Can't connect to manikin:
- Ensure manikin is powered on
- Check WiFi/Bluetooth is enabled
- Verify network connectivity
- Try alternate connection method

### Examination won't submit:
- Ensure you're connected to manikin
- Check if all questions are answered (or confirm partial submission)
- Refresh page if needed

### Scores seem incorrect:
- Verify examiner set sounds before examination
- Check console logs for detailed comparison
- Ensure exact sound matches (case-sensitive)

---

## 🚀 Future Enhancements

Potential additions:
- Audio playback of reference sounds
- Timer for timed examinations
- Student progress tracking over time
- Export results to CSV/PDF
- Multi-language support
- Video demonstrations

---

**Version**: 1.0  
**Last Updated**: 2025  
**Developed For**: Medical Training Simulation
