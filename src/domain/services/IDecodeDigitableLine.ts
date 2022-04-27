// Receber a linha digitável e retornar os 5 campos
import IBankBarcode from "../entities/IBankBarcode";
import IDealershipBarcode from "../entities/IDealershipBarcode";

export type IResponse =
  | Pick<IBankBarcode, "fields">
  | Pick<IDealershipBarcode, "fields">;

// {
//     campo_a: IBarcodeTypeA,
//     campo_b: IBarcodeTypeB,
//     campo_c: IBarcodeTypeC,
//     campo_d: IBarcodeTypeD,
//     campo_e: IBarcodeTypeE
// }

export type IRequest = {
  digitable_line: string;
};

interface IDecodeDigitableLine {
  handle: (req: IRequest) => Promise<IResponse>;
}

export default IDecodeDigitableLine;
