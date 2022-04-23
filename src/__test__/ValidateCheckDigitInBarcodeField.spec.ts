import ValidateCheckDigitInBarcodeField from "../implementation/services/ValidateCheckDigitInBarcodeField";

describe("Testes responsáveis por validar a regra de negocio da validação do dígito verificador dos campos", () => {
  test("Espero que seja possível validar um dígito verificador", async () => {
    const validateCheckDigitInBarcodeField =
      new ValidateCheckDigitInBarcodeField();

    const request = {
      campo: {
        dv: "9",
        str_barcode_field: "123123123",
      },
    };
    const response = await validateCheckDigitInBarcodeField.handle(request);

    expect(response).not.toBeNull();
    expect(response.check_digit).toEqual(request.campo.dv);
  });

  test("Espero que a validação me retorne que o código é valido", async () => {
    const validateCheckDigitInBarcodeField =
      new ValidateCheckDigitInBarcodeField();

    const request = {
      campo: {
        dv: '8',
        str_barcode_field: "237933812",
      },
    };

    /**
     * {
      codigo_moeda: '9',
      dv: '8',
      instituicao_destinataria: '237',
      posicao_20_24: '33812',
      str_barcode_field: '237933812'
    }
     */
    const response = await validateCheckDigitInBarcodeField.handle(request);

    expect(response).not.toBeNull();
    expect(response.check_digit).toEqual(request.campo.dv);
    expect(response.is_valid).toBe(true);
  });

  test("Espero que a validação me retorne que o código não é valido", async () => {
    const validateCheckDigitInBarcodeField =
      new ValidateCheckDigitInBarcodeField();

    const request = {
      campo: {
        dv: '2',
        str_barcode_field: "237933812",
      },
    };

    /**
     * {
      codigo_moeda: '9',
      dv: '8',
      instituicao_destinataria: '237',
      posicao_20_24: '33812',
      str_barcode_field: '237933812'
    }
     */
    const response = await validateCheckDigitInBarcodeField.handle(request);

    expect(response).not.toBeNull();
    expect(response.check_digit).toEqual(request.campo.dv);
    expect(response.is_valid).toBe(false);
  });
});
