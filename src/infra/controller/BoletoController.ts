import Express from "express";

import BoletoControllerFactory from "../../implementation/factory/BoletoController.factory";
import IBoletoController from "../../domain/controllers/IBoletoController";

class ExpressBoletoController {
  static _boletoControllerFactory: IBoletoController | null =
    null as unknown as IBoletoController;

  constructor() {
    if (!ExpressBoletoController._boletoControllerFactory) {
      ExpressBoletoController._boletoControllerFactory =
        BoletoControllerFactory();
    }
  }

  async handle(request: Express.Request, response: Express.Response) {
    const { digitable_line } = request.params;

    try {
      const _boleto_decoded =
        await ExpressBoletoController._boletoControllerFactory!.handle({
          digitable_line: String(digitable_line),
        });

      response.status(200).json(_boleto_decoded);

      return response;
    } catch (error: any) {
      response.status(400).json({
        message: error.message,
      });
    }
  }
}

export default ExpressBoletoController;
