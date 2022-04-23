import IFormatBarcode, {
  IRequest,
  IResponse,
} from "../../domain/services/IFormatBarcode";

class FormatBarcode implements IFormatBarcode {
  async handle(req: IRequest): Promise<IResponse> {
    const { campo_a, campo_b, campo_c, campo_d, campo_e } = req;

    const { codigo_moeda, instituicao_destinataria, posicao_20_24 } = campo_a;

    const { posicao_25_34 } = campo_b;

    const { posicao_35_44 } = campo_c;

    const { dv } = campo_d;
    const { str_barcode_field, valor, vencimento } = campo_e;

    let amount = "";
    let expiration_date = "";
    if (typeof valor === "number") {
      amount = valor.toFixed(2);
    } else {
      amount = String(valor);
    }

    if (typeof vencimento !== "string") {
      expiration_date = vencimento.toLocaleString("pt-br");
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
    };
  }
}

export default FormatBarcode;
