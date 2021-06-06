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
// Add product: node index.js add --id="1" --name="Robot" --amount="30" --price="5000" --description="Đây là robot"
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
    price: {
        type: "number",
        demandOption: true,
    },
    description: {
        type: "string",
        demandOption: false
    }
  },
  handler: (args) => {
    tasks.addProduct(args.id, args.name, args.amount, args.price, args.description);
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
// Update product (by ID): node index.js update --id="" --name="" --amount="" --price="" --description=""
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
    price: {
        type: "number",
        demandOption: false,
    },
    description: {
        type: "string",
        demandOption: false
    }
  },
  handler: (args) => {
    tasks.updateProduct(args.id, args.name, args.amount, args.price, args.description);
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
