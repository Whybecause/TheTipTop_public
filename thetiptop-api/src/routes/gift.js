var express = require('express');
const { limiter } = require('../middleware/bruteForce');
const { Gift } = require('../Models');
const { authenticate } = require('../middleware/auth');
const { hasRole } = require('../middleware/hasRole');
var router = express.Router();
const { getGiftSpecs } = require('../utils/getGiftsSpecs');
const { getRandom } = require('../utils/getRandom');

// Create all gifts at once
router.post('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  const giftAmount = Number(req.body.giftAmount);

  if (!giftAmount) {
    return res.status(400).json({
      success: false,
      content: 'Bad Parameter, missing giftAmount of type number',
    });
  }

  const giftSpecs = getGiftSpecs(giftAmount);

  try {
    await Gift.bulkCreate(giftSpecs);

    return res.status(200).json({
      success: true,
      content: `${giftAmount} gifts have been created`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// User submit his code to get a gift
// router.post('/submit-code', [authenticate, limiter], async (req, res) => {
router.post('/submit-code', authenticate, async (req, res) => {
  const { code } = req.body || {};

  if (!code) {
    return res.status(400).json({
      succcess: false,
      content: 'Bad Parameter',
    });
  }

  try {
    const gift = await Gift.findOne({where: { code }});

    if (!gift || gift.picked === false) {
      return res.status(404).json({
        success: false,
        content: 'Ce code n\'est pas valide',
      });
    }

    if (gift.UserId !== null) {
      return res.status(409).json({
        success: false,
        content: 'Ce code a déjà été utilisé',
      });
    }

    const updatedGift = await Gift.update({UserId: req.user.id},
      { where: { code } }
    );

    if (updatedGift === 0) {
      return res.status(500).json({
        success: false,
        content: 'A server error occured, try again later or contact our support',
      });
    }

    const finalGift = await Gift.findOne({where: { code }});

    return res.status(200).json({
      success: true,
      content: finalGift,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

/* Get all existing gifts */
router.get('/', [authenticate, hasRole(['ADMIN', 'EMPLOYEE'])], async (req, res) => {
  try {
    let gifts = await Gift.findAll();
    return res.status(200).json({
      success: true,
      content: gifts
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Get a random gift code that has not yet been picked and patch its picked property to true
// Case: for shop when generating a ticket
router.get('/code', [authenticate, hasRole(['ADMIN', 'EMPLOYEE'])], async (req, res) => {
  try {
    const availableGifts = await Gift.findAll({
      where: { picked: false},
      attributes: ['code'],
    });

    if (availableGifts.length === 0) {
      return res.status(404).json({
        success: false,
        content: 'All gifts code have been picked'
      });
    }

    const picked = getRandom(availableGifts)

    await Gift.update(
      { picked: true },
      { where: { code: picked.code} }
    );

    return res.status(200).json({
      success: true,
      content: picked.code,
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

/* Get all gifts a user has */
router.get('/belongs/:userId', authenticate, async (req, res) => {
  const isAdmin = req.user.role === 'ADMIN' || req.user.role === 'EMPLOYEE';

  try {
    if (!isAdmin && req.user.id !== Number(req.params.userId)) {
      return res.status(403).json({
        success: false,
        content: 'Unauthorized',
      });
    }

    let gifts = await Gift.findAll(
      {
        where: { UserId: req.params.userId },
        order: [['createdAt', 'DESC']],
      }
    )

    if (!gifts) {
      return res.status(200).json({
        success: true,
        content: [],
      });
    }
    return res.status(200).json({
      success: true,
      content: gifts,
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Employee marks the gift as checkedOut when giving it to user
router.patch('/:id', [authenticate, hasRole(['ADMIN', 'EMPLOYEE'])], async (req, res) => {
  const { checkedOut } = req.body;
  try {
    if (typeof checkedOut !== 'boolean') {
      return res.status(400).json({
        success: false,
        content: 'Bad Parameter Error: checkedOut must be of type Boolean',
      });
    }

      const giftToUpdate = await Gift.findOne(
        { where: { id: req.params.id } }
      );

      if (!giftToUpdate.UserId) {
        return res.status(400).json({
          success: false,
          content: 'You can not checkout a gift that doesn\`t have a UserId',
        });
      }

      let content = '';
      if (checkedOut) {
        content = 'Gift has been checked out'
      } else {
        content = 'Gift has been unchecked'
      }

      await giftToUpdate.update({ checkedOut });

      return res.status(200).json({
        success: true,
        content
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: 'A server error occured, try again later or contact our support',
    })
  }
});

// Delete all gifts
router.delete('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    await Gift.destroy({
      where: {},
      truncate: true,
    });
    return res.status(200).json({
      success: true,
      content: 'All gifts have been deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
 });

// Delete a gift by its id
router.delete('/:id', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    let deleteGift = await Gift.findOne(
      { where: { id: req.params.id } }
    )

    if (!deleteGift) {
      return res.status(404).json({
        success: false,
        content: 'Not Found'
      })
    }

    await deleteGift.destroy()

    return res.status(200).json({
      success: true,
      content: 'Gift supprimé'
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

module.exports = router;

// // This was not ok since all gifts need to be generated at once to respect specs ratios
// router.post('/', [authenticate, hasRole(['ADMIN', 'EMPLOYEE'])], async (req, res) => {
//   try {
//     const game = await Game.findOne();

//     if (game !== null) {
//       const isGameEnded = new Date(game.endDate).getTime() < new Date().getTime();

//       if (isGameEnded) {
//         return res.status(400).json({
//           success: false,
//           content: 'Le jeu est déjà terminé !',
//         });
//       }
//     }

//     // TODO: prendre en compte que gift généré que si commande > 49€ ?

//     // Find gift with highest ID to ensure less than 1 500 000 codes generated
//     const giftWithHighestId = await Gift.findAll({
//       attributes: [
//         [sequelize.fn('MAX', sequelize.col('id')), 'id']
//       ]
//     });

//     if (parseInt(giftWithHighestId[0].dataValues.id) > parseInt(process.env.MAXIMUM_GIFTS)) {
//       return res.status(409).json({
//         success: false,
//         content: 'The maximum amount of gifts have been issued'
//       })
//     }

//     // Randomize the gift generation according to specs ratio
//     let randomised = Math.floor(Math.random() * 100);
//     let randomIndex = -1;

//     if (randomised < 60) {
//       randomIndex = 0;
//     } else if (randomised >= 60 && randomised < 80) {
//       randomIndex = 1;
//     } else if (randomised >= 80 && randomised < 90) {
//       randomIndex = 2;
//     } else if (randomised >= 90 && randomised < 96) {
//       randomIndex = 3;
//     } else if (randomised >= 96) {
//       randomIndex = 4;
//     }

//     let gift = await Gift.create({
//       type: randomIndex,
//       typeDisplay: typeReference[randomIndex],
//       checkedOut: false
//     });

//     if (!gift) {
//       return res.status(500).json({
//         success: false,
//         content: 'A server error occured, try again later or contact our support',
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       content: gift.code
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       content: error,
//     });
//   }
// });
