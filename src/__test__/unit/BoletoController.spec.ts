import BoletoController from "../../implementation/controllers/BoletoController";
import IDecodeDigitableLine from "../../domain/services/IDecodeDigitableLine";
import IFormatBarcode from "../../domain/services/IFormatBarcode";
import IValidadeCheckDigitOfBarcode from "../../domain/services/IValidadeCheckDigitOfBarcode";
import IValidateCheckDigitInBarcodeField from "../../domain/services/IValidateCheckDigitInBarcodeField";

describe("Testes responsáveis por validar a execução das regras de negocio do controller de código de barras", () => {
  test("Espero que seja possível formatar e decodificar um código de barras", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
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

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: true,
        })),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    const response = await boletoController.handle({
      digitable_line: DIGITAVEL,
    });

    expect(response).not.toBeNull();
  });

  test("Espero que seja possível formatar e decodificar um código de barras, chamando todas as funções necessárias", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
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

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: true,
        })),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    const response = await boletoController.handle({
      digitable_line: DIGITAVEL,
    });

    expect(response).not.toBeNull();
    expect(ValidateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(ValidadeCheckDigitOfBarcode.handle).toHaveBeenCalled();
    expect(FormatBarcode.handle).toHaveBeenCalled();
    expect(DecodeDigitableLine.handle).toHaveBeenCalled();
  });

  test("Espero que caso mande um código inválido, um erro deverá ser retornado", async () => {
    const DIGITAVEL = "invalid-fields-asdfasdf";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
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

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: true,
        })),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    await expect(
      boletoController.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();
  });

  test("Espero que caso mande um código inválido, um erro deverá ser retornado", async () => {
    const DIGITAVEL = "invalid-fields-asdfasdf";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn(),
    };

    const FormatBarcode: IFormatBarcode = {
      handle: jest.fn(),
    };

    const ValidadeCheckDigitOfBarcode: IValidadeCheckDigitOfBarcode = {
      handle: jest.fn(),
    };

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn(),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    await expect(
      boletoController.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();
  });

  test("Espero que caso a validação dos dígitos verificadores derem inválidos um erro sera retornado", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
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

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: false,
        })),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    await expect(boletoController.handle({
      digitable_line: DIGITAVEL,
    })).rejects.toThrow();

    expect(ValidateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(ValidadeCheckDigitOfBarcode.handle).not.toHaveBeenCalled();
    expect(FormatBarcode.handle).not.toHaveBeenCalled();
    expect(DecodeDigitableLine.handle).toHaveBeenCalled();
  });

  test("Espero que caso a validação do dígitos verificador do código de baras der inválido um erro sera retornado", async () => {
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const DecodeDigitableLine: IDecodeDigitableLine = {
      handle: jest.fn().mockImplementation(async (any: any) => ({
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
        is_valid: false,
      })),
    };

    const ValidateCheckDigitInBarcodeField: IValidateCheckDigitInBarcodeField =
      {
        handle: jest.fn().mockImplementation(async (any: any) => ({
          check_digit: "9",
          is_valid: true,
        })),
      };

    const boletoController = new BoletoController(
      DecodeDigitableLine,
      ValidateCheckDigitInBarcodeField,
      FormatBarcode,
      ValidadeCheckDigitOfBarcode
    );

    await expect(boletoController.handle({
      digitable_line: DIGITAVEL,
    })).rejects.toThrow();

    expect(ValidateCheckDigitInBarcodeField.handle).toHaveBeenCalled();
    expect(ValidadeCheckDigitOfBarcode.handle).toHaveBeenCalled();
    expect(FormatBarcode.handle).toHaveBeenCalled();
    expect(DecodeDigitableLine.handle).toHaveBeenCalled();
  });
});
