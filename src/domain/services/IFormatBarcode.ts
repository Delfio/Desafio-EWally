import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE,
} from "../entities/TypeBarcode";
import IBarcode from "../entities/IBrcode";

export type IRequest = {
  campo_a: IBarcodeTypeA;
  campo_b: IBarcodeTypeB;
  campo_c: IBarcodeTypeC;
  campo_d: IBarcodeTypeD;
  campo_e: IBarcodeTypeE;
};
export type IResponse = IBarcode;

interface IFormatBarcode {
  handle: (req: IRequest) => Promise<IResponse>;
}

export default IFormatBarcode;