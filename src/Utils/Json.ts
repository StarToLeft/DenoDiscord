
/**
 * Check if string is JSON
 *
 * @export
 * @param {string} str
 * @returns
 */
export function IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}