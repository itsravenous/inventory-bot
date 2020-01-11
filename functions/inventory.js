const GoogleSpreadsheet = require("google-sheets-node-api");

const getInventory = async character => {
  const spreadsheet = await new GoogleSpreadsheet(
    process.env.SHEET_ID
  ).getSpreadsheet();
  const inventoryWorksheet = spreadsheet.worksheets.find(
    worksheet => worksheet.title.toLowerCase() === character.toLowerCase()
  );
  if (!inventoryWorksheet) return ["No items"];
  const items = await inventoryWorksheet.getRows();
  return items.map(item => item.title);
};

exports.getInventory = getInventory;

exports.handler = async (event, context, callback) => {
  const { user_name } = JSON.parse(
    '{"' + event.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) =>
      key === "" ? value : decodeURIComponent(value).replace(/\+/g, " ")
  );

  callback(null, {
    statusCode: 200,
    body: `*Inventory for ${user_name}*\n\n${(await getInventory(user_name))
      .map(row => `- ${row}`)
      .join("\n")}`
  });
};
