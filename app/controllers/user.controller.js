const User = require('../models/user.model.js');
const { uploadFile } = require('../utils/uploadFile');
const test = (req, res) => {
  res.json({ message: 'Test API' });
};

const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
          gender: req.body.gender,
          education: req.body.education,
          profession: req.body.profession,
          country: req.body.country,
          category: req.body.category,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const uploadPhoto = async (req, res, next) => {
  try {
    const url = await uploadFile(req.file);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          profilePicture: url,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = { test, signout, getUser, updateUser, uploadPhoto };
