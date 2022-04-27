// Receber a linha digitável e retornar os 5 campos

import IBankBarcode from "../../domain/entities/IBankBarcode";
import IDealershipBarcode from "../../domain/entities/IDealershipBarcode";

import IDecodeDigitableLine, {
  IRequest,
  IResponse,
} from "../../domain/services/IDecodeDigitableLine";
import DecodeBankDigitableLine from "./DecodeBankDigitableLine";
import DecodeDealershipDigitableLine from "./DecodeDealershipDigitableLine";

class DecodeDigitableLine implements IDecodeDigitableLine {
  async handle(req: IRequest): Promise<IResponse> {
    const { digitable_line } = req;
    const decodeBankDigitableLine = new DecodeBankDigitableLine();
    const decodeDealershipDigitableLine = new DecodeDealershipDigitableLine();

    if (digitable_line.length < 47) {
      throw new Error("Invalid typeable line, 47 digits required");
    }

    if (digitable_line.length > 47) {
      const fields = await decodeDealershipDigitableLine.handle(digitable_line);

      return {
        fields,
      } as Pick<IDealershipBarcode, "fields">;
    }

    const fields = await decodeBankDigitableLine.handle(digitable_line);

    return {
      fields,
    } as Pick<IBankBarcode, "fields">;
  }
}

export default DecodeDigitableLine;
