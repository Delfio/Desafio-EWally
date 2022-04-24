import Expres from 'express';

export default (server: Expres.Express) => {
    server.use(Expres.json());
}