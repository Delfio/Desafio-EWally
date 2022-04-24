import BoletoController from "../controllers/BoletoController";
import DecodeDigitableLine from "../services/DecodeDigitableLine";
import ValidadeCheckDigitOfBarcode from "../services/ValidadeCheckDigitOfBarcode";
import ValidateCheckDigitInBarcodeField from "../services/ValidateCheckDigitInBarcodeField";
import FormatBarcode from "../services/FormatBarcode";


export default () => {
  const decodeDigitableLine = new DecodeDigitableLine();
  const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
  const validateCheckDigitInBarcodeField =
    new ValidateCheckDigitInBarcodeField();
  const formatBarcode = new FormatBarcode();

  const boletoController = new BoletoController(
    decodeDigitableLine,
    validateCheckDigitInBarcodeField,
    formatBarcode,
    validadeCheckDigitOfBarcode
  );

  return boletoController;
};
