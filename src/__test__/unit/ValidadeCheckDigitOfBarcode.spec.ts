import ValidadeCheckDigitOfBarcode from "../../implementation/services/ValidadeCheckDigitOfBarcode";

describe("Testes responsáveis por validar a regra de negocio na validação geral do código de barras", () => {
  test("Espero que seja possível validar um código de barras", async () => {
    const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
    const request = {
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
    };

    const response = await validadeCheckDigitOfBarcode.handle(request);

    expect(response).not.toBeNull();
  });

  test("Espero que a validação me retorne que o código é valido", async () => {
    const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
    const request = {
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
    };

    const response = await validadeCheckDigitOfBarcode.handle(request);

    expect(response.is_valid).toBe(true);
    expect(response.check_digit).toBe(request.fields.campo_d.dv);
  });

  test("Espero que a validação me retorne que o código não é valido", async () => {
    const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
    const request = {
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
      str_barcode: "23791896300000020003381260082413542600006220",
    };

    const response = await validadeCheckDigitOfBarcode.handle(request);

    expect(response.is_valid).toBe(false);
    expect(response.check_digit).not.toBe(request.fields.campo_d.dv);
  });

  test("Espero que a validação retorne erro caso o código de barras não tenha os 44 digítos", async () => {
    const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
    const request = {
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
      str_barcode: "123123123123",
    };

    await expect(validadeCheckDigitOfBarcode.handle(request)).rejects.toThrow();
  });
});
