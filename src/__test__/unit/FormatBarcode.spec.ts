import FormatBarcode from "../../implementation/services/FormatBarcode";

describe("Testes responsáveis por validar regra de negocio em cima da montagem do código de barras final", () => {
  test("Espero que seja possível montar um corpo do código de barras dado uma linha digitável", async () => {

    const formatBarcode = new FormatBarcode();

    const campo_a = {
      codigo_moeda: "9",
      dv: "8",
      instituicao_destinataria: "237",
      posicao_20_24: "33812",
      str_barcode_field: "237933812",
    };
    const campo_b = {
      dv: "7",
      posicao_25_34: "6008241354",
      str_barcode_field: "6008241354",
    };
    const campo_c = {
      dv: "0",
      posicao_35_44: "2600006330",
      str_barcode_field: "2600006330",
    };
    const campo_d = { dv: "1" };
    const campo_e = {
      valor: 20,
      vencimento: "22/04/2022",
      str_barcode_field: "89630000002000",
    };

    const result = await formatBarcode.handle({
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e
    });

    expect(result).not.toBeNull()
  });

  test("Espero código de barras retornado seja válido", async () => {
    const EXPECT_BARCODE = "23791896300000020003381260082413542600006330";

    const formatBarcode = new FormatBarcode();

    const campo_a = {
      codigo_moeda: "9",
      dv: "8",
      instituicao_destinataria: "237",
      posicao_20_24: "33812",
      str_barcode_field: "237933812",
    };
    const campo_b = {
      dv: "7",
      posicao_25_34: "6008241354",
      str_barcode_field: "6008241354",
    };
    const campo_c = {
      dv: "0",
      posicao_35_44: "2600006330",
      str_barcode_field: "2600006330",
    };
    const campo_d = { dv: "1" };
    const campo_e = {
      valor: 20,
      vencimento: "22/04/2022",
      str_barcode_field: "89630000002000",
    };

    const result = await formatBarcode.handle({
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e
    });

    expect(result).not.toBeNull()
    expect(result.str_barcode).toBe(EXPECT_BARCODE)
  });

  test("Espero que o valor presente no código de barras seja válido", async () => {
    const formatBarcode = new FormatBarcode();

    const campo_a = {
      codigo_moeda: "9",
      dv: "8",
      instituicao_destinataria: "237",
      posicao_20_24: "33812",
      str_barcode_field: "237933812",
    };
    const campo_b = {
      dv: "7",
      posicao_25_34: "6008241354",
      str_barcode_field: "6008241354",
    };
    const campo_c = {
      dv: "0",
      posicao_35_44: "2600006330",
      str_barcode_field: "2600006330",
    };
    const campo_d = { dv: "1" };
    const campo_e = {
      valor: 20,
      vencimento: "22/04/2022",
      str_barcode_field: "89630000002000",
    };

    const result = await formatBarcode.handle({
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e
    });

    expect(result.amount).toBe("20.00")
  });

  test("Espero que a função consiga lidar com a data de validade do boleto", async () => {
    const formatBarcode = new FormatBarcode();

    const campo_a = {
      codigo_moeda: "9",
      dv: "8",
      instituicao_destinataria: "237",
      posicao_20_24: "33812",
      str_barcode_field: "237933812",
    };
    const campo_b = {
      dv: "7",
      posicao_25_34: "6008241354",
      str_barcode_field: "6008241354",
    };
    const campo_c = {
      dv: "0",
      posicao_35_44: "2600006330",
      str_barcode_field: "2600006330",
    };
    const campo_d = { dv: "1" };
    const campo_e = {
      valor: 20,
      vencimento: "22/04/2022",
      str_barcode_field: "89630000002000",
    };

    const result = await formatBarcode.handle({
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e
    });

    expect(result.expiration_date).toEqual(campo_e.vencimento)

    const formatedDate = "04-22-2022";
    const result_with_date = await formatBarcode.handle({
      campo_a,
      campo_b,
      campo_c,
      campo_d,
      campo_e: {
        ...campo_e,
        vencimento: new Date(formatedDate)
      }
    });

    expect(result_with_date.expiration_date).toEqual(campo_e.vencimento)

  });
});
