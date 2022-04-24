import IBarcode from '../entities/IBrcode';

export type IRequest = {
    digitable_line: string;
}

export type IResponse = Omit<IBarcode, "fields">;

interface IBoletoController {
    handle: (req: IRequest) => Promise<IResponse>
}

export default IBoletoController;