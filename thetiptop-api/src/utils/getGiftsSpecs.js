const { typeReference } = require("../Models");
var randomString = require('random-string');

/**
 *
 * @param {number} giftAmount total amount of gift we need
 * @returns {array}
 */
 function getGiftSpecs(giftAmount) {
  // According to specs ratios
  // This matches the typeReference array
  const giftPercentAmountByType = [60, 20, 10, 6, 4];

  let giftSpecs = [];

  for (const [index, percent] of giftPercentAmountByType.entries()) {
    const nbGiftType = (giftAmount * percent) / 100;
    for (let i=0; i<nbGiftType; i++) {
      const code = randomString({ length: 10, numeric: true, letters: false });
      const type = index;
      const typeDisplay = typeReference[index];
      giftSpecs.push({ code, type, typeDisplay });
    }
  }
  return giftSpecs;
}

module.exports = { getGiftSpecs };
