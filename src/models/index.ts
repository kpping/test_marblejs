import * as t from 'io-ts/lib';
import { error, log } from 'fp-ts/lib/Console'
import { pipe } from 'fp-ts/lib/pipeable'
import { fold } from 'fp-ts/lib/Either';
import { last } from 'fp-ts/lib/Array';
import { getOrElse, map } from 'fp-ts/lib/Option';

//
// define user model (2 required, 1 optional)
//
const User = t.intersection([t.type({
    username: t.string,
    first_name: t.string,
}), t.partial({
    last_name: t.string,
})]);

type User = t.TypeOf<typeof User>;

//
// implement print user to console function
//
const getUserString = (user: User) => `${user.username} ${user.first_name} ${user.last_name}`;

const printUser = (user: User) => pipe(user, getUserString, log);

//
// implement print error to console function
//
const getPropPath = (context: t.Context) => context.map((c) => c.key).filter(Boolean).join('.');

const getExpected = (context: t.Context) => pipe(Array.from(context), last, map((c) => c.type.name), getOrElse(() => 'any'));

const getErrorString = (errors: t.Errors) => errors.map((e) => `${getPropPath(e.context)} >> Expected: ${getExpected(e.context)} != Actual: ${String(e.value)}`);

const printError = (errors: t.Errors) => pipe(errors, getErrorString, error);

//
// main section
//
const notUser = User.decode({
    username: 123
});
fold(printError, printUser)(notUser)();

const aUser = User.decode({
    username: 'a',
    first_name: 'a',
});
fold(printError, printUser)(aUser)();

const bUser = User.decode({
    username: 'b',
    first_name: 'b',
    last_name: 'b'
});
fold(printError, printUser)(bUser)();
