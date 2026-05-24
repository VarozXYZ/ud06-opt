const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Task = require("../src/models/task");
const createApp = require("../src/app");
const { connectDB, disconnectDB } = require("../src/config/db");

let mongoServer;
let app;

beforeAll(async () => {
  if (process.env.MONGO_URL || process.env.MONGODB_URI) {
    await connectDB();
  } else {
    mongoServer = await MongoMemoryServer.create();
    await connectDB(mongoServer.getUri());
  }

  app = createApp();
});

afterEach(async () => {
  await Task.deleteMany({});
});

afterAll(async () => {
  await disconnectDB();

  if (mongoServer) {
    await mongoServer.stop();
  }
});

test("GET /health returns API and database status", async () => {
  const response = await request(app).get("/health").expect(200);

  expect(response.body).toMatchObject({
    status: "ok",
    api: "up",
    database: "connected",
  });
});

test("POST /api/tasks creates a task", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "Preparar despliegue" })
    .expect(201);

  expect(response.body.title).toBe("Preparar despliegue");
  expect(response.body.completed).toBe(false);
});

test("GET /api/tasks lists tasks", async () => {
  await Task.create({ title: "Revisar logs" });

  const response = await request(app).get("/api/tasks").expect(200);

  expect(response.body).toHaveLength(1);
  expect(response.body[0].title).toBe("Revisar logs");
});

test("POST /api/tasks validates title", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({ title: "" })
    .expect(400);

  expect(response.body.message).toContain("Task validation failed");
});
