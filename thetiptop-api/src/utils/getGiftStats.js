const { Gift, typeReference } = require('../Models');

exports.getGiftStats = async () => {
  let giftByType = [];
  let allGifts = {
    total: 0,
    amountPicked: 0,
    amountPlayed: 0,
    amountCheckedOut: 0,
  };

  for (const [index, typeDisplay] of typeReference.entries()) {
    const gifts  = await Gift.findAndCountAll({
      where: {
        type: index
      },
    });

    const amountPicked = gifts.rows.filter(gift => gift.picked === true).length;
    const amountPlayed = gifts.rows.filter(gift => gift.UserId !== null).length;
    const amountCheckedOut = gifts.rows.filter(gift => gift.checkedOut === true).length;

    giftByType.push({
      typeDisplay,
      total: gifts.count,
      amountPicked,
      amountPlayed,
      amountCheckedOut
    });

    allGifts.total = allGifts.total + gifts.count;
    allGifts.amountPicked = allGifts.amountPicked + amountPlayed;
    allGifts.amountPlayed = allGifts.amountPlayed + amountPlayed;
    allGifts.amountCheckedOut = allGifts.amountCheckedOut + amountCheckedOut;
  }
  return { giftByType, allGifts };
}
