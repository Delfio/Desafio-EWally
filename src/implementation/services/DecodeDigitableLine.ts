// Receber a linha digitável e retornar os 5 campos
import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE,
} from "../../domain/entities/TypeBarcode";

import IDecodeDigitableLine, {
  IRequest,
  IResponse,
} from "../../domain/services/IDecodeDigitableLine";

class DecodeDigitableLine implements IDecodeDigitableLine {
  async handle(req: IRequest): Promise<IResponse> {
    const { digitable_line } = req;

    if (digitable_line.length < 47) {
      throw new Error("Invalid typeable line, 47 digits required");
    }

    const [campo_a, campo_b, campo_c, campo_d, campo_e] = await Promise.all([
      this.calcFieldTypeA(digitable_line),
      this.calcFieldTypeB(digitable_line),
      this.calcFieldTypeC(digitable_line),
      this.calcFieldTypeD(digitable_line),
      this.calcFieldTypeE(digitable_line),
    ]);

    return {
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e,
    };
  }

  private async calcFieldTypeA(digitable_line: string): Promise<IBarcodeTypeA> {
    const length = digitable_line.slice(0, 10);
    const instituicao_destinataria = length.slice(0, 3);
    const moeda = length.slice(3, 4);
    const posicao_20_24 = length.slice(4, 9);
    const dv = length.slice(9, 10);

    return Promise.resolve({
      codigo_moeda: moeda,
      dv,
      instituicao_destinataria,
      posicao_20_24,
    });
  }

  private async calcFieldTypeB(digitable_line: string): Promise<IBarcodeTypeB> {
    const length = digitable_line.slice(10, 21);
    const posicao_25_34 = length.slice(0, 10);
    const dv = length.slice(10, 11);
    return Promise.resolve({
      dv,
      posicao_25_34,
    });
  }

  private async calcFieldTypeC(digitable_line: string): Promise<IBarcodeTypeC> {
    const length = digitable_line.slice(21, 32);
    const posicao_35_44 = length.slice(0, 10);
    const dv = length.slice(10, 11);
    return Promise.resolve({
      dv,
      posicao_35_44,
    });
  }

  private async calcFieldTypeD(digitable_line: string): Promise<IBarcodeTypeD> {
    const dvgeral = digitable_line.slice(32, 33);
    return Promise.resolve({
      dv: dvgeral,
    });
  }

  private async calcFieldTypeE(digitable_line: string): Promise<IBarcodeTypeE> {
    const length = digitable_line.slice(33, digitable_line.length);
    const vencimento = length.slice(0, 4);
    const valor = length.slice(4, 15);
    
    //contar dias corridos.
    function calcDateFactor() {
      const BASE_DATE = "10/07/1997"; //07/10/1997
      const _baseDate = new Date(BASE_DATE);
      _baseDate.setDate(_baseDate.getDate() + Number(vencimento));
      return _baseDate.toLocaleDateString("pt-br");
    }

    function calcularValor() {
      const _firstSplit = valor.slice(0, valor.length-2);
      const _decimalValue = valor.slice(valor.length-2 , valor.length);
      const thisValue = `${_firstSplit}.${_decimalValue}`;
      const valorNumerico = Number(thisValue);
      return valorNumerico;
    }
    const vencimentoFormatado = calcDateFactor();
    const this_value = calcularValor();

    return Promise.resolve({
      valor: this_value,
      vencimento: vencimentoFormatado,
    });
  }
}

export default DecodeDigitableLine;
