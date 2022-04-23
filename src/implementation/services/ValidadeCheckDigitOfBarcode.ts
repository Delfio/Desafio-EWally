import IValidadeCheckDigitOfBarcode, {
  IRequest,
  IResponse,
} from "../../domain/services/IValidadeCheckDigitOfBarcode";

class ValidadeCheckDigitOfBarcode implements IValidadeCheckDigitOfBarcode {
  async handle(req: IRequest): Promise<IResponse> {
    const { fields, str_barcode } = req;

    const { dv } = fields.campo_d;

    if (str_barcode.length !== 44) {
      throw new Error("Barcode invalid format");
    }

    const validate_dv = await this.generateValidateCode(str_barcode);

    return {
      check_digit: validate_dv,
      is_valid: validate_dv === dv,
    };
  }

  private async generateValidateCode(str_barcode: string): Promise<string> {
    const _first_split = str_barcode.slice(0, 4);
    const _second_split = str_barcode.slice(5, str_barcode.length);

    const multipy = [4, 3, 2, 9, 8, 7, 6, 5];
    const length = `${_first_split}${_second_split}`;

    let index = 0;

    const summed_values = Array.from({
      length: length.length,
    })
      .map((_, index) => Number(length[index]))
      .map((element) => {
        if (index >= multipy.length) {
          index = 0;
        }

        const result = element * multipy[index];
        index++;
        return result;
      })
      .reduce((prev, curr) => prev + curr, 0);

    const previous_results = {
      0: 1,
      10: 1,
      11: 1,
    };

    const module_11 = (() => {
      const _result = (summed_values % 11) - 11;

      if (_result < 0) return _result * -1;

      return _result;
    })();

    const have_prev_result = (
      Object.keys(
        previous_results
      ) as unknown as (keyof typeof previous_results)[]
    ).find((key) => Number(key) === module_11);

    if (!!have_prev_result) {
      const result = previous_results[have_prev_result];

      return Promise.resolve(String(result));
    }

    return Promise.resolve(String(module_11));
  }
}

export default ValidadeCheckDigitOfBarcode;
