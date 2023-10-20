const { model } = require("../schema/planSchema");

module.exports = {
  findMany: async (query = {}) => {
    return model.find(query);
  },

  insertMany: async (data) => {
    return await model.insertMany(data);
  },

  deleteMany: async (query = {}) => {
    return model.deleteMany(query);
  },
};
