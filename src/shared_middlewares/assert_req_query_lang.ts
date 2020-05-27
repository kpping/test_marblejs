import { requestValidator$, t } from '@marblejs/middleware-io';

export const ReqQueryLang = t.partial({
    lang: t.union([
        t.literal('en'),
        t.literal('jp'),
    ]),
});
export type ReqQueryLang = t.TypeOf<typeof ReqQueryLang>;

export const assertReqQueryLang$ = requestValidator$({
    query: ReqQueryLang,
});
