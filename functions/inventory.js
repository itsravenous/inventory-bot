const GoogleSpreadsheet = require("google-sheets-node-api");

const getInventory = async () => {
  const spreadsheet = await new GoogleSpreadsheet(
    process.env.SHEET_ID
  ).getSpreadsheet();
  const rows = await spreadsheet.worksheets[0].getRows();
  return rows.map(row => row.title);
};

exports.getInventory = getInventory;

exports.handler = async (event, context, callback) => {
  const { text: character } = JSON.parse(
    '{"' + event.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) =>
      key === "" ? value : decodeURIComponent(value).replace(/\+/g, " ")
  );

  callback(null, {
    statusCode: 200,
    body: `*Inventory*\n\n${(await getInventory())
      .map(row => `- ${row}`)
      .join("\n")}`
  });
};
