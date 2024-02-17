const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/verifyUser.js');
const {
  signout,
  test,
  getUser,
  updateUser,
  uploadPhoto,
} = require('../controllers/user.controller.js');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
const router = express.Router();

router.get('/test', test);
router.post('/signout', signout);
router.get('/getUser/:userId', getUser);
router.post('/uploadPhoto', verifyToken, upload.single('photo'), uploadPhoto);
router.put('/update/:userId', verifyToken, updateUser);

module.exports = router;
