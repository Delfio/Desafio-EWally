import IBrcode from "../entities/IBrcode";

export type IRequest = IBrcode;

export type IResponse = {
  is_valid: boolean;
  check_digit: string;
};

interface IValidadeCheckDigitOfBarcode {
  handle: (req: IRequest) => Promise<IResponse>;
}

export default IValidadeCheckDigitOfBarcode;
