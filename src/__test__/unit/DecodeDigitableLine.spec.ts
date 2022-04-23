import DecodeDigitableLine from "../../implementation/services/DecodeDigitableLine";

describe("Testes responsáveis por aplicar regra de negócio sobre a decodificação da validade do boleto", () => {
  test("Espero que seja possível decodificar uma linha digitável nos campos do código de barras", async () => {
    const decodeDigitableLine = new DecodeDigitableLine();
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const response = await decodeDigitableLine.handle({
      digitable_line: DIGITAVEL,
    });
    const { campo_a, campo_b, campo_c, campo_d, campo_e } = response;

    expect(campo_a).not.toBeNull();
    expect(campo_b).not.toBeNull();
    expect(campo_c).not.toBeNull();
    expect(campo_d).not.toBeNull();
    expect(campo_e).not.toBeNull();
  });

  test("Espero que não seja possível decodificar um código inválido (menor que 47 dígitos)", async () => {
    const decodeDigitableLine = new DecodeDigitableLine();
    const DIGITAVEL = "12312311231231231231231231";

    await expect(
      decodeDigitableLine.handle({
        digitable_line: DIGITAVEL,
      })
    ).rejects.toThrow();
  });

  test("Espero que a data de validade do campo 5 esteja correta", async () => {
    const decodeDigitableLine = new DecodeDigitableLine();
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const { campo_e } = await decodeDigitableLine.handle({
      digitable_line: DIGITAVEL,
    });

    const { vencimento } = campo_e;

    expect(vencimento).toBe("22/04/2022");
  });

  test("Espero que o valor do campo 5 esteja correto", async () => {
    const decodeDigitableLine = new DecodeDigitableLine();
    const DIGITAVEL = "23793381286008241354726000063300189630000002000";

    const { campo_e } = await decodeDigitableLine.handle({
      digitable_line: DIGITAVEL,
    });

    const { valor } = campo_e;

    expect(valor).toBe(20);
  });
});
