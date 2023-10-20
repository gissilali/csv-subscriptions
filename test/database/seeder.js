const subscriptionModel = require("../../src/models/subscription");
const planModel = require("../../src/models/plan");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const { PAYMENT_PLATFORM_PAYPAL, PAYMENT_PLATFORM_STRIPE } = require("../../src/schema/subscriptionSchema");
const { testDbConnection } = require("./connections");

const populatePlansCollection = async () => {
    const subscriptionPlans = [
        {
            name: "Platinum",
            price: 100,
            period: "monthly",
            status: "A",
            features: {
                videos: true,
                audio: true,
                download: true,
                streaming: true,
                customize: true,
            },
        },
        {
            name: "Gold",
            price: 70,
            period: "monthly",
            status: "A",
            features: {
                videos: true,
                audio: true,
                download: false,
                streaming: true,
                customize: true,
            },
        },
        {
            name: "Silver",
            price: 50,
            period: "monthly",
            status: "A",
            features: {
                videos: true,
                audio: true,
                download: false,
                streaming: false,
                customize: true,
            },
        },
        {
            name: "Bronze",
            price: 30,
            period: "monthly",
            status: "A",
            features: {
                videos: true,
                audio: true,
                download: false,
                streaming: false,
                customize: false,
            },
        },
        {
            name: "Freemium",
            price: 0,
            period: "monthly",
            status: "A",
            features: {
                videos: false,
                audio: true,
                download: false,
                streaming: false,
                customize: false,
            },
        },
    ];
    await planModel.deleteMany();
    await planModel.insertMany(subscriptionPlans);
    return await planModel.findMany();
};

const getNameKeyObject = async plans => {
    return plans.reduce((prev, current, index) => {
        prev[current.name] = current.id;
        return prev;
    }, {});
};

const populateSubscriptionsCollection = async plans => {
    return new Promise(async (resolve, reject) => {
        await subscriptionModel.deleteMany();
        const subscriptionsData = [
            { name: "Freemium", instances: 5 },
            { name: "Bronze", instances: 5 },
            { name: "Silver", instances: 5 },
            { name: "Gold", instances: 5 },
            { name: "Platinum", instances: 5 },
        ];

        const chunkSize = 5000;

        const subscriptionPlans = await getNameKeyObject(plans);

        const generateSubscriptionsData = chunkSize => {
            const records = [];
            for (const subscription of subscriptionsData) {
                for (let i = 0; i < subscription.instances; i++) {
                    records.push({
                        business_id: faker.string.uuid(),
                        email: faker.internet.email(),
                        plan_id: subscriptionPlans[subscription.name],
                        paymentPlatform: {
                            token: faker.string.uuid(),
                            external_id: faker.string.uuid(),
                            name: faker.helpers.arrayElement([PAYMENT_PLATFORM_PAYPAL, PAYMENT_PLATFORM_STRIPE]),
                        },
                        planName: subscription.name,
                    });
                }
            }

            const chunkedArray = [];

            for (let i = 0; i < records.length; i += chunkSize) {
                chunkedArray.push(records.slice(i, i + chunkSize));
            }

            return chunkedArray;
        };

        const seedDatabase = async () => {
            let currentIndex = 0;
            const batchData = generateSubscriptionsData(chunkSize);
            for (const data of batchData) {
                try {
                    await subscriptionModel.insertMany(data);
                    currentIndex += chunkSize;
                    console.log(`Inserted ${data.length} subscription instances.`);
                } catch (error) {
                    console.error(`Error inserting subscription instances: ${error.message}`);
                    break;
                }
            }
        };

        await seedDatabase();
        resolve(true);
    });
};

const seed = async () => {
    const plans = await populatePlansCollection();
    await populateSubscriptionsCollection(plans);
};

module.exports = {
    seed,
};
