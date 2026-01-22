# Contributing to Gesture3D Interactive Suite

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs
- Use the GitHub Issues tab
- Describe the bug clearly with steps to reproduce
- Include browser version and OS
- Add screenshots/videos if possible

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Explain how it would improve the project

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Test thoroughly across browsers
5. Commit with clear messages:
   ```bash
   git commit -m "Add: New gesture recognition algorithm"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

## Development Guidelines

### Code Style
- Use meaningful variable names
- Comment complex algorithms
- Follow existing code structure
- Keep functions focused and small

### Testing Checklist
- [ ] Works in Chrome, Edge, Firefox
- [ ] Gestures respond accurately
- [ ] No console errors
- [ ] Maintains 60 FPS on modern hardware
- [ ] Mobile-friendly (if applicable)

### Commit Message Format
```
Type: Brief description

Detailed explanation if needed

Examples:
- Add: New spiral shape to particle system
- Fix: Peace sign detection false positives
- Update: MediaPipe to version 0.5.1
- Docs: Add troubleshooting section to README
```

## Project Structure

Each HTML file is self-contained with:
- Embedded CSS styles
- JavaScript code
- Three.js and MediaPipe loaded via CDN

When adding features:
1. Add UI controls in the control panel
2. Update gesture detection in `hands.onResults()`
3. Implement rendering in `animate()` loop
4. Document new gestures in comments

## Questions?

Feel free to open an issue for any questions about contributing!

---

Thank you for making Gesture3D better! 🙌
