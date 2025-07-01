import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: AuthenticatedRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization header required' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      
      const decoded = jwt.verify(token, secret) as { userId: string; email: string };
      
      // Add user info to request
      req.user = decoded;
      
      return handler(req);
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  };
}

// Helper function to get user from request
export function getUserFromRequest(req: AuthenticatedRequest) {
  if (!req.user) {
    throw new Error('User not authenticated');
  }
  return req.user;
} 