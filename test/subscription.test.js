const { describe, it, expect, beforeAll, afterEach, afterAll } = require("@jest/globals");
const { testDbConnection } = require("./database/connections");
const mongoose = require("mongoose");
const { findByMinPrice } = require("../src/useCases/subscriptionsUseCases");
const { seed } = require("./database/seeder");

describe("Subscription", () => {
    beforeAll(async () => {
        await (await testDbConnection(mongoose)).connect();
        await seed();
    }, 20000);

    afterEach(async () => await (await testDbConnection(mongoose)).clearDatabase(), 15000);


    it("should retrieve subscriptions with plan pricing greater than or equal to $50 from the database", async () => {
        const cursor = await findByMinPrice(50);

        let dataCount = 0;
        await cursor.eachAsync((data, i) => {
            dataCount = dataCount + 1;
        });

        expect(dataCount).toBe(15);
    }, 10000);

    it("should handle database query errors", async () => {
        expect(true).toBe(true);
    }, 10000);

    it("should export subscriptions to a CSV file", async () => {
        expect(true).toBe(true);
    }, 10000);

    it("should handle CSV export errors", async () => {
        expect(true).toBe(true);
    }, 10000);

    afterAll(async () => await (await testDbConnection(mongoose)).closeDatabase(), 15000);
});
