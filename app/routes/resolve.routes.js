const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const {
  create,
  getResolves,
  likeResolve,
  updateResolve,
  deleteResolve,
} = require('../controllers/resolve.controller.js');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const router = express.Router();

router.post('/create', verifyToken, upload.array('document', 3), create);
router.get('/getresolves', verifyToken, getResolves);
router.put('/likeResolve/:resolveId', verifyToken, likeResolve);
router.delete('/delete/:resolveId/:userId', verifyToken, deleteResolve);
router.put(
  '/update/:resolveId',
  verifyToken,
  upload.array('document', 3),
  updateResolve
);

module.exports = router;
