const Papaparse = require("papaparse");
const fs = require("fs");
const path = require("path");

module.exports = () => {
  const edgesPath = path.join(__dirname, "..", "edge.txt");
  const edges = fs.readFileSync(edgesPath, "utf8");
  return Papaparse.parse(edges, {
    skipEmptyLines: true,
    header: true,
    transform: (value) => {
      return value.trim();
    },
  }).data;
};
