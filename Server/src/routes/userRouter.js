const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler, deleteAccountHandler, userActivateByToken } = require('../handlers/userHandler');
const {googleLoginUserHandler} = require('../handlers/googleLoginHandler');

const verifyJWT = require('../utils/verifyJwt');

const userRouter = Router();

userRouter.get('/', verifyJWT, getAllUsersHandler); 
userRouter.get('/:id', getUserByIdHandler); // profile
userRouter.post('/register', postUserHandler); // sign up
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', toggleUserActiveHandler);
userRouter.post('/login', loginUserHandler); // login
userRouter.post('/auth', googleLoginUserHandler); 
userRouter.delete('/:id/delete', deleteAccountHandler);
userRouter.get('/verify/:token', userActivateByToken)


module.exports = userRouter;