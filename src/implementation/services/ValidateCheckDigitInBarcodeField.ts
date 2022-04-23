import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE
} from '../../domain/entities/TypeBarcode';
import IValidateCheckDigitInBarcodeField, { IRequest, IResponse } from "../../domain/services/IValidateCheckDigitInBarcodeField";

class ValidateCheckDigitInBarcodeField implements IValidateCheckDigitInBarcodeField {
  async handle(req: IRequest): Promise<IResponse> {
    const {
      str_barcode_field,
      dv
    } = req.campo;

    const result = await this.validateField(str_barcode_field);

    return {
      check_digit: dv,
      is_valid: result
    }
  }

  private async validateField(str_field: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export default ValidateCheckDigitInBarcodeField;