require("dotenv").config();

const createEdges = require("./utils/create-edges");
const createVertices = require("./utils/create-vertices");
const getVertices = require("./utils/get-vertices");
const getEdges = require("./utils/get-edges");

// wait(100)

const dataType = process.argv[2];
console.log("dataType:", dataType);
if (!dataType) {
  console.log("Please provide data type");
  process.exit();
} else if (dataType !== "vertex" && dataType !== "edge") {
  console.log("Invalid data type. Please provide vertex or edge");
  process.exit();
}

const run = async () => {
  try {
    if (dataType === "vertex") {
      const vertices = getVertices();
      await createVertices(vertices);
    } else {
      const edges = getEdges();
      await createEdges(edges);
    }
  } catch (error) {
    console.log("Error:", error.message);
    process.exit();
  }
};

run();
