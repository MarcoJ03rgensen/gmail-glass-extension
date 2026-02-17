# Contributing to Gmail Glass

First off, thank you for considering contributing to Gmail Glass! 🎉

It's people like you that make Gmail Glass such a great tool. This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Style Guidelines](#style-guidelines)
  - [CSS Style Guide](#css-style-guide)
  - [Git Commit Messages](#git-commit-messages)
- [Development Setup](#development-setup)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by basic principles of respect and professionalism. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues) to avoid duplicates.

#### How to Submit a Good Bug Report

Bugs are tracked as [GitHub issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots are very helpful!)
- **Describe the behavior you observed** and what you expected
- **Include details about your configuration**:
  - Chrome version (`chrome://version/`)
  - Operating system (Windows 10, macOS 14, etc.)
  - Extension version
  - Other Gmail extensions installed

**Bug Report Template:**

```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- Chrome Version: [e.g., 120.0.6099.109]
- OS: [e.g., Windows 11]
- Extension Version: [e.g., 1.0.0]
- Other Extensions: [list any other Gmail extensions]

## Additional Context
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are also tracked as [GitHub issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues).

#### How to Submit a Good Enhancement Suggestion

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if possible
- **List any alternatives** you've considered

**Enhancement Template:**

```markdown
## Feature Description
A clear description of the feature you'd like to see.

## Motivation
Why would this feature be useful? What problem does it solve?

## Proposed Solution
How you envision this feature working.

## Alternatives Considered
Any alternative solutions or features you've considered.

## Additional Context
Any other context, mockups, or examples.
```

### Pull Requests

Pull requests are the best way to propose changes to the codebase.

#### Process

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** in your forked repository
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

#### Pull Request Guidelines

- Fill in the pull request template completely
- Link any related issues
- Include screenshots for visual changes
- Ensure your code follows the [style guidelines](#style-guidelines)
- Test on multiple Gmail interfaces (inbox, compose, reading pane)
- Consider different screen sizes and Gmail themes

**Pull Request Template:**

```markdown
## Description
Briefly describe your changes.

## Related Issues
Fixes #(issue number)

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would break existing functionality)
- [ ] Documentation update

## Changes Made
- Detail 1
- Detail 2
- Detail 3

## Screenshots (if applicable)
[Add screenshots here]

## Testing
Describe how you tested your changes:
- [ ] Tested on Gmail inbox
- [ ] Tested on Gmail compose window
- [ ] Tested on Gmail settings
- [ ] Tested with multiple emails
- [ ] Tested on different screen sizes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes don't generate new warnings
- [ ] I have tested my changes
```

## Style Guidelines

### CSS Style Guide

Follow these conventions to maintain consistency:

#### Formatting

```css
/* ✅ Good */
.selector {
  property: value !important;
  another-property: value !important;
}

/* ❌ Bad */
.selector{property:value!important;another-property:value!important;}
```

#### Organization

1. **Use clear section comments**:
   ```css
   /* ===========================
      Section Name
      =========================== */
   ```

2. **Group related selectors** together

3. **Order properties logically**:
   - Positioning (position, top, left, etc.)
   - Box model (display, width, height, padding, margin)
   - Visual (background, border, etc.)
   - Typography (font, color, text-align, etc.)
   - Other (transition, animation, etc.)

#### Naming Conventions

- Use CSS variables for reusable values:
  ```css
  :root {
    --variable-name: value;
  }
  ```

- Use descriptive variable names:
  ```css
  /* ✅ Good */
  --glass-bg: rgba(255, 255, 255, 0.15);
  --accent-blue: rgba(100, 181, 246, 0.85);
  
  /* ❌ Bad */
  --bg: rgba(255, 255, 255, 0.15);
  --color1: rgba(100, 181, 246, 0.85);
  ```

#### Glassmorphism Best Practices

1. **Always include webkit prefix** for `backdrop-filter`:
   ```css
   backdrop-filter: blur(12px) !important;
   -webkit-backdrop-filter: blur(12px) !important;
   ```

2. **Use appropriate opacity** (0.1 to 0.3 typical):
   ```css
   background: rgba(255, 255, 255, 0.15) !important;
   ```

3. **Include subtle borders** for definition:
   ```css
   border: 1px solid rgba(255, 255, 255, 0.3) !important;
   ```

4. **Add smooth transitions**:
   ```css
   transition: all 0.3s ease !important;
   ```

#### Important Usage

This extension requires `!important` to override Gmail's inline styles. Use it consistently:

```css
/* Required for Gmail */
.selector {
  property: value !important;
}
```

#### Comments

- Add comments for complex selectors
- Explain why something is done a certain way
- Document any Gmail-specific hacks or workarounds

```css
/* Gmail uses inline styles, so !important is required */
.zA {
  background: var(--glass-bg) !important;
}

/* Hover effect with lift animation */
.zA:hover {
  transform: translateY(-2px) !important;
}
```

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when applicable

**Examples:**

```
✅ Good:
Add glass effect to compose window
Fix hover animation on email cards
Update README with installation instructions
Refactor CSS variables for better organization

❌ Bad:
fixed stuff
Updated files
changes
```

**Format:**

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**

```
feat: Add custom color picker for accent colors

Implement a color picker in the options page that allows users
to customize the accent colors used throughout the interface.

Closes #42
```

## Development Setup

### Prerequisites

- Google Chrome (version 76+)
- Git
- Text editor (VS Code, Sublime Text, etc.)

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/gmail-glass-extension.git
   cd gmail-glass-extension
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/MarcoJ03rgensen/gmail-glass-extension.git
   ```

4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

5. **Load the extension** in Chrome:
   - Go to `chrome://extensions/`
   - Enable Developer Mode
   - Click "Load unpacked"
   - Select the `gmail-glass-extension` folder

6. **Make changes** to `styles.css`

7. **Test changes**:
   - Go to `chrome://extensions/`
   - Click the reload icon on Gmail Glass
   - Hard refresh Gmail (`Ctrl + Shift + R`)

8. **Commit your changes**:
   ```bash
   git add styles.css
   git commit -m "feat: Add feature description"
   ```

9. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

10. **Submit a pull request** on GitHub

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

## Testing

### Manual Testing Checklist

Before submitting a PR, test your changes on:

- [ ] **Gmail Inbox** - Email list view
- [ ] **Email Reading Pane** - Opening and reading emails
- [ ] **Compose Window** - Creating new emails
- [ ] **Reply/Forward** - Responding to emails
- [ ] **Search** - Using Gmail search
- [ ] **Navigation** - Sidebar links and labels
- [ ] **Settings** - Gmail settings panel
- [ ] **Labels/Categories** - Label management
- [ ] **Attachments** - File attachments
- [ ] **Multiple Screens** - Different window sizes

### Visual Regression Testing

Compare before/after screenshots:

1. Take screenshots before your changes
2. Apply your changes
3. Take screenshots after your changes
4. Compare for unintended side effects

### Browser Testing

If possible, test on:

- Chrome (latest)
- Edge (latest)
- Opera (latest)

### Gmail Interface Testing

Test with different Gmail settings:

- Default theme
- Dark mode
- Compact density
- Default density
- Comfortable density

## Questions?

If you have questions about contributing:

1. Check existing [issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues)
2. Read the [documentation](README.md)
3. Open a new issue with the `question` label

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- The repository contributors list

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute! 💙

---

Made with 💙 by Marco Birkedahl Jørgensen
