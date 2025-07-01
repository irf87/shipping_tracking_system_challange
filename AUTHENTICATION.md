# Authentication System

This project implements JWT-based authentication for secure API access.

## How it works

### 1. Login Process
- User sends `POST /api/auth/login` with email and password
- Server validates credentials against database
- If valid, returns JWT token with user information
- Token expires in 24 hours (configurable)

### 2. Protected Routes
- Client includes JWT token in `Authorization: Bearer <token>` header
- Server validates token signature and expiration
- If valid, request proceeds; if invalid, returns 401

### 3. JWT Token Storage
**Option 1: Stateless JWT (Current Implementation)**
- Token contains all necessary user information
- No server-side storage required
- Simple and scalable
- Cannot invalidate individual tokens

**Option 2: JWT + Redis (For Advanced Features)**
- JWT tokens + Redis for token blacklisting
- Allows logout and token invalidation
- More complex but provides full control

## Configuration

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tracking_system"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"

# Environment
NODE_ENV="development"
```

## API Endpoints

### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### GET /api/profile (Protected)
**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Using Protected Routes

To create a protected endpoint, use the `withAuth` middleware:

```typescript
import { withAuth, AuthenticatedRequest } from '@/lib/auth-middleware';

async function protectedHandler(req: AuthenticatedRequest) {
  // Your protected logic here
  // Access user info with req.user
}

export const GET = withAuth(protectedHandler);
```

## Testing

Run the authentication tests:

```bash
npm test src/app/api/auth/login/login.test.ts
```

## Security Considerations

1. **JWT Secret**: Use a strong, unique secret in production
2. **HTTPS**: Always use HTTPS in production
3. **Token Expiration**: Set appropriate expiration times
4. **Password Hashing**: Passwords are hashed with bcrypt
5. **Input Validation**: All inputs are validated

## Future Enhancements

- [ ] Implement Redis for token blacklisting
- [ ] Add refresh tokens
- [ ] Implement rate limiting
- [ ] Add password reset functionality
- [ ] Add email verification 