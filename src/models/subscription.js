const { model } = require("../schema/subscriptionSchema");
const { planSchema } = require("../schema/planSchema");
const mongoose = require("mongoose");

module.exports = {
    create: async data => {
        return await model.create(data);
    },

    findMany: async (query = {}) => {
        return model.find(query);
    },

    insertMany: async data => {
        return model.insertMany(data);
    },

    deleteMany: async data => {
        return model.deleteMany({});
    },

    findByMinPrice: async minPrice => {
        return model
            .aggregate([
                {
                    $lookup: {
                        from: "plans",
                        localField: "plan_id",
                        foreignField: "_id",
                        as: "plan",
                    },
                },
                {
                    $unwind: "$plan",
                },
                {
                    $match: {
                        "plan.price": { $gte: minPrice },
                    },
                },
            ])
            .cursor();
    },
};
