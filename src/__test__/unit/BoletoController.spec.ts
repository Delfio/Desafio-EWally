import BoletoController from "../../implementation/controllers/BoletoController";
import IDecodeDigitableLine from "../../domain/services/IDecodeDigitableLine";
import IFormatBarcode from "../../domain/services/IFormatBarcode";
import IValidadeCheckDigitOfBarcode from "../../domain/services/IValidadeCheckDigitOfBarcode";
import IValidateCheckDigitInBarcodeField from "../../domain/services/IValidateCheckDigitInBarcodeField";

function factory() {
  const DecodeDigitableLine: IDecodeDigitableLine = {
    handle: jest.fn().mockImplementation(async (any: any) => ({
      fields: {
        campo_a: {
          codigo_moeda: "9",
          dv: "8",
          instituicao_destinataria: "237",
          posicao_20_24: "33812",
          str_barcode_field: "237933812",
        },
        campo_b: {
          dv: "7",
          posicao_25_34: "6008241354",
          str_barcode_field: "6008241354",
        },
        campo_c: {
          dv: "0",
          posicao_35_44: "2600006330",
          str_barcode_field: "2600006330",
        },
        campo_d: { dv: "1" },
        campo_e: {
          valor: 20,
          vencimento: "22/04/2022",
          str_barcode_field: "89630000002000",
        },
      },
    })),
  };

  const FormatBarcode: IFormatBarcode = {
    handle: jest.fn().mockImplementation(async (any: any) => ({
      amount: "20.00",
      expiration_date: "22/04/2022",
      fields: {
        campo_a: {
          codigo_moeda: "9",
          dv: "8",
          instituicao_destinataria: "237",
          posicao_20_24: "33812",
          str_barcode_field: "237933812",
        },
        campo_b: {
          dv: "7",
          posicao_25_34: "6008241354",
          str_barcode_field: "6008241354",
        },
        campo_c: {
          dv: "0",
          posicao_35_44: "2600006330",
          str_barcode_field: "2600006330",
        },
        campo_d: { dv: "1" },
        campo_e: {
          valor: 20,
          vencimento: "22/04/2022",
          str_barcode_field: "89630000002000",
        },
      },
      str_barcode: "23791896300000020003381260082413542600006330",
    })),
  };

  const ValidadeCheckDigitOfBarcode: IValidadeCheckDigitOfBarcode = {
    handle: jest.fn().mockImplementation(async (any: any) => ({
      check_digit: "1",
      is_valid: true,
    })),
  };

  const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField = {
    handle: jest.fn().mockImplementation(async (any: any) => ({
      check_digit: "9",
      is_valid: true,
    })),
  };

  return {
    DecodeDigitableLine,
    FormatBarcode,
    ValidadeCheckDigitOfBarcode,
    ValidateCheckDigitInBarcodeField,
  };
}

describe("Testes responsáveis por validar a execução das regras de negocio do controller de código de barras", () => {
  let _decodeDigitableLine: IDecodeDigitableLine =
    null as unknown as IDecodeDigitableLine;
  let _formatBarcode: IFormatBarcode = null as unknown as IFormatBarcode;
  let _validadeCheckDigitOfBarcode: IValidadeCheckDigitOfBarcode =
    null as unknown as IValidadeCheckDigitOfBarcode;
  let _validateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
    null as unknown as IValidateCheckDigitInBarcodeField;

  beforeEach(() => {
    const {
      DecodeDigitableLine,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode,
      ValidateCheckDigitInBarcodeField,
    } = factory();

    _decodeDigitableLine = DecodeDigitableLine;
    _formatBarcode = FormatBarcode;
    _validadeCheckDigitOfBarcode = ValidadeCheckDigitOfBarcode;
    _validateCheckDigitInBarcodeField = ValidateCheckDigitInBarcodeField;
  });

  test("Espero que seja possível formatar e decodificar um código de barras", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const boletoController = new BoletoController(
      _decodeDigitableLine,
      _validateCheckDigitInBarcodeField,
      _formatBarcode,
      _validadeCheckDigitOfBarcode
    );

    const response = await boletoController.handle({
      digitable_line: DIGITAVEL,
    });

    expect(response).not.toBeNull();
  });

  test("Espero que seja possível formatar e decodificar um código de barras, chamando todas as funções necessárias", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const boletoController = new BoletoController(
      _decodeDigitableLine,
      _validateCheckDigitInBarcodeField,
      _formatBarcode,
      _validadeCheckDigitOfBarcode
    );

    const response = await boletoController.handle({
      digitable_line: DIGITAVEL,
    });

    console.log(response)
    expect(response).not.toBeNull();
    expect(_validateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(_validadeCheckDigitOfBarcode.handle).toHaveBeenCalled();
    expect(_formatBarcode.handle).toHaveBeenCalled();
    expect(_decodeDigitableLine.handle).toHaveBeenCalled();
  });

  test("Espero que caso mande um código inválido, um erro deverá ser retornado", async () => {
    const DIGITAVEL = "invalid-fields-asdfasdf";

    const boletoController = new BoletoController(
      _decodeDigitableLine,
      _validateCheckDigitInBarcodeField,
      _formatBarcode,
      _validadeCheckDigitOfBarcode
    );

    await expect(
      boletoController.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();
  });

  test("Espero que caso a validação dos dígitos verificadores derem inválidos um erro sera retornado", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: false,
        })),
      };

    const boletoController = new BoletoController(
      _decodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      _formatBarcode,
      _validadeCheckDigitOfBarcode
    );

    await expect(
      boletoController.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();

    expect(ValidateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(_validadeCheckDigitOfBarcode.handle).not.toHaveBeenCalled();
    expect(_formatBarcode.handle).not.toHaveBeenCalled();
    expect(_decodeDigitableLine.handle).toHaveBeenCalled();
  });

  test("Espero que caso a validação do dígitos verificador do código de baras der inválido um erro sera retornado", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const ValidadeCheckDigitOfBarcode: IValidadeCheckDigitOfBarcode = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
        check_digit: "1",
        is_valid: false,
      })),
    };

    const boletoController = new BoletoController(
      _decodeDigitableLine,
      _validateCheckDigitInBarcodeField,
      _formatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    await expect(
      boletoController.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();

    expect(_validateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(ValidadeCheckDigitOfBarcode.handle).toHaveBeenCalled();
    expect(_formatBarcode.handle).toHaveBeenCalled();
    expect(_decodeDigitableLine.handle).toHaveBeenCalled();
  });
});
