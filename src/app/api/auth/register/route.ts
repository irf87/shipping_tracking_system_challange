/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !password) {
      return NextResponse.json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Email and password are required.'
        }
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        error: {
          code: 'USER_ALREADY_EXISTS',
          message: 'A user with this email already exists.'
        }
      }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error: unknown) {
    let message = 'An unexpected error occurred.';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as any).message;
    }
    return NextResponse.json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message
      }
    }, { status: 500 });
  }
} 