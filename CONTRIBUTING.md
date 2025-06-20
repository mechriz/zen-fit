# Contributing to ZenFit Wellness App

Thank you for your interest in contributing to ZenFit! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide screenshots or screen recordings when helpful
- Specify your browser, OS, and device information

### Suggesting Features
- Open an issue with the "feature request" label
- Clearly describe the feature and its benefits
- Consider how it fits with the app's Gen Z focus
- Provide mockups or examples if possible

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

#### Development Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/zenfit-wellness-app.git
cd zenfit-wellness-app

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint
```

#### Code Style Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement responsive design (mobile-first)
- Add proper TypeScript types
- Write descriptive commit messages

#### Component Guidelines
- Keep components focused and single-purpose
- Use proper TypeScript interfaces
- Implement proper error handling
- Follow the existing naming conventions
- Add comments for complex logic

#### Testing
- Test on multiple screen sizes
- Verify mobile responsiveness
- Test user flows end-to-end
- Check accessibility features

## 📋 Pull Request Process

1. **Branch Naming**: Use descriptive names like `feature/user-profile-edit` or `fix/payment-validation`

2. **Commit Messages**: Use clear, descriptive commit messages
   ```
   feat: add user profile editing functionality
   fix: resolve payment validation issue
   docs: update README with deployment instructions
   ```

3. **Pull Request Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - Screenshots/videos of UI changes
   - Testing performed

4. **Review Process**:
   - All PRs require review before merging
   - Address feedback promptly
   - Keep PRs focused and reasonably sized

## 🎯 Priority Areas

We're particularly interested in contributions in these areas:

### High Priority
- Real M-Pesa API integration
- Video streaming implementation
- Performance optimizations
- Accessibility improvements
- Mobile UX enhancements

### Medium Priority
- Additional workout categories
- Therapist profile enhancements
- Progress tracking features
- Notification system
- Social features

### Low Priority
- UI polish and animations
- Additional payment methods
- Advanced analytics
- Admin dashboard

## 🔧 Technical Guidelines

### React/TypeScript
- Use functional components with hooks
- Implement proper TypeScript types
- Use React.memo for performance when needed
- Follow React best practices

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Maintain consistent spacing (8px system)
- Ensure mobile-first responsive design

### State Management
- Use React Context for global state
- Keep component state local when possible
- Use proper TypeScript types for state

### Performance
- Optimize images and assets
- Implement lazy loading where appropriate
- Minimize bundle size
- Use proper caching strategies

## 🎨 Design Guidelines

### Visual Design
- Follow the established color palette
- Use consistent typography (Inter font)
- Maintain proper contrast ratios
- Implement smooth transitions

### User Experience
- Keep Gen Z users in mind
- Prioritize mobile experience
- Use intuitive navigation patterns
- Provide clear feedback for actions

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast standards

## 📱 Mobile-First Development

- Design for mobile screens first
- Test on actual devices when possible
- Consider touch interactions
- Optimize for various screen sizes
- Ensure fast loading on mobile networks

## 🚀 Deployment

### Development
- All changes should work in development mode
- Test with `npm run build` before submitting

### Production
- Ensure changes don't break the production build
- Consider performance implications
- Test on the live deployment when possible

## 📞 Getting Help

- Join our community discussions
- Ask questions in GitHub issues
- Review existing code for patterns
- Check the documentation

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Community shout-outs

## 📄 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Respect different perspectives and experiences

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing private information

## 📋 Checklist for Contributors

Before submitting a PR, ensure:
- [ ] Code follows the style guidelines
- [ ] Changes are tested on mobile and desktop
- [ ] TypeScript types are properly defined
- [ ] No console errors or warnings
- [ ] Responsive design is maintained
- [ ] Accessibility is considered
- [ ] Documentation is updated if needed

Thank you for contributing to ZenFit! Together, we're building a platform that makes wellness accessible and engaging for Gen Z users. 🌟