import MemoryCache from "memory-cache";
import {
  IRequest,
  IResponse,
} from "../../domain/controllers/IBoletoController";
import ICacheProvider from "../../domain/providers/ICacheProvider";

export default (): ICacheProvider<IRequest, IResponse> => {
  const getCacheByRequest = (request: IRequest): IResponse | null => {
    const { digitable_line } = request;

    const haveCache = MemoryCache.get(digitable_line);

    if (haveCache) {
      return JSON.parse(haveCache) as IResponse;
    }
    return null;
  };

  const setCache = (request: IRequest, response: IResponse): void => {
    const { digitable_line } = request;
    const _response_stringfy = JSON.stringify(response);
    MemoryCache.put(digitable_line, _response_stringfy);
  };

  return {
    getCacheByRequest,
    setCache,
  };
};
