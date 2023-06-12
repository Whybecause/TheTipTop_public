const bcrypt = require('bcrypt');
const { User } = require('../Models');

exports.setDefaultAccount = async (role, name, email, password) =>  {
  const defaultAccount = await User.findOne({
    where: {
      email: email,
    }
  });

  if (defaultAccount) {
    return console.log(`Email ${email} already exists`);
  }

  bcrypt.hash(password, Number(process.env.SALTROUNDS), async (err, hash) => {
    if (err) {
       return console.log(err)
    }

    const newAccount = await User.create({
      username: name,
      firstName: name,
      lastName: name,
      email: email,
      password: hash,
      role,
    });

    if (!newAccount) {
      return console.log(`Error: could not create default ${role}`);
    }

    return console.log(`Default ${role} ${email} created`);
  });
}
