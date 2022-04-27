import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE,
} from "../../domain/entities/TypeBarcode/BankBarcodeType";
import IValidateCheckDigitInBarcodeField, {
  IRequest,
  IResponse,
} from "../../domain/services/IValidateCheckDigitInBarcodeField";

class ValidateCheckDigitInBarcodeField
  implements IValidateCheckDigitInBarcodeField
{
  async handle(req: IRequest): Promise<IResponse> {
    const { str_barcode_field, dv } = req.campo;

    const result = await this.validateField(str_barcode_field, dv);

    return {
      check_digit: dv,
      is_valid: result,
    };
  }

  private async validateField(str_field: string, dv: string): Promise<boolean> {
    const multipliers = (() => {
      if (str_field.length % 2 > 0) {
        return {
          et1: 2,
          et2: 1,
        };
      }

      return {
        et1: 1,
        et2: 2,
      };
    })();

    function algorithmsMultiplier(algorithm: number): number {
      if (algorithm <= 9) {
        return algorithm;
      }

      const result =
        Number(String(algorithm)[0]) + Number(String(algorithm)[1]);

      return algorithmsMultiplier(result);
    }

    const all_numbers_added = Array.from({
      length: str_field.length,
    })
      .map((_, index) => Number(str_field[index]))
      .map((value, index) => {
        let result = 0;
        if ((index + 1) % 2 === 0) {
          result = value * multipliers.et2;
        } else {
          result = value * multipliers.et1;
        }

        result = algorithmsMultiplier(result);

        return result;
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    const module_of_1o = all_numbers_added % 10;
    const next_ten = Math.ceil(module_of_1o / 10) * 10;

    const rest = next_ten - module_of_1o;
    const rest_module_of_10 = String(rest % 10);

    return Promise.resolve(rest_module_of_10 === dv);
  }
}

export default ValidateCheckDigitInBarcodeField;
