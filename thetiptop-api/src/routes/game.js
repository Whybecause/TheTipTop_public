var express = require('express');
var { Op } = require('sequelize');

const { Gift, Game, User } = require('../Models');
const { authenticate } = require('../middleware/auth');
const { hasRole } = require('../middleware/hasRole');
const { getRandom } = require('../utils/getRandom');

var router = express.Router();

// Launch the game
router.post('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        content: 'Bad Parameter'
      });
    }

    const game = await Game.findOne();
    if (game) {
      return res.status(400).json({
        success: false,
        content: 'Game already started, end the game or edit the end date'
      });
    }


    const newGame = await Game.create({ startDate, endDate });

    return res.status(200).json({
      success: true,
      content: newGame,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    });
  }
});

// Get the game start and end date
router.get('/', async (req, res) => {
  try {
    const game = await Game.findOne();
    return res.status(200).json({
      success: true,
      content: game,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    });
  }
});

// Update the endDate of the game
router.patch('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  const { endDate } = req.body;

  if (!endDate) {
    return res.status(400).json({
      success: false,
      content: 'Bad Parameter',
    });
  }

  try {
    const game = await Game.findOne();

    if (!game) {
      return res.status(404).json({
        success: false,
        content: 'No game created yet',
      });
    }

    const updatedGame = await game.update({ endDate });

    return res.status(200).json({
      success: true,
      content: updatedGame,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    });
  }
});

// End the game
router.patch('/end', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    const game = await Game.findOne();

    if (!game) {
      return res.status(404).json({
        success: false,
        content: 'No game created yet',
      });
    }

    const endDate = new Date();
    endDate.setHours(endDate.getHours() - 1);

    const updatedGame = await game.update({ endDate });

    return res.status(200).json({
      success: true,
      content: updatedGame,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    });
  }
});

// Delete the game
router.delete('/', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    await Game.destroy({
      where: {},
      truncate: true,
    });

    return res.status(200).json({
      success: true,
      content: 'Game deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    });
  }
});

// Pick and set the final winner of the game
router.patch('/winner', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    const game = await Game.findOne();

    if (!game) {
      return res.status(400).json({
        success: false,
        content: 'Le jeu n\'a pas encore commencé',
      });
    }

    const isGameEnded = new Date(game.endDate).getTime() < new Date().getTime();

    if (!isGameEnded) {
      return res.status(400).json({
        success: false,
        content: 'Le jeu n\'est pas encore terminé !',
      });
    }

    // Find all players ID associated to a gift
    const players = await Gift.findAll({
      where: {
        UserId: {
          [Op.not]: null,
        }
      },
      attributes: ['UserId'],
    });

    if (!players.length) {
      return res.status(404).json({
        success: false,
        content: 'Personna n\'a joué...',
      });
    }

    // Get an array of ID
    const playersArr = players.map((player) => player.UserId);

    // Remove duplicate IDS
    const uniquePlayersArr = [...new Set(playersArr)];

    // Pick a random UserId in the arr
    const winnerId = getRandom(uniquePlayersArr);

    // Find the user associated and update the isWinner value to true
    const winner = await User.findByPk(winnerId);
    const finalWinner = await winner.update({ isWinner: true})

    return res.status(200).json({
      success: true,
      content: finalWinner
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Find the final winner of the game
router.get('/winner', async (req, res) => {
  try {
    const winner = await User.scope('withoutPassword').findOne({
      where: { isWinner: true }
    });

    if (!winner) {
      return res.status(201).json({
        success: true,
        content: {},
      });
    }

    return res.status(200).json({
      success: true,
      content: winner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

// Delete the winner
router.patch('/reset-winner', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
  try {
    await User.update(
      { isWinner: false },
      { where: { isWinner: true} }
    );
    return res.status(200).json({
      success: true,
      content: {},
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
});

module.exports = router;
