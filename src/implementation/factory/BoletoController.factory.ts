import BoletoController from "../controllers/BoletoController";
import DecodeDigitableLine from "../services/DecodeDigitableLine";
import ValidadeCheckDigitOfBarcode from "../services/ValidadeCheckDigitOfBarcode";
import ValidateCheckDigitInBarcodeField from "../services/ValidateCheckDigitInBarcodeField";
import FormatBarcode from "../services/FormatBarcode";
import BoletoControllerCacheProxy from "../proxy/BoletoCacheProxy";
import MemoryCache from "../providers/MemoryCache";

export default () => {
  const decodeDigitableLine = new DecodeDigitableLine();
  const validadeCheckDigitOfBarcode = new ValidadeCheckDigitOfBarcode();
  const validateCheckDigitInBarcodeField =
    new ValidateCheckDigitInBarcodeField();
  const formatBarcode = new FormatBarcode();
  const memoryCacheProvider = MemoryCache();

  const boletoController = new BoletoController(
    decodeDigitableLine,
    validateCheckDigitInBarcodeField,
    formatBarcode,
    validadeCheckDigitOfBarcode
  );

  const _boletoControllerCacheProxy = new BoletoControllerCacheProxy(
    boletoController,
    memoryCacheProvider
  );

  return _boletoControllerCacheProxy;
};
