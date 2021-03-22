const { sequelize } = require("./models");

async function main() {
  await sequelize.authenticate();
}

main();
