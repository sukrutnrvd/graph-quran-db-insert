const Gremlin = require("gremlin");

const { GREMLIN_ENDPOINT, DB_NAME, COLLECTION_NAME, PRIMARY_KEY } = process.env;

const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(
  `/dbs/${DB_NAME}/colls/${COLLECTION_NAME}`,
  PRIMARY_KEY
);

class GremlinClient extends Gremlin.driver.Client {
  constructor() {
    super(GREMLIN_ENDPOINT, {
      authenticator,
      traversalsource: "g",
      rejectUnauthorized: true,
      mimeType: "application/vnd.gremlin-v2.0+json",
    });
  }

  async addVertex(vertex) {
    return await this.submit(`
    g.addV('${vertex.label}')
    .property('id', '${vertex.id}')
    .property('root', '${vertex.root}')
    .property('transliteration', '${vertex.transliteration}')
    .property('pk', 'pk')    
    `);
  }

  async addEdge(edge) {
    return await this.submit(`
      g.V('${edge.from}')
      .addE('${edge.label}')
      .to(g.V('${edge.to}'))
      .property('_id', '${edge.id}')
      .property('weight', ${edge.weight})
      `);
  }

  async removeVertices() {
    return await this.submit("g.V().drop()");
  }

  async removeEdges() {
    return await this.submit("g.E().drop()");
  }
}

module.exports = new GremlinClient();
