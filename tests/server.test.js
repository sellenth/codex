const request = require('supertest');
const server = require('../server/index');
const app = server.app;

describe('API Endpoints', () => {
  it('should list characters', async () => {
    const res = await request(app).get('/api/characters');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(10);
  });

  it('should create a scene', async () => {
    const res = await request(app)
      .post('/api/scenes')
      .send({ characterIds: [1, 2], locationId: 1, description: 'Test scene' });
    expect(res.statusCode).toBe(201);
    expect(res.body.characterIds).toEqual([1, 2]);
    expect(res.body.locationId).toBe(1);
  });
});
