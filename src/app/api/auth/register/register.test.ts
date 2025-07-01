import request from 'supertest';
import { createServer } from 'http';
import { POST } from './route';

// Helper to wrap the Next.js route handler for Supertest
function handlerToServer() {
  return createServer(async (req, res) => {
    // Adapt the request to NextRequest/NextResponse
    // For app router, you may need to use fetch or a custom adapter
    // Here, we use a simple fetch-based approach for demonstration
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        const json = body ? JSON.parse(body) : {};
        const nextReq = { json: async () => json } as { json: () => Promise<any> };
        const nextRes = await POST(nextReq);
        res.statusCode = nextRes.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(await nextRes.json()));
      });
    } else {
      res.statusCode = 405;
      res.end();
    }
  });
}

describe('/api/auth/register', () => {
  let server: import('http').Server;

  beforeAll(() => {
    server = handlerToServer().listen(0);
  });

  afterAll(() => {
    server.close();
  });

  it('registers a new user successfully', async () => {
    const res = await request(server)
      .post('/')
      .send({ email: 'test@example.com', name: 'Test User', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.email).toBe('test@example.com');
    expect(res.body.data.name).toBe('Test User');
  });

  it('returns error if email already exists', async () => {
    await request(server)
      .post('/')
      .send({ email: 'duplicate@example.com', name: 'User', password: 'password123' });
    const res = await request(server)
      .post('/')
      .send({ email: 'duplicate@example.com', name: 'User', password: 'password123' });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('USER_ALREADY_EXISTS');
  });

  it('returns error if required fields are missing', async () => {
    const res = await request(server)
      .post('/')
      .send({ email: '', password: '' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_INPUT');
  });
}); 