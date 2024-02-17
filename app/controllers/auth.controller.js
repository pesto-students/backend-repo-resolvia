const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const error = require('../middleware/error.js');
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
  const { username, email, mobileNum, password } = req.body;
  console.log(req.body);
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(error(400, 'All fields are required'));
  }
  if (password.length < 8) {
    next(error(400, 'Passward should be 8 characters'));
  }
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    mobileNum,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json('SignUp successfull');
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  //console.log(username, password);
  if (!username || !password || username === '' || password === '') {
    next(error(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(error(404, 'User Not Valid'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(error(400, 'Invalid Password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ accessToken: token, user: rest });
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.status(200).json({ accessToken: token, user: rest });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.status(200).json({ accessToken: token, user: rest });
    }
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  try {
    const validEmail = await User.findOne({ email });
    if (!validEmail) {
      return next(error(404, 'User Not Valid'));
    }
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(error(404, 'User Not Valid'));
    }
    if (validUser.username != validEmail.username) {
      return next(error(404, 'User Not Valid'));
    }
    const refreshedtoken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ accessToken: refreshedtoken, user: rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, google, refreshToken };
