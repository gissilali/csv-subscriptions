const { findByMinPrice, createWriter, exportToCSV } = require("../useCases/subscriptionsUseCases");
const handleExport = async (req, res, next) => {
    try {
        const cursor = await findByMinPrice(req.query.minPrice || 50);
        const filename = new Date().getTime() / 1000;
        const csvWriter = createWriter(filename);
        await cursor.eachAsync(data => {
            exportToCSV(
                {
                    business_id: data.business_id.toString(),
                    email: data.email,
                    plan_id: data.plan_id,
                    plan_name: data.plan.name,
                    plan_price: data.plan.price,
                    payment_platform_name: data.paymentPlatform.name,
                },
                csvWriter
            );
        });

        res.json({
            link: `http://localhost:5000/subscriptions/download/${filename}`,
        });
    } catch (error) {
        next(error);
        return undefined;
    }
};

const handleDownload = async (req, res, next) => {
    res.download(`${APP_ROOT}/public/${req.params.filename}_subscription.csv`);
};

module.exports = {
    handleExport,
    handleDownload,
};
