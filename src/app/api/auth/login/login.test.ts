import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { prisma } from '../../../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Mock Next.js server for testing
const app = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', async () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      const nextRequest = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      });
      
      const response = await POST(nextRequest);
      const responseBody = await response.json();
      
      res.writeHead(response.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(responseBody));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

describe('POST /api/auth/login', () => {
  let testUser: { id: string; email: string; name: string | null; password: string };

  beforeAll(async () => {
    // Clean up any existing test user
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' }
    });
    
    // Create a test user
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    // Clean up test user
    if (testUser) {
      await prisma.user.delete({
        where: { id: testUser.id },
      });
    }
    await prisma.$disconnect();
  });

  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ password: 'testpassword123' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 401 for wrong password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 200 and JWT token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id', testUser.id);
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
    expect(response.body.user).toHaveProperty('name', 'Test User');
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should work with email in different case', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'TEST@EXAMPLE.COM',
        password: 'testpassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
}); 