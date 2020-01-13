const inventoryBot = require("./functions/inventory.js");
it("returns inventory for user", async () => {
  const inventory = await inventoryBot.getInventory("Bilbo");
  expect(inventoryBot.inventoryToText(inventory)).toMatchSnapshot();
});

it("returns inventory for another user", async () => {
  const inventory = await inventoryBot.getInventory("Frodo");
  expect(inventoryBot.inventoryToText(inventory)).toMatchSnapshot();
});
