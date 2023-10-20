const { readFileSync } = require("fs");
const { expect } = require("@jest/globals");
const assertFile = (path, expectedContents, encoding) => {
    const actualContents = readFileSync(path, encoding || "utf8");
    expect(actualContents).toBe(expectedContents);
};

module.exports = { assertFile };
