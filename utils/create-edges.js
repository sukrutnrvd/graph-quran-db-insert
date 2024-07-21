const g = require("./gremlin-client");
const wait = require("./wait");

module.exports = async (edges) => {
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    try {
      console.log("Adding edge:", edge);
      await g.addEdge(edge);
      await wait(100);
    } catch (error) {
      console.log("Error:", error.message);
      fs.appendFileSync("edges-error.txt", `${edge.id}\n`);
    }
  }
  console.log("Done");
  process.exit();
};
