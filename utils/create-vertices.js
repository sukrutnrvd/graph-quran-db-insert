const g = require("./gremlin-client");
const wait = require("./wait");

module.exports = async (vertices) => {
  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    try {
      console.log("Adding vertex:", vertex);
      await g.addVertex(vertex);
      await wait(50);
    } catch (error) {
      console.log("Error:", error.message);
      fs.appendFileSync("vertices-error.txt", `${vertex.id}\n`);
    }
  }
  process.exit();
};
