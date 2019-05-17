import {Request, Response} from 'express';
import express from 'express';
import log from './utils/log';
import Log from './utils/log';

export default class Server {
    readonly port: number;

    constructor(port: number) {
        this.port = port;
    }

    start () {
        const app = express();
        const logger = new Log();

        app.get('/', function(req: Request, res: Response) {
            res.sendStatus(200);
            logger.info('This query gives nothing.. finally for the moment ;)');
        });

        app.listen(this.port, function () {
            logger.title('Friday server initialized !');
            logger.info('Friday server is available at localhost:4000');
        });
    }
}

const server = new Server(4000);
server.start();
