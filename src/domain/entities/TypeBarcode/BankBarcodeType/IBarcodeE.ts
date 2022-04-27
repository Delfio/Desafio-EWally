import IGenericBarcodeFieldType from '../IGenericBarcodeFieldType';

interface IBarcodeTypeE extends Omit<IGenericBarcodeFieldType, "dv">{
  vencimento: Date | String;
  valor: Number | String;
}

export { IBarcodeTypeE };
