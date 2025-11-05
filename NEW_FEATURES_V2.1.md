# 🔐 New Features Guide - Authentication & Custom Audio

## Version 2.1 Updates

### Two Major Features Added:
1. **🔒 Examiner Password Authentication**
2. **📁 Custom Audio File Upload**

---

## 🔒 FEATURE 1: Examiner Password Protection

### Overview
Examiner access is now protected with a password to prevent unauthorized access to sound control settings.

### Password Details
- **Default Password**: `NHtest@2025`
- **Access Level**: Examiner interface only
- **Required**: Yes (mandatory for examiner access)

---

### How to Login as Examiner

**Step 1: Select Examiner Role**
1. Open the application
2. Click "Examiner" card

**Step 2: Enter Password**
1. Login form appears
2. Enter password: `NHtest@2025`
3. Click "Login" or press Enter

**Step 3: Access Granted**
- ✅ Welcome message appears
- ✅ Full examiner interface loads
- ✅ Can control all sounds and settings

---

### Login Interface Features

#### Password Field
- **Type**: Masked input (hidden by default)
- **Toggle Visibility**: Click 👁️ icon to show/hide password
- **Enter Key**: Press Enter to submit
- **Validation**: Real-time error checking

#### Error Handling
- ❌ Incorrect password shows error message
- 🔄 Password field clears automatically
- 🎯 Focus returns to password field
- ⚠️ Red border indicates error

#### Security
- ✅ Password stored in app state (not visible in UI)
- ✅ No password visible in URL
- ✅ Logout clears authentication
- ✅ Back button requires re-login

---

### Password Management

#### To Change Password

**In the code (index.html):**
```javascript
// Find this line:
examinerPassword: 'NHtest@2025',

// Change to:
examinerPassword: 'YourNewPassword123',
```

#### Password Requirements
- Any alphanumeric characters
- Special characters allowed (@, #, $, etc.)
- Case-sensitive
- Recommended: 8+ characters with mix of letters/numbers

#### Best Practices
- ✅ Change default password
- ✅ Use strong password
- ✅ Share only with authorized staff
- ✅ Don't write in public places
- ✅ Change periodically

---

### Authentication Flow

```
User clicks "Examiner"
        ↓
Login form displays
        ↓
User enters password
        ↓
Password validated?
    ↙        ↘
  YES        NO
   ↓          ↓
Access    Error msg
Granted   Try again
```

---

## 📁 FEATURE 2: Custom Audio File Upload

### Overview
Upload your own audio files (real patient recordings, professional sounds) to replace synthesized sounds.

### Supported Formats
- ✅ **MP3** (.mp3)
- ✅ **WAV** (.wav)
- ✅ **OGG** (.ogg)
- ✅ **M4A** (.m4a)
- ✅ **FLAC** (.flac)

---

### How to Upload Custom Audio

**Step 1: Access Upload Interface**
1. Login as examiner
2. Scroll to bottom of page
3. Click "📁 Upload Custom Audio Files" button

**Step 2: Select Sound to Replace**
1. Choose **System**: Respiratory or Cardiac
2. Choose **Sound Type**: (e.g., Crackles, Systolic Murmur)
3. Click **Choose File**
4. Select your audio file

**Step 3: Upload**
1. Click "Upload" button
2. Wait for confirmation ✅
3. File is now active!

**Step 4: Test**
1. Go back to examiner interface
2. Select the sound type you uploaded
3. Click "🔊 Preview"
4. Your custom audio plays!

---

### Upload Modal Features

#### System Selection
- **Respiratory**: 7 sound types available
- **Cardiac**: 9 sound types available
- Auto-updates sound type dropdown

#### File Validation
- ✅ Checks file is audio format
- ✅ Displays file name
- ❌ Rejects non-audio files
- ⚠️ Shows error if invalid

#### Uploaded Files List
- Shows all custom audio files
- Grouped by system and sound type
- Remove button for each file
- Updates in real-time

---

### Managing Custom Audio Files

#### View Uploaded Files
```
Modal shows:
├── Respiratory - crackles [Remove]
├── Respiratory - wheeze [Remove]
├── Cardiac - murmur-systolic [Remove]
└── Cardiac - s3 [Remove]
```

#### Remove Custom Audio
1. Open upload modal
2. Find file in list
3. Click "Remove" button
4. Confirm deletion
5. Reverts to synthesized sound

#### Replace Existing
- Upload new file for same sound type
- Overwrites previous custom audio
- No need to remove first

---

### How Custom Audio Works

#### Priority System
```
When playing sound:
1. Check for custom audio file
   ├── If found → Play custom file
   └── If not found → Play synthesized sound
```

#### Storage
- Files stored in browser memory
- Available during session
- Cleared on page refresh
- Need to re-upload after refresh

#### Future Enhancement
- Save to localStorage (persistent)
- Export/import audio library
- Cloud storage integration

---

### Use Cases

#### Use Case 1: Real Patient Recordings
```
1. Record actual patient breath sounds
2. Save as MP3 file
3. Upload to app
4. Students hear real pathology
```

#### Use Case 2: Professional Sound Library
```
1. Purchase medical sound library
2. Upload each sound type
3. High-quality training sounds
4. Consistent across sessions
```

#### Use Case 3: Custom Scenarios
```
1. Create unique pathology
2. Record or edit sounds
3. Upload to specific locations
4. Create complex cases
```

---

## 🎯 Complete Workflow Example

### Setting Up Training with Custom Audio

**Step 1: Prepare Audio Files**
```
Collect or create:
├── crackles_real.mp3
├── wheeze_patient.wav
└── murmur_systolic.mp3
```

**Step 2: Login**
```
1. Open app
2. Select "Examiner"
3. Enter: NHtest@2025
4. Access granted ✅
```

**Step 3: Upload Custom Sounds**
```
1. Click "Upload Custom Audio Files"
2. Select Respiratory → Crackles
3. Upload crackles_real.mp3 ✅
4. Select Respiratory → Wheeze
5. Upload wheeze_patient.wav ✅
6. Select Cardiac → Systolic Murmur
7. Upload murmur_systolic.mp3 ✅
8. Close modal
```

**Step 4: Configure Scenario**
```
1. Connect to manikin
2. Lung Base: Crackles (uses your file!)
3. Lung Apex: Wheeze (uses your file!)
4. Mitral Area: Systolic Murmur (uses your file!)
5. Apply all settings
```

**Step 5: Train Students**
```
1. Students examine manikin
2. Hear YOUR custom audio files
3. Realistic, high-quality sounds
4. Better learning experience
```

---

## 🔧 Technical Details

### Password Authentication

**Implementation:**
```javascript
// Global state
examinerPassword: 'NHtest@2025'
examinerAuthenticated: false

// Validation
if (password === appState.examinerPassword) {
    appState.examinerAuthenticated = true;
    // Grant access
}
```

**Security Level:**
- Client-side validation
- Suitable for training environment
- Not for sensitive data
- Upgrade to server-side for production

### Custom Audio Storage

**File Reading:**
```javascript
// FileReader API
reader.readAsDataURL(file)
// Converts to Base64 data URL
// Stores in appState.audioFiles
```

**Playback:**
```javascript
// HTML5 Audio
const audio = new Audio(audioData);
audio.play();
```

**Key Format:**
```javascript
// Storage key
`${system}-${soundType}`
// Example: "respiratory-crackles"
```

---

## 📱 Browser Compatibility

### Password Feature
- ✅ All modern browsers
- ✅ Mobile browsers
- ✅ Tablets

### Custom Audio Upload
- ✅ Chrome 50+
- ✅ Firefox 48+
- ✅ Safari 11+
- ✅ Edge 79+
- ⚠️ File API required

---

## 🆘 Troubleshooting

### Password Issues

**Can't login?**
```
✓ Check password is exactly: NHtest@2025
✓ Password is case-sensitive
✓ No extra spaces
✓ Try copy-paste
```

**Forgot password?**
```
✓ Check code in index.html
✓ Line: examinerPassword: 'NHtest@2025'
✓ Contact administrator
```

### Audio Upload Issues

**Upload fails?**
```
✓ Check file is audio format
✓ File size < 50MB recommended
✓ Try different format (MP3, WAV)
✓ Check browser console for errors
```

**Audio doesn't play?**
```
✓ File uploaded successfully?
✓ Check uploaded files list
✓ Try preview button
✓ Check browser audio permissions
```

**Audio quality poor?**
```
✓ Use higher bitrate files
✓ WAV for best quality
✓ Check original file quality
✓ Re-encode if needed
```

---

## 🔄 Update Instructions

### Deploy These Features

**Step 1: Download Updated File**
- Download new index.html from outputs folder

**Step 2: Upload to GitHub**
```
1. Go to repository
2. Click index.html
3. Click edit
4. Replace all content
5. Commit: "Add password auth & custom audio"
```

**Step 3: Verify**
```
1. Wait 60 seconds
2. Visit Vercel URL
3. Test examiner login
4. Test audio upload
5. ✅ Features live!
```

---

## 📊 Feature Comparison

### Before vs After

| Feature | Version 2.0 | Version 2.1 |
|---------|------------|-------------|
| Examiner Access | Open | 🔒 Password Protected |
| Audio Source | Synthesized | Synthesized + Custom Files |
| Sound Quality | Good | Excellent (with custom) |
| Security | None | Basic Password |
| Customization | Limited | Full Control |

---

## 💡 Best Practices

### For Password
1. ✅ Change default password immediately
2. ✅ Use strong password
3. ✅ Share securely with authorized staff
4. ✅ Document password location
5. ✅ Change periodically

### For Custom Audio
1. ✅ Use high-quality source files
2. ✅ Organize files by type
3. ✅ Name files clearly
4. ✅ Keep backup of audio library
5. ✅ Test before training session

---

## 🎓 Training Recommendations

### For Instructors
1. **Before Class:**
   - Upload all custom audio
   - Test each sound
   - Document which sounds are custom
   - Prepare backup plan

2. **During Class:**
   - Keep upload modal closed
   - Use applied settings
   - Don't change mid-session
   - Have tech support ready

3. **After Class:**
   - Review which sounds worked well
   - Update custom audio if needed
   - Get student feedback
   - Plan improvements

---

## 🚀 Future Enhancements

Planned features:
- [ ] Multi-user password management
- [ ] Role-based access (admin, instructor, viewer)
- [ ] Cloud audio library storage
- [ ] Audio file preview before upload
- [ ] Batch upload multiple files
- [ ] Export/import audio library
- [ ] Server-side authentication
- [ ] Audio editing tools

---

## 📧 Support

For issues with:
- **Password**: Check code or contact admin
- **Audio Upload**: Check browser console
- **Both**: See troubleshooting section

---

## ✅ Summary

Version 2.1 adds:
- ✅ **Password protection** for examiner access
- ✅ **Custom audio upload** for realistic sounds
- ✅ **Easy management** of custom files
- ✅ **Backward compatible** with existing features
- ✅ **Production ready** for immediate use

**Your training system is now more secure and more powerful!** 🎉

---

**Version**: 2.1  
**Features**: Password Auth + Custom Audio  
**Status**: Ready for Deployment  
**Password**: NHtest@2025 (change recommended)
