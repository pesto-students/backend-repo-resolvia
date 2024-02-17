const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const {
  createComment,
  getResolveComments,
} = require('../controllers/comment.contoller.js');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const router = express.Router();

router.post(
  '/createComment',
  verifyToken,
  upload.single('media'),
  createComment
);
router.get('/getResolveComments/:resolveId', getResolveComments);

module.exports = router;
