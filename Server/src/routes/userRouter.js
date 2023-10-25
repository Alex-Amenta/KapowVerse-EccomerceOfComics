const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler, deleteAccountHandler } = require('../handlers/userHandler');
const {googleLoginUserHandler} = require('../handlers/googleLoginHandler');

const verifyJWT = require('../utils/verifyJwt');

const userRouter = Router();

userRouter.get('/', getAllUsersHandler); 
userRouter.get('/:id', getUserByIdHandler); // profile
userRouter.post('/register', postUserHandler); // sign up
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', toggleUserActiveHandler);
userRouter.post('/login', loginUserHandler); // login
userRouter.post('/auth', googleLoginUserHandler); 
userRouter.delete('/:id/delete', deleteAccountHandler);

module.exports = userRouter;