import IBoletoController, {
  IRequest,
  IResponse,
} from "../../domain/controllers/IBoletoController";
import ICacheProvider from "../../domain/providers/ICacheProvider";

class BoletoControllerCacheProxy implements IBoletoController {
  constructor(
    private boletoController: IBoletoController,
    private memoryCacheProvider: ICacheProvider<IRequest, IResponse>
  ) {}

  async handle(req: IRequest): Promise<IResponse> {
    const haveCache = this.memoryCacheProvider.getCacheByRequest(req);

    if (haveCache) return haveCache;

    const _response = await this.boletoController.handle(req);

    this.memoryCacheProvider.setCache(req, _response);
    return _response;
  }
}

export default BoletoControllerCacheProxy;
