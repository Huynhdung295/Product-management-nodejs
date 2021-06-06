const yargs = require("yargs");
const chalk = require("chalk");

const tasks = require("./tasks/tasks");

// Get list product: node index.js get-list
yargs.command({
  command: "get-list",
  handler: () => {
    tasks.showList();
  },
});
// Check detail product (by ID): node index.js product --id=""
yargs.command({
  command: "product",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: (args) => {
    tasks.detailProduct(args.id);
  },
});
// Add product: node index.js add --id="" --name="" --amount=""
yargs.command({
  command: "add",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
    name: {
      type: "string",
      demandOption: true,
    },
    amount: {
      type: "number",
      demandOption: true,
    },
  },
  handler: (args) => {
    tasks.addProduct(args.id, args.name, args.amount);
  },
});
// Remove product (by ID): node index.js remove --id=""
yargs.command({
  command: "remove",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: (args) => {
    tasks.removeProduct(args.id);
  },
});
// Update product (by ID): node index.js update --id="" --name="" --amount=""
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
    name: {
      type: "string",
      demandOption: false,
    },
    amount: {
      type: "number",
      demandOption: false,
    },
  },
  handler: (args) => {
    tasks.updateProduct(args.id, args.name, args.amount);
  },
});
//   Order product (by ID): node index.js order --id="" --orderx50="" (Order nhiều)
//   Order product (by ID): node index.js order --id="" (Order 1 lần)
yargs.command({
  command: "order",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
    orderx50: {
      type: "number",
      demandOption: false,
    },
  },
  handler: (args) => {
    tasks.orderProduct(args.id, args.orderx50);
  },
});
// Call all task
yargs.parse();
