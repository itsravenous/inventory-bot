const GoogleSpreadsheet = require("google-sheets-node-api");

const getInventory = async character => {
  const spreadsheet = await new GoogleSpreadsheet(
    process.env.SHEET_ID
  ).getSpreadsheet();
  const inventoryWorksheet = spreadsheet.worksheets.find(
    worksheet => worksheet.title.toLowerCase() === character.toLowerCase()
  );
  if (!inventoryWorksheet) return ["No items"];
  const cells = await inventoryWorksheet.getCells();

  const receptacles = cells
    .filter(cell => cell.row === 1)
    .reduce((acc, cell) => {
      acc[cell.col] = cell.value;
      return acc;
    }, {});

  const items = cells.reduce((acc, cell) => {
    if (cell.row === 1) return acc;
    acc[receptacles[cell.col]] = acc[receptacles[cell.col]] || [];
    acc[receptacles[cell.col]].push(cell.value);
    return acc;
  }, {});
  return items;
};

const inventoryToText = inventory => {
  inventoryText = Object.entries(inventory).reduce(
    (acc, [receptacle, items]) => {
      acc += `*${receptacle}:*\n${items.join("\n")}\n\n`;
      return acc;
    },
    ""
  );

  return inventoryText;
};

exports.getInventory = getInventory;
exports.inventoryToText = inventoryToText;
exports.handler = async (event, context, callback) => {
  const { user_name } = JSON.parse(
    '{"' + event.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) =>
      key === "" ? value : decodeURIComponent(value).replace(/\+/g, " ")
  );

  console.log("===================================");
  console.log("Getting inventory for", user_name);
  console.log("===================================");

  const inventoryText = inventoryToText(await getInventory(user_name));
  callback(null, {
    statusCode: 200,
    body: `*Inventory for ${user_name}*\n\n${inventoryText}`
  });
};
