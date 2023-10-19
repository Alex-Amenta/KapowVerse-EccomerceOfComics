const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler } = require('../handlers/userHandler');

const verifyJWT = require('../utils/verifyJwt');

const userRouter = Router();

userRouter.get('/', verifyJWT, getAllUsersHandler); 
userRouter.get('/:id', getUserByIdHandler); // profile
userRouter.post('/register', postUserHandler); // sign up
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', toggleUserActiveHandler);
userRouter.post('/login', loginUserHandler); // login


module.exports = userRouter;