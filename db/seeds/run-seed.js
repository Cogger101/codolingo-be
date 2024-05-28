const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const client = require(`${__dirname}/../connection.js`);

const runSeed = () => {
  return seed(devData).then(() => client.close());
};

runSeed();
