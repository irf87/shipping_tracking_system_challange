# Tracking System Test

## 📚 Documentation

For detailed information about the project architecture, patterns, and technical implementation, see [TECHNICAL_DOCUMENTATION.MD](./TECHNICAL_DOCUMENTATION.MD).

## 🚀 Getting Started

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables (create `.env` file with your PostgreSQL database URL)

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

### Testing

**Before running tests:**

The test script automatically switches the Prisma provider from PostgreSQL to SQLite for testing. This is handled by the `scripts/switch-prisma-provider.js` script.

**Running tests:**
```bash
npm test
```

**After running tests:**

⚠️ **Important:** After running tests, the Prisma provider remains set to SQLite. To return to development mode, you must:

1. Switch back to PostgreSQL provider:
```bash
npx prisma migrate dev
```

2. Then start the development server:
```bash
npm run dev
```

### Provider Switching

The application uses different database providers:
- **Development/Production**: PostgreSQL
- **Testing**: SQLite

The provider switching is handled automatically by the test script, but you may need to manually reset it after testing as described above.

### Available Scripts

- `npm run dev` - Start development server
- `npm test` - Run tests (switches to SQLite provider)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint