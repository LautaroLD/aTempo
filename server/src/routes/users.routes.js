const Router = require('express');
const protectRouters = require('../middlewares/protect.middleware')
const { user } = require("../schemas/users.schema");
const { login } = require("../schemas/login.schema");
const { updateUserSchema } = require("../schemas/update.user.schema");
const { updatePasswordSchema } = require("../schemas/update.password.schema");
const { checkSchema } = require("express-validator");
const { handleValidator } = require('../helpers/validatorHandler');

const userRouter = Router();

const {
  getUser,
  createUser,
  loginUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/users.controller");


userRouter.post(
  "/",
  checkSchema(user),
  handleValidator,
  createUser
);

userRouter.post(
  '/login',
  checkSchema(login),
  handleValidator,
  loginUser
)

userRouter.use(protectRouters)

userRouter.get('/', getUser)

userRouter.patch(
  '/:id',
  checkSchema(updatePasswordSchema),
  handleValidator,
  updateUserPassword
)

userRouter.put(
  '/:id',
  checkSchema(updateUserSchema),
  handleValidator,
  updateUser
)

module.exports = userRouter;
