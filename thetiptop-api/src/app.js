require('dotenv').config()
var express = require('express');
const CsvParser = require("json2csv").Parser;
const cors = require('cors');
const sequelize = require('./database');
const { User } = require('./Models');
var gift = require('./routes/gift');
var user = require('./routes/user');
var auth = require('./routes/auth');
var game = require('./routes/game');
var mail = require('./routes/mail');
const { authenticate } = require('./middleware/auth');
const { setDefaultAccount } = require('./utils/setDefaultAccount');
const { getGiftStats } = require('./utils/getGiftStats');
const { hasRole } = require('./middleware/hasRole');
var app = express();

app.use(cors());

app.use(express.json());

// login route
app.use('', auth);

// CRUD user
app.use('/user', user);

// CRUD gift
app.use('/gift', gift);

// CRUD game
app.use('/game', game);

// MAIL
app.use('/mail', mail);

app.get('/helloworld', (req, res) => {
  res.json({success: true, content: 'Hello World!'})
})

// For admin dashboard
app.get('/stats', authenticate, async (req, res) => {
  const users = await User.findAll();
  const totalUsers = users.length;

  let totalAcceptedNewsletter = 0;
  for (const user of users) {
    if (user.acceptedNewsletter) {
      totalAcceptedNewsletter += 1;
    };
  }

  const userStats = {
    totalUsers,
    totalAcceptedNewsletter,
  };

  const giftStats = await getGiftStats();

  return res.status(200).json({
    success: true,
    content: {
      userStats,
      giftStats,
    }
  })
});

// Permettre aux administrateurs d'utiliser les donnees a des fins d'emailing
app.get('/emailing', [authenticate, hasRole(['ADMIN'])], async (req, res) => {
    const users = await User.findAll({
      where: { acceptedNewsletter: true, role: 'USER'},
      attributes: ['firstName', 'lastName','email']
    });

    if (!users.length) {
      return res.status(404).json({
        success: false,
        content: 'No user subscribed to the newsletter',
      });
    }

    let formated_users = [];

    users.forEach((user) => {
      const { firstName, lastName, email } = user;
      formated_users.push({ firstName, lastName, email });
    });

    const csvFields = ["firstName", "lastName", "email"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(formated_users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    return res.status(200).end(csvData);
});

app.listen(process.env.PORT, async () => {
  console.log(`App listening on port ${process.env.PORT}`)

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
  setDefaultAccount(
    'ADMIN',
    'admin',
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD,
  );
  setDefaultAccount(
    'EMPLOYEE',
    'employee',
    process.env.EMPLOYEE_EMAIL,
    process.env.EMPLOYEE_PASSWORD,
  );
  setDefaultAccount(
    'USER',
    'user',
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
  );
})
