const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("./database");

const typeReference = ['infuseur-a-the', 'boite-the-detox', 'boite-the-signature', 'coffret-decouverte-39', 'coffret-decouverte-69']

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USER'
  },
  acceptedNewsletter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  googleId: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isWinner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    defaultValue: null,
  }
}, {
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] },
    }
  }
});

const Gift = sequelize.define('Gift', {
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeDisplay: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      customValidator: (value) => {
        if (!typeReference.includes(value)) {
          throw new Error(`${value} not a valid option for typeDisplay`)
        }
      }
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  checkedOut: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const Game = sequelize.define('Game', {
  startDate: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  endDate: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
});

User.hasOne(Gift, {
  onDelete: 'CASCADE'
});
Gift.belongsTo(User);

module.exports = { User, Gift, Game, typeReference };
