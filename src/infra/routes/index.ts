import Express from 'express';

export default (express_server: Express.Express) => {
    express_server.get("/", (req, res) => res.send("hi mom!"))
}
