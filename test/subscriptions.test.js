const { describe, it, expect, beforeAll, afterEach, afterAll } = require("@jest/globals");
const { testDbConnection } = require("./database/connections");
const mongoose = require("mongoose");
const { findByMinPrice, createWriter, exportToCSV } = require("../src/useCases/subscriptionsUseCases");
const { seed } = require("./database/seeder");
const { assertFile } = require("./helpers");
const path = require("path");

const APP_ROOT = path.resolve(__dirname);
describe("Subscriptions", () => {
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

    it("should export a subscription object to a CSV file", async () => {
        const filePath = `${APP_ROOT}/example.csv`;
        const expectedContent =
            "business_id,email,plan_id,plan_name,plan_price,payment_platform_name\nd737027a-6dc3-46fe-a7a4-9a25c45f75ad,user@mail.com,d199bd6d-8556-465f-9dd9-72378143613b,John Doe,50,Stripe\n";
        const csvWriter = createWriter(filePath);
        await exportToCSV(
            {
                business_id: "d737027a-6dc3-46fe-a7a4-9a25c45f75ad",
                email: "user@mail.com",
                plan_id: "d199bd6d-8556-465f-9dd9-72378143613b",
                plan_name: "John Doe",
                plan_price: 50,
                payment_platform_name: "Stripe",
            },
            csvWriter
        );

        assertFile(filePath, expectedContent);
    }, 10000);

    afterAll(async () => await (await testDbConnection(mongoose)).closeDatabase(), 15000);
});
