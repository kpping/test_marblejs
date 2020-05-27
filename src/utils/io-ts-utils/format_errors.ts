import * as t from 'io-ts/lib';
import { error } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { last } from 'fp-ts/lib/Array';
import { getOrElse, map } from 'fp-ts/lib/Option';
import { IO } from 'fp-ts/lib/IO';
import { isNil } from '@ag1/nil';
import { returnSwitch } from '@ag1/return_switch';
import { tryCatch, fold } from 'fp-ts/lib/Either';
import { green, red } from 'chalk';

// get incorrect propery path
export function getPropPath(context: t.Context): string {
    return context.map((c) => c.key).filter(Boolean).join('.');
}

// get expected value
export function getExpected(context: t.Context): string {
    return pipe(Array.from(context), last, map((c) => c.type.name), getOrElse(() => 'any'));
}

// get constructor name or type of val
export function getTypeOf(val: any): string {
    const constructorName = tryCatch<Error, string>(() => val.constructor.name, e => (e instanceof Error ? e : new Error(String(e))));

    return fold(() => typeof val, (t: string) => t)(constructorName);
}

// if val is not nil, put it in bracket
export function formatActualValue(val: unknown): string {
    return returnSwitch<string>(isNil(val))([
        [false, `${getTypeOf(val)}(${val})`],
        [true, `${val}`],
    ]);
}

// convert Error list to String
export function toString(errors: t.Errors): string {
    return errors.map((e) => `Invalid prop: ${getPropPath(e.context)}\t>> Expected: ${green(getExpected(e.context))} <> Actual: ${red(formatActualValue(e.value))}`).join('\n') + '\n';
};

// log to console
export function logError(errors: t.Errors): IO<void> {
    return pipe(errors, toString, error);
};
