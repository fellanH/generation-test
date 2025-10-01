# Contributing to Bongo AI Studio

Thank you for considering contributing to Bongo! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/bongo-ai-studio.git`
3. Install dependencies: `npm install`
4. Set up your `.env` file based on `.env.example`
5. Run the development server: `npm run dev`

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/model-selector-improvements`
- `fix/auth-redirect-issue`
- `docs/api-documentation`
- `refactor/gallery-components`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(gallery): add asset filtering by type
fix(auth): resolve session expiration issue
docs(readme): update installation instructions
```

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting (ESLint configuration)
- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions small and focused

### Component Guidelines

1. **File Structure**
   ```
   ComponentName.tsx
   ComponentName.module.css (if needed)
   ```

2. **Component Template**
   ```typescript
   'use client' // Only if client component
   
   import { useState } from 'react'
   
   interface ComponentNameProps {
     prop1: string
     prop2?: number
   }
   
   export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
     // Component logic
     return (
       <div>
         {/* JSX */}
       </div>
     )
   }
   ```

3. **Naming Conventions**
   - Components: PascalCase (`ModelSelector.tsx`)
   - Hooks: camelCase with 'use' prefix (`useAuth.ts`)
   - Utilities: camelCase (`formatDate.ts`)
   - Types: PascalCase (`UserProfile`)

### Testing

Currently, the project doesn't have comprehensive tests. Contributions to add testing infrastructure are welcome!

**Future testing setup:**
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright or Cypress
- API tests: Supertest

### Documentation

When adding new features:
1. Update relevant documentation files
2. Add JSDoc comments to functions
3. Update API.md if adding/modifying endpoints
4. Include examples in documentation

## Pull Request Process

1. **Before Submitting**
   - [ ] Code runs without errors
   - [ ] Follows code style guidelines
   - [ ] No console.log statements (use proper logging)
   - [ ] Type-check passes: `npm run type-check`
   - [ ] Lint passes: `npm run lint`

2. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   How has this been tested?
   
   ## Screenshots (if applicable)
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No new warnings
   ```

3. **Review Process**
   - At least one maintainer review required
   - Address all review comments
   - Keep PR scope focused
   - Squash commits before merge (if requested)

## Areas for Contribution

### High Priority

- [ ] **Testing Infrastructure**: Set up Jest and React Testing Library
- [ ] **Error Boundary**: Implement global error boundary component
- [ ] **Loading States**: Improve loading indicators and skeleton screens
- [ ] **Accessibility**: Ensure WCAG 2.1 AA compliance
- [ ] **Mobile Responsiveness**: Enhance mobile experience

### Phase 2 Features

- [ ] **Webhook Integration**: Replace polling with Fal.ai webhooks
- [ ] **Cost Tracking**: Display generation costs per job
- [ ] **Templates System**: Pre-configured prompt templates
- [ ] **LoRA Integration**: Support for custom LoRA models
- [ ] **Workflow Support**: Multi-step generation workflows

### Phase 3 Features

- [ ] **Model Fine-Tuning**: Interface for training custom models
- [ ] **Public Gallery**: Community sharing features
- [ ] **Social Features**: Like, comment, share functionality
- [ ] **Advanced Filters**: Search and filter gallery assets
- [ ] **Batch Operations**: Bulk asset management

### Infrastructure

- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Performance Monitoring**: Add Sentry or similar
- [ ] **Analytics**: Usage tracking and insights
- [ ] **Rate Limiting**: API rate limiting implementation
- [ ] **Caching Strategy**: Optimize API responses

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information.
```

## Feature Requests

We welcome feature requests! Please:

1. Check if feature already exists or is planned (see roadmap in README)
2. Provide clear use case and rationale
3. Consider implementation complexity
4. Be open to discussion and alternatives

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How might this be implemented?

**Alternatives Considered**
What other solutions did you consider?

**Additional Context**
Any mockups, examples, or references.
```

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory comments
- Trolling or insulting comments
- Personal or political attacks
- Publishing private information
- Unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to project maintainers.

## Questions?

- Open a GitHub Discussion for general questions
- Join our Discord community (coming soon)
- Check existing documentation first
- Tag issues appropriately

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing to Bongo AI Studio! 🎉
