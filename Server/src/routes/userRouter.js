const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler } = require('../handlers/user/userHandler');
const {googleLoginUserHandler} = require('../handlers/user/googleLoginHandler');

const verifyJWT = require('../utils/verifyJwt');

const userRouter = Router();

//                /user/
userRouter.get('/', verifyJWT, getAllUsersHandler); 
userRouter.get('/:id', getUserByIdHandler); // profile
userRouter.post('/register', postUserHandler); // sign up
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', toggleUserActiveHandler);
userRouter.post('/login', loginUserHandler); // login
userRouter.post('/auth', googleLoginUserHandler); 

module.exports = userRouter;