import { createServer, HttpServer } from '@marblejs/core';
import { IO } from 'fp-ts/lib/IO';

import { listener } from './listener';

export const startServer: IO<Promise<HttpServer>> = async () => {
    const server = await (
        await createServer({
            port: parseInt(process.env.PORT || '3000', 10),
            listener,
        })
    )();

    return server;
};
