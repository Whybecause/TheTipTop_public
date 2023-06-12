/**
 *
 * @param {number} length
 * @param {string} string
 * @return {string} initial string with a 's' at the end if length !== 1
 */
export const handlePlural = (length, string) => {
  if (length !== 1) {
    return `${string}s`;
  }
  return string;
};
