import {
  IBarcodeTypeA,
  IBarcodeTypeB,
  IBarcodeTypeC,
  IBarcodeTypeD,
  IBarcodeTypeE,
} from "../../domain/entities/TypeBarcode/DealershipBarcodeType";

//TODO - colocar o valor e a data de validade
class DecodeDealershipDigitableLine {
  async handle(digitable_line: string) {
    const [campo_a, campo_b, campo_c, campo_d] = await Promise.all([
      this.calcFieldTypeA(digitable_line),
      this.calcFieldTypeB(digitable_line),
      this.calcFieldTypeC(digitable_line),
      this.calcFieldTypeD(digitable_line),
    ]);

    const campo_e = await this.calcFieldTypeE(campo_a, campo_b, campo_d);

    return {
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e,
    };
  }
  private async calcFieldTypeA(digitable_line: string): Promise<IBarcodeTypeA> {
    const length = digitable_line.slice(0, 12);
    const dv = length.slice(11, 12);

    const str_barcode_field = length.slice(0, 11);

    return Promise.resolve({
      dv,
      str_barcode_field,
    });
  }

  private async calcFieldTypeB(digitable_line: string): Promise<IBarcodeTypeB> {
    const length = digitable_line.slice(12, 24);
    const dv = length.slice(11, 12);
    const str_barcode_field = length.slice(0, 11);

    return Promise.resolve({
      dv,
      str_barcode_field,
    });
  }

  private async calcFieldTypeC(digitable_line: string): Promise<IBarcodeTypeC> {
    const length = digitable_line.slice(24, 36);
    const dv = length.slice(11, 12);
    const str_barcode_field = length.slice(0, 11);

    return Promise.resolve({
      dv,
      str_barcode_field,
    });
  }

  private async calcFieldTypeD(digitable_line: string): Promise<IBarcodeTypeD> {
    const length = digitable_line.slice(36, 48);
    const dv = length.slice(11, 12);
    const str_barcode_field = length.slice(0, 11);

    return Promise.resolve({
      dv,
      str_barcode_field,
    });
  }
  private async calcFieldTypeE(
    campo_a: IBarcodeTypeA,
    campo_b: IBarcodeTypeB,
    campo_d: IBarcodeTypeD
  ): Promise<IBarcodeTypeE> {
    const { str_barcode_field: str_barcode_field_a } = campo_a;
    const { str_barcode_field: str_barcode_field_b } = campo_b;
    const { str_barcode_field: str_barcode_field_d } = campo_d;

    //8268000000038880005001
    //    000000
    function formatValue() {
      const _stringSplited =
        `${str_barcode_field_a}${str_barcode_field_b}`.slice(4, 15);

      const _value =
        _stringSplited.slice(0, _stringSplited.length - 2) +
        "." +
        _stringSplited.slice(_stringSplited.length - 2, _stringSplited.length);

      return Number(_value).toFixed(2);
    }

    function formatExpirationDate() {
      const _stringSplited = str_barcode_field_d.slice(0, 6);

      const _value =
        _stringSplited.slice(0, 2) +
        "/" +
        _stringSplited.slice(2, _stringSplited.length);

      return _value;
    }
    const valor = formatValue();

    const vencimento = formatExpirationDate();
    return Promise.resolve({
      valor: valor,
      vencimento: vencimento,
    });
  }
}

export default DecodeDealershipDigitableLine;
