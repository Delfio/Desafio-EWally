import IBoletoController, {
  IRequest,
  IResponse,
} from "../../domain/controllers/IBoletoController";
import IDecodeDigitableLine from "../../domain/services/IDecodeDigitableLine";
import IFormatBarcode from "../../domain/services/IFormatBarcode";
import IValidadeCheckDigitOfBarcode from "../../domain/services/IValidadeCheckDigitOfBarcode";
import IValidateCheckDigitInBarcodeField from "../../domain/services/IValidateCheckDigitInBarcodeField";

class BoletoController implements IBoletoController {
  constructor(
    private decodeDigitableLine: IDecodeDigitableLine,
    private validateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField,
    private formatBarcode: IFormatBarcode,
    private validateCheckDigitOfBarcode: IValidadeCheckDigitOfBarcode
  ) {}
  async handle(req: IRequest): Promise<IResponse> {
    try {
      const { digitable_line } = req;

      if (digitable_line.length !== 47) {
        console.log(digitable_line.length);
        throw new Error("Digitable line is invalid!");
      }
      const decoded_digitable_line = await this.decodeDigitableLine.handle({
        digitable_line,
      });

      const all_promisses_validate_check_fields = (
        Object.keys(
          decoded_digitable_line
        ) as unknown as (keyof typeof decoded_digitable_line)[]
      )
        .map((key) => {
          if (key === "campo_d" || key === "campo_e") return null;
          const field = decoded_digitable_line[key];
          return field;
        })
        .filter((el) => !!el?.str_barcode_field)
        .map((field) => {
          if (!field) return;

          return this.validateCheckDigitInBarcodeField.handle({
            campo: field,
          });
        });

      const all_fields_validate = await Promise.all(
        all_promisses_validate_check_fields
      );

      const have_invalid_fields = all_fields_validate.filter(
        (fields) => !fields!.is_valid
      );

      if (!!have_invalid_fields.length) {
        console.log(have_invalid_fields);
        throw new Error("Digitable line is invalid!");
      }

      const { campo_a, campo_b, campo_c, campo_d, campo_e } =
        decoded_digitable_line;
      const formated_bar_code = await this.formatBarcode.handle({
        campo_a,
        campo_b,
        campo_c,
        campo_d,
        campo_e,
      });

      const barcode_is_valid = await this.validateCheckDigitOfBarcode.handle(
        formated_bar_code
      );

      if (!barcode_is_valid.is_valid) {
        throw new Error("Barcode not valid!");
      }

      const formated_result = {
        amount: formated_bar_code.amount,
        expiration_date: formated_bar_code.expiration_date,
        str_barcode: formated_bar_code.str_barcode,
      };
      return formated_result;
    } catch (error) {
      console.log("Error on execute controller");
      console.log(error);
      throw error;
    }
  }
}

export default BoletoController;
