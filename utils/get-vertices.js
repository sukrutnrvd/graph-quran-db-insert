const Papaparse = require("papaparse");
const fs = require("fs");
const path = require("path");

module.exports = () => {
  const verticesPath = path.join(__dirname, "..", "vertex.txt");
  const vertices = fs.readFileSync(verticesPath, "utf8");
  return Papaparse.parse(vertices, {
    skipEmptyLines: true,
    header: true,
    transform: (value) => {
      return value.trim();
    },
  }).data;
};
