const Router = require('express');
const userRouter = Router();
const {
  getUser,
  createUser,
  login,
  updateUser,
} = require("../controllers/users.controller");
const {checkMultipart, handleUploadFirebase} = require("../middlewares/upload.middleware")

userRouter.post(
  "/",
  checkMultipart,
  handleUploadFirebase,
  createUser
);

userRouter.post(
  '/login',
  login
)

userRouter.get('/', getUser)

userRouter.put(
  '/:id',
  checkMultipart,
  handleUploadFirebase,
  updateUser
)
module.exports = userRouter;
