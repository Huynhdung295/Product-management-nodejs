const fs = require("fs");
const chalk = require("chalk");

// Add product
const addProduct = function (id, name, amount, price, description) {
  const listProduct = getListProduct();

  const founderId = listProduct.find((item) => {
    return item.id === id;
  });
  const founderItem = listProduct.find((item) => {
    return item.name === name;
  });
  if (founderItem)
    return console.log(
      `${chalk.red(
        "Thêm không thành công!"
      )} - Đã tồn tại sản phẩm ${chalk.yellow(name)}`
    );
  if (founderId)
    return console.log(
      `${chalk.red("Thêm không thành công!")} - Đã tồn tại ID ${chalk.yellow(
        id
      )}`
    );

  const product = { id, name, amount, price, description };
  listProduct.push(product);
  updateList(listProduct);
  console.log(chalk.green("Thêm thành công!"));
};
// Remove product by ID
const removeProduct = function (id) {
  const listProduct = getListProduct();
  const idProduct = listProduct.findIndex((item) => {
    return item.id === id;
  });
  if (idProduct !== -1) {
    listProduct.splice(idProduct, 1);
    updateList(listProduct);
    console.log(chalk.green("Xóa sản phẩm thành công!"));
  } else {
    return console.log(chalk.red("ID không tồn tại! Xóa không thành công."));
  }
};
// Show list product
const showList = function () {
  const listProdcut = getListProduct();
  listProdcut.forEach((item) => {
    console.log("---------------------------");
    console.log(chalk.yellow(`ID: `, item.id));
    console.log(`Sản phẩm: `, item.name);
    console.log(`Số lượng: `, item.amount);
    console.log(`Đơn giá: `, item.price);
    console.log(`Tổng giá trị: ${item.price*item.amount} $ `)
    console.log(`Mô tả: `, item.description);
    console.log("---------------------------");
  });
};
// Detail product
const detailProduct = function (id) {
  const listProduct = getListProduct();
  const product = listProduct.find((item) => item.id === id);
  console.log("---------------------------");
  console.log(chalk.yellow(`ID: `, product.id));
  console.log(`Sản phẩm: `, product.name);
  console.log(`Số lượng: `, product.amount);
  console.log(`Đơn giá : ${product.price} $`);
  console.log(`Tổng giá trị: ${product.price*product.amount} $ `);
  console.log(`Mô tả: `, product.description);
  console.log("---------------------------");
};
// Update product
const updateProduct = function (id, name, amount, price, description) {
  const listProduct = getListProduct();
  const product = listProduct.find((item) => item.id === id);
  const idProduct = listProduct.findIndex((item) => {
    return item.id === id;
  });
  if (idProduct !== -1) {
    if (name) {
      const founderItem = listProduct.find((item) => {
        return item.name === name;
      });
      if (founderItem)
        return console.log(
          `${chalk.red(
            "Cập nhật không thành công!"
          )} - Đã tồn tại sản phẩm ${chalk.yellow(name)}`
        );
      console.log("---------------------------");
      console.log(chalk.green(`Cập nhật tên thành công!`));
      console.log(`Tên cũ: ${chalk.red(product.name)}`);
      listProduct[idProduct].name = name;
      updateList(listProduct);
      console.log(`Tên mới: ${chalk.green(name)}`);
      console.log("---------------------------");
    } else {
      name = product.name;
    }

    if (amount) {
      console.log("---------------------------");
      console.log(chalk.green(`Cập nhật số lượng thành công!`));
      console.log(`Số lượng cũ: ${chalk.red(product.amount)}`);
      listProduct[idProduct].amount = amount;
      updateList(listProduct);
      console.log(`Số lượng mới: ${chalk.green(amount)}`);
      console.log("---------------------------");
    } else {
      amount = product.amount;
    }
    if (price) {
      console.log("---------------------------");
      console.log(chalk.green(`Cập nhật đơn giá thành công!`));
      console.log(`Đơn giá cũ: ${chalk.red(product.price)} $`);
      listProduct[idProduct].price = price;
      updateList(listProduct);
      console.log(`Đơn giá mới: ${chalk.green(price)} $`);
      console.log("---------------------------");
    } else {
      price = product.price;
    }
    if (description) {
      console.log("---------------------------");
      console.log(chalk.green(`Cập nhật mô tả thành công!`));
      console.log(`Mô tả cũ: ${chalk.red(product.description)}`);
      listProduct[idProduct].description = description;
      updateList(listProduct);
      console.log(`Mô tả mới: ${chalk.green(description)}`);
      console.log("---------------------------");
    } else {
      description = product.description;
    }
    console.log("---------------------------");
    console.log(
      `ID: ${product.id} - Sản phẩm: ${product.name} - Số lượng: ${product.amount} - Đơn giá ${product.price} $ - Mô tả: ${product.description} `
    );
    console.log("---------------------------");
  } else {
    return console.log(chalk.red("ID không tồn tại!"));
  }
};
// Order
const orderProduct = function (id, orderx50 = "1") {
  const listProduct = getListProduct();
  const product = listProduct.find((item) => item.id === id);
  const idProduct = listProduct.findIndex((item) => {
    return item.id === id;
  });
  if (idProduct !== -1) {
    console.log("---------------------------");
    console.log(`Sản phẩm: ${chalk.yellow(product.name)}`);
    console.log(`Số lượng cũ: ${chalk.red(product.amount)}`);
    const newAmount = product.amount + orderx50 * 50;
    console.log(`Số lượng mới: ${chalk.green(newAmount)}`);
    listProduct[idProduct].amount = newAmount;
    updateList(listProduct);
    console.log("---------------------------");
  } else {
    return console.log(chalk.red("ID không tồn tại! Order không thành công."));
  }
};
// Get list product
const getListProduct = () => {
  // Read file
  let result = fs.readFileSync("./product.json");
  // Buffer ---> JSON
  result = JSON.parse(result);
  return result;
};

// Update list
const updateList = (data) => {
  fs.writeFileSync("./product.json", JSON.stringify(data));
};

module.exports = {
  addProduct,
  removeProduct,
  showList,
  detailProduct,
  updateProduct,
  orderProduct,
};
