import * as t from 'io-ts'

type StringLength_LowerThanOrEqual_To_Max = t.Branded<string, {
    readonly StringLength_LowerThanOrEqual_To_Max: unique symbol;
}>
function isMax(limit: number) {
    return (input: string): input is StringLength_LowerThanOrEqual_To_Max => input.length <= limit;
}
/**
 * Check max length of string
 * @param limit
 */
export function max(limit: number) {
    return t.brand(t.string, isMax(limit), 'StringLength_LowerThanOrEqual_To_Max');
}

type StringLength_GreaterThanOrEqual_To_Min = t.Branded<string, {
    readonly StringLength_GreaterThanOrEqual_To_Min: unique symbol;
}>
function isMin(limit: number) {
    return (input: string): input is StringLength_GreaterThanOrEqual_To_Min =>
    input.length >= limit;
}
/**
 * Check min length of string
 * @param limit
 */
export function min(limit: number) {
    return t.brand(t.string, isMin(limit), 'StringLength_GreaterThanOrEqual_To_Min');
};
