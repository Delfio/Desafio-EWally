import IBarcode from "../entities/IBrcode";
import IBankBarcode from "../entities/IBankBarcode";
import IDealershipBarcode from "../entities/IDealershipBarcode";

export type IRequest =
  | Pick<IBankBarcode, "fields">
  | Pick<IDealershipBarcode, "fields">;

export type IResponse = IBarcode;

interface IFormatBarcode {
  handle: (req: IRequest) => Promise<IResponse>;
}

export default IFormatBarcode;
