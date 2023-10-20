const subscription = require("../models/subscription");
const {createObjectCsvWriter} = require("csv-writer");

const exportToCSV = async (data, csvWriter) => {
    await csvWriter.writeRecords([data])
};

const createWriter = (filePath) => {
    return createObjectCsvWriter({
        path: filePath,
        header: [
            {id: "business_id", title: "business_id"},
            {id: "email", title: "email"},
            {id: "plan_id", title: "plan_id"},
            {id: "plan_name", title: "plan_name"},
            {id: "plan_price", title: "plan_price"},
            {id: "payment_platform_name", title: "payment_platform_name"},
        ],
    })
}

const findByMinPrice = async (minPrice) => {
    return await subscription.findByMinPrice(minPrice);
};

module.exports = {
    exportToCSV,
    findByMinPrice,
    createWriter
};
