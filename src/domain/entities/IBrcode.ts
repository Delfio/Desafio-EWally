import IBankBarcode from "./IBankBarcode";
import IDealershipBarcode from "./IDealershipBarcode";

type IBarcode = IDealershipBarcode | IBankBarcode;

export default IBarcode;
