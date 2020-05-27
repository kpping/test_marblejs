import { returnSwitch } from '@ag1/return_switch';
import { r, use} from '@marblejs/core';
import { t } from '@marblejs/middleware-io';
import { map, tap } from 'rxjs/operators';
import { assertReqQueryLang$, ReqQueryLang } from '../shared_middlewares/assert_req_query_lang';
import { logger } from '../utils/logger';

export const en: string = 'hello, world';
export const jp: string = 'ハロー・ワールド';

export function getHelloMessage(lang?: t.TypeOf<typeof ReqQueryLang.props.lang>) {
    return returnSwitch<string>(lang)([
        ['en', en],
        ['jp', jp],
        // throw error if not match
    ]);
}

// if use before assertReqQueryLang$, compiler will raise an error
export const echoQuery$ = (req$: ReturnType<typeof assertReqQueryLang$>) => req$.pipe(
    tap((req) => logger.info(`😀 Query => ${JSON.stringify(req.query)}`)),
);

export const hello$ = r.pipe(
    r.matchPath('/hello'),
    r.matchType('GET'),
    r.useEffect(req$ => req$.pipe(
        use(assertReqQueryLang$),
        use(echoQuery$),
        map((req) => getHelloMessage(req.query.lang)),
        map((message) => ({ body: { message } })),
    )),
);
