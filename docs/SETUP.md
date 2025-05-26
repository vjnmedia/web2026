# Development Environment Setup Guide

## Prerequisites

### Required Software
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- PostgreSQL (v14 or higher)
- VS Code (recommended)

### VS Code Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- Import Cost
- Path Intellisense

## Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/jeune-avenir-connect.git
cd jeune-avenir-connect
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
```

4. **Database Setup**
```bash
# Create the database
createdb jeune_avenir_connect

# Run migrations
npm run migrate

# Seed the database (if needed)
npm run seed
```

5. **Start Development Server**
```bash
npm run dev
```

## Project Structure

```
jeune-avenir-connect/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── contexts/      # React contexts
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   ├── styles/        # Global styles
│   └── assets/        # Static assets
├── public/            # Public assets
├── docs/             # Documentation
├── tests/            # Test files
└── prisma/           # Database schema
```

## Development Workflow

1. **Create a New Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
- Follow the coding standards
- Write tests for new features
- Update documentation

3. **Commit Changes**
```bash
git add .
git commit -m "feat: your feature description"
```

4. **Push Changes**
```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
- Follow the PR template
- Request review
- Address feedback

## Testing

### Run Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.ts

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
```bash
npm test -- --coverage
```

## Code Quality

### Linting
```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Formatting
```bash
# Format code
npm run format
```

## Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Deployment

### Staging
```bash
npm run deploy:staging
```

### Production
```bash
npm run deploy:prod
```

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**
```bash
# Install correct Node version
nvm install 18
nvm use 18
```

2. **Database Connection Issues**
- Check PostgreSQL service is running
- Verify database credentials in .env
- Check database port is correct

3. **Build Failures**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

### Getting Help

- Check the documentation
- Search existing issues
- Create a new issue if needed
- Contact the development team

## Additional Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Prisma Documentation](https://www.prisma.io/)
- [Testing Library Documentation](https://testing-library.com/) 