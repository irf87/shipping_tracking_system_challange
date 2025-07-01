import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, getUserFromRequest } from '../../../lib/auth-middleware';
import { prisma } from '../../../../lib/prisma';

async function getProfile(req: AuthenticatedRequest) {
  try {
    const user = getUserFromRequest(req);
    
    // Get user data from database
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: userData
    });

  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export the protected handler
export const GET = withAuth(getProfile); 