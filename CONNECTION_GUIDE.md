# Quick Reference - Connection & Submission Features

## 🔌 Device Connection (WiFi/Bluetooth)

### How to Connect:

1. **Click "Connect WiFi" or "Connect Bluetooth"**
   - A popup modal will appear with "Scanning for devices..."
   
2. **Wait for Device List (2 seconds)**
   - System scans for available manikins
   - Shows list of discovered devices

3. **Select Your Manikin**
   - Click on the device you want to connect to
   - Each device shows:
     - **WiFi**: Device name, IP address, signal strength
     - **Bluetooth**: Device name, MAC address, pairing status

4. **Connection Confirmation**
   - Status indicator turns green
   - Shows connected device name
   - Connect buttons disappear
   - Disconnect button appears

### Mock Devices (for testing):

**WiFi Devices:**
- Manikin-Training-01 (192.168.1.100)
- Manikin-Training-02 (192.168.1.101)
- Manikin-Training-03 (192.168.1.102)

**Bluetooth Devices:**
- SimMan Manikin A
- SimMan Manikin B
- Training Manikin C

### Disconnecting:
- Click "Disconnect" button
- Confirms before disconnecting
- Returns to connection screen
- Can reconnect to same or different device

---

## 📤 Apply Settings to Manikin (Examiner)

### Steps:

1. **Configure Sounds**
   - Select sounds for all respiratory locations
   - Select sounds for all cardiac locations

2. **Click "Apply All Settings to Manikin"**
   - Must be connected first
   - Button shows "Applying Settings..." with loading state
   - System sends configuration to manikin

3. **Confirmation**
   - Button turns green with checkmark "✓ Settings Applied!"
   - Alert shows all applied settings:
     - Respiratory: Apex, Middle, Base, Posterior
     - Cardiac: Aortic, Pulmonic, Tricuspid, Mitral
   - Button returns to normal after 2 seconds

4. **Settings are Now Active**
   - Manikin will produce configured sounds
   - Ready for examinee examination

### What Gets Sent:
```
Respiratory Settings:
- Apex (applies to left & right apex)
- Middle (applies to left & right middle)
- Base (applies to left & right base)  
- Posterior (applies to upper & lower posterior)

Cardiac Settings:
- Aortic Area
- Pulmonic Area
- Tricuspid Area
- Mitral Area
```

### Important Notes:
- ✅ Settings persist until changed
- ✅ Can update individual sounds anytime
- ✅ Must click "Apply All Settings" for changes to take effect
- ⚠️ Must be connected to manikin first

---

## 📝 Submit Examination (Examinee)

### Steps:

1. **Connect to Manikin**
   - Choose WiFi or Bluetooth
   - Select device from list

2. **Listen and Select Sounds**
   - Use stethoscope on manikin
   - Select what you hear from dropdowns:
     - 8 respiratory locations
     - 4 cardiac locations
   - Selected items highlight in green

3. **Click "Submit Examination"**
   - Button shows "Submitting..."
   - System validates and calculates score

### Validation Alerts:

**If Not Connected:**
```
❌ Please connect to the manikin first before submitting!
```

**If Incomplete (missing answers):**
```
⚠️ You have not answered all questions!

Missing: X respiratory and X cardiac location(s).

Do you want to submit anyway?
```
- Click "OK" to submit partial exam
- Click "Cancel" to continue answering

### After Submission:

**Score Display Shows:**
1. **Overall Percentage** (e.g., 75%)
2. **Total Correct** (e.g., 9 out of 12)
3. **Respiratory Score** (e.g., 6/8)
4. **Cardiac Score** (e.g., 3/4)

**Detailed Review Shows:**
- ✅ Correct answers in green
- ❌ Incorrect answers in red with correct answer shown
- Location-by-location breakdown

**Action Buttons:**
- 🖨️ **Print Results** - Save or print score report
- 🔄 **Retake Examination** - Clear answers and try again
- 🚪 **Logout** - End session and return to registration

---

## 🎯 Example Workflow

### Complete Examination Flow:

**Examiner:**
1. Selects "Examiner" role
2. Connects to "Manikin-Training-01" via WiFi
3. Sets: Right Base = Crackles, everything else = Normal
4. Clicks "Apply All Settings to Manikin"
5. Sees confirmation: "✓ Settings Applied!"

**Examinee:**
1. Selects "Examinee" role
2. Registers: Name = "John Smith", Staff ID = "MED-2024-001"
3. Clicks "Start Examination"
4. Connects to same "Manikin-Training-01" via WiFi
5. Listens at each location with stethoscope
6. Selects sounds from dropdowns
7. Clicks "Submit Examination"
8. Views results: 92% (11/12 correct)
9. Reviews detailed breakdown
10. Prints results for records

---

## 🔧 Troubleshooting

### Connection Issues:

**Problem:** Device list is empty
- **Solution:** Wait for full 2-second scan, then click Cancel and try again

**Problem:** Can't connect to device
- **Solution:** Ensure manikin is powered on and in range

**Problem:** Connection keeps dropping
- **Solution:** Check WiFi signal or Bluetooth pairing, reconnect

### Submission Issues:

**Problem:** "Apply Settings" button doesn't work
- **Solution:** Must connect to manikin first

**Problem:** Can't submit examination
- **Solution:** Must connect to manikin first

**Problem:** Score seems wrong
- **Solution:** Check console logs for detailed comparison, verify examiner settings were applied

### General Issues:

**Problem:** Page not responding
- **Solution:** Refresh page (will lose current session data)

**Problem:** Buttons are grayed out
- **Solution:** Wait for previous operation to complete

---

## 💡 Tips for Success

### For Examiners:
- ✅ Always click "Apply All Settings" after making changes
- ✅ Wait for green confirmation before starting examination
- ✅ Test connection before bringing in students
- ✅ Document your sound settings for reference

### For Examinees:
- ✅ Listen carefully at each location before selecting
- ✅ Watch for green highlights showing answered questions
- ✅ Review all answers before submitting
- ✅ Use "Reset All" if you want to start over
- ✅ Save or print results for your records

---

## 🔒 Privacy & Security

- All data stored locally during session only
- Connection is direct between device and manikin
- No data sent to external servers
- Logout clears all personal information
- Safe for use in training environments

---

**Last Updated:** 2025  
**Version:** 1.1
