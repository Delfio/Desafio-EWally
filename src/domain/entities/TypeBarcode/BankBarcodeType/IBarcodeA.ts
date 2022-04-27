import IGenericBarcodeFieldType from '../IGenericBarcodeFieldType';

interface IBarcodeTypeA extends IGenericBarcodeFieldType {
  instituicao_destinataria: string;
  codigo_moeda: string;
  posicao_20_24: string;
}

export { IBarcodeTypeA };
