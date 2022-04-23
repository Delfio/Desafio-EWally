// Receber a linha digitável e retornar os 5 campos
import {
    IBarcodeTypeA,
    IBarcodeTypeB,
    IBarcodeTypeC,
    IBarcodeTypeD,
    IBarcodeTypeE
} from '../entities/TypeBarcode';

export type IResponse = {
    campo_a: IBarcodeTypeA,
    campo_b: IBarcodeTypeB,
    campo_c: IBarcodeTypeC,
    campo_d: IBarcodeTypeD,
    campo_e: IBarcodeTypeE
}

export type IRequest = {
    digitable_line: string;
}

interface IDecodeDigitableLine {
    handle: (req: IRequest) => Promise<IResponse>
}

export default IDecodeDigitableLine;