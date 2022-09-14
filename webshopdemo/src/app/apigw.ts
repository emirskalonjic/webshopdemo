import { Request, Response } from 'express';

class APIGW {

    public async home(req: Request, res: Response) {
        return res.send('<h1>Webshop Demo App</h1>');
    }

    public async about(req: Request, res: Response) {
        return res.send('<h1>About</h1>');
    }
}

export { APIGW };