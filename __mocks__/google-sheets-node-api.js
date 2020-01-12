const mockCells = require("./cells.json");
module.exports = class GoogleSpreadsheet {
  getSpreadsheet() {
    return {
      worksheets: [
        { title: "Bilbo", getCells: () => mockCells.Bilbo },
        { title: "Frodo", getCells: () => mockCells.Frodo }
      ]
    };
  }
};
