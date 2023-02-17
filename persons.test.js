const superTest = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
  
beforeEach(async () => {
    await db.seed.run();
});
  
afterAll(async () => {
    await db.destroy();
});

describe("Server Test", ()=>{
    it("[1] Server Deneme /", async()=>{
        const res = await superTest(server).get("/");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Server Get Deneme");
    },1000);

    it("[2] Server Deneme /dada", async()=>{
        const res = await superTest(server).get("/dada");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Opps Sayfa Yok");
    },1000)
});

describe("Engineers Test", ()=>{
    it("[3] Engineer FindAll", async()=>{
        const res = await superTest(server).get("/api/engineers");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    },1000);
    it("[4] Engineer FindAllv2", async()=>{
        const res = await superTest(server).get("/api/engineers");
        expect(res.status).toBe(200);
        expect(res.body[0]["firstname"]).toBe("Samet");
    },1000);
    it("[5] Engineer FindbyId", async()=>{
        const res = await superTest(server).get("/api/engineers/2");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            "eid": 2,
            "firstname": "Yuşa",
            "lastname": "Topuz",
            "title": "Mak Müh"
        });
    },1000);
    it("[6] Engineer FindbyId Fail", async()=>{
        const res = await superTest(server).get("/api/engineers/9");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Muhendis Bulunumadı");
    },1000);
    it("[7] Engineer Insert", async()=>{
        const res = await superTest(server).post("/api/engineers").send({ firstname:"Apaci", lastname:"Selim", title:"Kabadayi" });
        expect(res.status).toBe(201);
        expect(res.body["firstname"]).toBe("Apaci");
    },1000);
    it("[8] Engineer Inser Fail", async()=>{
        const res = await superTest(server).post("/api/engineers").send({ firstname:"", lastname:"Selim", title:"Kabadayi" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Eksik Var");
    },1000);
   
});

describe("Workers Test", ()=>{
    it("[9] Worker FindAll", async()=>{
        const res = await superTest(server).get("/api/workers");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    },1000);
    it("[10] Worker FindAllv2", async()=>{
        const res = await superTest(server).get("/api/workers");
        expect(res.status).toBe(200);
        expect(res.body[2]["firstname"]).toBe("Ali");
    },1000);
    it("[11] Worker FindbyId", async()=>{
        const res = await superTest(server).get("/api/workers/2");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            "wid": 2,
            "firstname": "Yusuf",
            "lastname": "Ak",
            "departman": "Bakım"
        });
    },1000);
    it("[12] Worker FindbyId Fail", async()=>{
        const res = await superTest(server).get("/api/workers/9");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Worker Bulunumadı");
    },1000);
    it("[13] Worker Insert", async()=>{
        const res = await superTest(server).post("/api/workers").send({ firstname:"Apaci", lastname:"Selim" });
        expect(res.status).toBe(201);
        expect(res.body["firstname"]).toBe("Apaci");
    },1000);
    it("[14] Worker Insert Fail", async()=>{
        const res = await superTest(server).post("/api/workers").send({ firstname:"Apaci", lastname:""});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Eksik Var");
    },1000);
   
});
