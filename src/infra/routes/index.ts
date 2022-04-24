import Express from "express";
import ExpressBoletoController from "../controller/BoletoController";

export default (express_server: Express.Express) => {
  const _expressBoletoController = new ExpressBoletoController();

  express_server.get("/", (req, res) => res.send("hi mom!"));
  express_server.get(
    "/boleto/:digitable_line",
    _expressBoletoController.handle
  );
};
