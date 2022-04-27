import IFormatBarcode, {
  IRequest,
  IResponse,
} from "../../domain/services/IFormatBarcode";
import IBankBarcode from "../../domain/entities/IBankBarcode";
import IDealershipBarcode from "../../domain/entities/IDealershipBarcode";

import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeE,
} from "../../domain/entities/TypeBarcode/BankBarcodeType";

class FormatBarcode implements IFormatBarcode {
  async handle(req: IRequest): Promise<IResponse> {
    const { campo_a, campo_b, campo_c, campo_d, campo_e } = req.fields;

    if (req as Pick<IBankBarcode, "fields">) {
      const { codigo_moeda, instituicao_destinataria, posicao_20_24 } =
        campo_a as IBarcodeTypeA;

      const { posicao_25_34 } = campo_b as IBarcodeTypeB;

      const { posicao_35_44 } = campo_c as IBarcodeTypeC;

      const { dv } = campo_d;
      const { str_barcode_field, valor, vencimento } = campo_e as IBarcodeTypeE;

      let amount = "";
      let expiration_date = "";

      if (typeof valor === "number") {
        amount = valor.toFixed(2);
      } else {
        amount = String(valor);
      }

      if (typeof vencimento !== "string") {
        expiration_date = vencimento.toLocaleString("pt-br", {
          dateStyle: "short",
        });
      } else {
        expiration_date = String(vencimento);
      }

      const str_barcode = `${instituicao_destinataria}${codigo_moeda}${dv}${str_barcode_field}${posicao_20_24}${posicao_25_34}${posicao_35_44}`;

      return {
        amount,
        expiration_date,
        fields: {
          campo_a,
          campo_b,
          campo_c,
          campo_d,
          campo_e,
        },
        str_barcode,
      } as IBankBarcode;
    }

    let this_value = "";

    const { valor, vencimento } = campo_e;

    if (typeof valor === "string") {
      this_value = Number(valor).toFixed(2);
    }
    // const fields:
    return {
      amount: this_value,
      expiration_date: String(vencimento),
      fields: {
        campo_a,
        campo_b,
        campo_c,
        campo_d,
        campo_e,
      },
      str_barcode: "",
    } as IDealershipBarcode;
  }
}

export default FormatBarcode;
