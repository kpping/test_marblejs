import { r, use } from '@marblejs/core';
import { t, requestValidator$ } from '@marblejs/middleware-io';
import { map, tap } from 'rxjs/operators';

import { logger } from '../utils/logger';
import { max, min } from '../utils/validation_rules/string_length';

export function getGreetingMessage(name: string): string {
    return `Hi, ${name}`;
}

export const greetReqParams = t.type({
    name: t.intersection([t.string, min(2), max(4)]),
});

export const assertReq$ = requestValidator$({
    params: greetReqParams,
});

// if use before assertReq$, compiler will raise an error
export const echoParams$ = (req$: ReturnType<typeof assertReq$>) =>
    req$.pipe(tap((req) => logger.info(`😀 Params => ${JSON.stringify(req.params)}`)));

export const greet$ = r.pipe(
    r.matchPath('/greet/:name'),
    r.matchType('GET'),
    r.useEffect((req$) =>
        req$.pipe(
            use(assertReq$),
            use(echoParams$),
            map((req) => getGreetingMessage(req.params.name)),
            map((message) => ({ body: { message } })),
        ),
    ),
);
