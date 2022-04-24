import Express from 'express';
import middleware from '../middleware';
import routes from '../routes';

class ExpressServer {
    private server: Express.Express;
    constructor() {
        this.server = Express();
    }

    private configureRoutes() {
        routes(this.server);
    }

    private configureMiddleware() {
        middleware(this.server)
    }

    runServer() {
        this.configureMiddleware();
        this.configureRoutes();
        this.server.listen(3333, () => console.log("Server is onlyne as 3333 🤖"))
    }
}

export default ExpressServer;