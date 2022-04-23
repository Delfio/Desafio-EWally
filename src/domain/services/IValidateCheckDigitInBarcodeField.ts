// Receber um campo e validar o digíto verificador

import IGenericBarcodeType from "../entities/TypeBarcode/IGenericBarcodeFieldType";

export type IRequest = {
  campo: IGenericBarcodeType;
};

export type IResponse = {
  is_valid: boolean;
  check_digit: string;
};

interface IValidateCheckDigitInBarcodeField {
  handle: (req: IRequest) => Promise<IResponse>;
}


export default IValidateCheckDigitInBarcodeField;