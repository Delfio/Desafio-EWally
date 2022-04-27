import {
    IBarcodeTypeA,
    IBarcodeTypeB,
    IBarcodeTypeC,
    IBarcodeTypeD,
    IBarcodeTypeE,
  } from "./TypeBarcode/BankBarcodeType";
  
  interface IBankBarcode {
    fields: {
      campo_a: IBarcodeTypeA;
      campo_b: IBarcodeTypeB;
      campo_c: IBarcodeTypeC;
      campo_d: IBarcodeTypeD;
      campo_e: IBarcodeTypeE;
    };
    str_barcode: string;
    amount: string;
    expiration_date: string;
  }
  
  export default IBankBarcode;
  