import Express from "express";
import routes from "../routes";
import swaggerUi from "swagger-ui-express";
import ApiDoc from "../../../docs/API-DOC.json";

class ExpressServer {
  private server: Express.Express;
  constructor() {
    this.server = Express();
  }

  private configureRoutes() {
    routes(this.server);
  }

  private configureServerDocs() {
    this.server.use("/api-doc", swaggerUi.serve);
    this.server.get("/api-doc", swaggerUi.setup(ApiDoc));
  }

  runServer() {
    this.configureRoutes();
    this.configureServerDocs();
    this.server.listen(3333, () => console.log("Server is onlyne as 3333 🤖"));
  }
}

export default ExpressServer;
