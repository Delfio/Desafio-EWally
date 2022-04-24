import BoletoController from "../../implementation/controllers/BoletoController";
import IDecodeDigitableLine from "../../domain/services/IDecodeDigitableLine";
import IFormatBarcode from "../../domain/services/IFormatBarcode";
import IValidadeCheckDigitOfBarcode from "../../domain/services/IValidadeCheckDigitOfBarcode";
import IValidateCheckDigitInBarcodeField from "../../domain/services/IValidateCheckDigitInBarcodeField";

import DecodeDigitableLine from "../../implementation/services/DecodeDigitableLine";
import FormatBarcode from "../../implementation/services/FormatBarcode";
import ValidadeCheckDigitOfBarcode from "../../implementation/services/ValidadeCheckDigitOfBarcode";
import ValidateCheckDigitInBarcodeField from "../../implementation/services/ValidateCheckDigitInBarcodeField";

function factory() {
  const decodeDigitableLine = new DecodeDigitableLine();
  const formatBarcode = new FormatBarcode();
  const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
  const validateCheckDigitInBarcodeField =
    new ValidateCheckDigitInBarcodeField();

  return {
    decodeDigitableLine,
    formatBarcode,
    validadeCheckDigitOfBarcode,
    validateCheckDigitInBarcodeField,
  };
}

describe("Testes responsáveis por validar a execução das regras de negocio do controller de código de barras", () => {
  let _decodeDigitableLine: DecodeDigitableLine =
    null as unknown as DecodeDigitableLine;
  let _formatBarcode: FormatBarcode = null as unknown as FormatBarcode;
  let _validadeCheckDigitOfBarcode: ValidadeCheckDigitOfBarcode =
    null as unknown as ValidadeCheckDigitOfBarcode;
  let _validateCheckDigitInBarcodeField: ValidateCheckDigitInBarcodeField =
    null as unknown as ValidateCheckDigitInBarcodeField;

  beforeEach(() => {
    const {
      decodeDigitableLine,
      formatBarcode,
      validadeCheckDigitOfBarcode,
      validateCheckDigitInBarcodeField,
    } = factory();

    _decodeDigitableLine = decodeDigitableLine;
    _formatBarcode = formatBarcode;
    _validadeCheckDigitOfBarcode = validadeCheckDigitOfBarcode;
    _validateCheckDigitInBarcodeField = validateCheckDigitInBarcodeField;
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
    const BAR_CODE = "23791896300000020003381260082413542600006330";

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
    expect(response.amount).toBe("20.00");
    expect(response.expiration_date).toBe("22/04/2022");
    expect(response.str_barcode).toBe(BAR_CODE);
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

    expect(ValidadeCheckDigitOfBarcode.handle).toHaveBeenCalled();
  });
});
