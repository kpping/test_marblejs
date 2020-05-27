import * as t from 'io-ts'

const StrOrNumber = t.union([t.string, t.number]);
type StrOrNumber = t.TypeOf<typeof StrOrNumber>

type StringLength_Or_NumberValue_Greater_Than_Max = t.Branded<StrOrNumber, {
    readonly StringLength_Or_NumberValue_Greater_Than_Max: unique symbol;
}>
function isMax(limit: StrOrNumber) {
    return (input: StrOrNumber): input is StringLength_Or_NumberValue_Greater_Than_Max =>
        typeof input === 'string' ? input.length <= limit : input <= limit
}
/**
 * Check max length of string or max value of number
 * @param limit
 */
export function max(limit: StrOrNumber) {
    return t.brand(StrOrNumber, isMax(limit), 'StringLength_Or_NumberValue_Greater_Than_Max');
}

type StringLength_Or_NumberValue_Lower_Than_Min = t.Branded<StrOrNumber, {
    readonly StringLength_Or_NumberValue_Lower_Than_Min: unique symbol;
}>
function isMin(limit: StrOrNumber) {
    return (input: StrOrNumber): input is StringLength_Or_NumberValue_Lower_Than_Min =>
        typeof input === 'string' ? input.length >= limit : input >= limit
}
/**
 * Check min length of string or min value of number
 * @param limit
 */
export function min(limit: StrOrNumber) {
    return t.brand(StrOrNumber, isMin(limit), 'StringLength_Or_NumberValue_Lower_Than_Min')
};
