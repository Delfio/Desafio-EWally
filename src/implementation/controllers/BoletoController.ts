import IBoletoController, {
  IRequest,
  IResponse,
} from "../../domain/controllers/IBoletoController";
import IDecodeDigitableLine from "../../domain/services/IDecodeDigitableLine";
import IFormatBarcode from "../../domain/services/IFormatBarcode";
import IValidadeCheckDigitOfBarcode from "../../domain/services/IValidadeCheckDigitOfBarcode";
import IValidateCheckDigitInBarcodeField from "../../domain/services/IValidateCheckDigitInBarcodeField";

import IBankBarcode from "../../domain/entities/IBankBarcode";
import IDealershipBarcode from "../../domain/entities/IDealershipBarcode";

import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE,
} from "../../domain/entities/TypeBarcode/BankBarcodeType";

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

      if (digitable_line.length < 47 || digitable_line.length > 48) {
        throw new Error("Digitable line is invalid!");
      }

      const decoded_digitable_line = await this.decodeDigitableLine.handle({
        digitable_line,
      });

      if (
        (decoded_digitable_line as Pick<IBankBarcode, "fields">) &&
        digitable_line.length === 47
      ) {
        return await this.formatResponseForBankBarcode(
          decoded_digitable_line as Pick<IBankBarcode, "fields">
        );
      }

      return await this.formatResponseForDealershipBarcode(
        decoded_digitable_line as Pick<IDealershipBarcode, "fields">
      );
    } catch (error) {
      console.log("Error on execute controller");
      console.log(error);
      throw error;
    }
  }

  private async formatResponseForDealershipBarcode({
    fields,
  }: Pick<IDealershipBarcode, "fields">): Promise<IResponse> {
    const { campo_a, campo_b, campo_c, campo_d, campo_e } = fields;

    const str_barcode = `${campo_a.str_barcode_field}${campo_b.str_barcode_field}${campo_c.str_barcode_field}${campo_d.str_barcode_field}`;

    const { valor, vencimento } = campo_e;
    return Promise.resolve({
      amount: String(valor),
      expiration_date: String(vencimento),
      str_barcode,
    });
  }

  private async formatResponseForBankBarcode({
    fields,
  }: Pick<IBankBarcode, "fields">): Promise<IResponse> {
    const all_promisses_validate_check_fields = (
      Object.keys(fields) as unknown as (keyof typeof fields)[]
    )
      .map((key) => {
        if (key === "campo_d" || key === "campo_e") return null;
        const field = fields[key];
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
      throw new Error("Digitable line is invalid!");
    }

    const { campo_a, campo_b, campo_c, campo_d, campo_e } = fields;

    const _formatedFields: Pick<IBankBarcode, "fields"> = {
      fields: {
        campo_a: campo_a as IBarcodeTypeA,
        campo_b: campo_b as IBarcodeTypeB,
        campo_c: campo_c as IBarcodeTypeC,
        campo_d: campo_d as IBarcodeTypeD,
        campo_e: campo_e as IBarcodeTypeE,
      },
    };

    const formated_bar_code = await this.formatBarcode.handle(_formatedFields);

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
  }
}

export default BoletoController;
