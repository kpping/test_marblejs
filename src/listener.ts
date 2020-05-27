import { bodyParser$ } from '@marblejs/middleware-body';
import { combineRoutes, httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { greet$ } from './route_effects/greet!@name';
import { hello$ } from './route_effects/hello';

// run before every effect
export const middlewares = [
    logger$(),
    bodyParser$(),
];

// group effects under /api/**/*
export const api$ = combineRoutes('/api', [
    greet$,
    hello$,
]);

export const effects = [
    api$,
];

export const listener = httpListener({
    middlewares,
    effects,
});
