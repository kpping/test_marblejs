import { User, logUser } from "../../models/user";
import { logError } from "./format_errors";
import { fold } from "fp-ts/lib/Either";

// case 0
console.log('notUser0');
const notUser0 = User.decode({
});
fold(logError, logUser)(notUser0)();

// case 1
console.log('notUser1');
const notUser1 = User.decode({
    username: 1,
    first_name: 1,
    last_name: 1,
});
fold(logError, logUser)(notUser1)();

// case 2
console.log('notUser2');
const notUser2 = User.decode({
    last_name: 'two',
});
fold(logError, logUser)(notUser2)();

// case 3
console.log('notUser3');
const notUser3 = User.decode({
    username: 'three',
    first_name: 'three'
});
fold(logError, logUser)(notUser3)();

// case 4
console.log('notUser4');
const notUser4 = User.decode({
    username: 'four_four_four',
    first_name: 'four'
});
fold(logError, logUser)(notUser4)();

// case 5
console.log('captain');
const captain = User.decode({
    username: 'captain',
    first_name: 'Steve',
});
fold(logError, logUser)(captain)();

// case 6
console.log('ironman');
const ironman = User.decode({
    username: 'ironman',
    first_name: 'Tony',
    last_name: 'Stark'
});
fold(logError, logUser)(ironman)();
