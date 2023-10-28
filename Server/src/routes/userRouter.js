const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler, deleteAccountHandler } = require('../handlers/userHandler');
const {googleLoginUserHandler} = require('../handlers/googleLoginHandler');

const verifyJWT = require('../utils/verifyJwt');

const userRouter = Router();

userRouter.get('/',verifyJWT, getAllUsersHandler); 
userRouter.get('/:id',verifyJWT, getUserByIdHandler); // profile
userRouter.put('/:id',verifyJWT, updateUserHandler);
userRouter.put('/toggle/:id',verifyJWT, toggleUserActiveHandler);
userRouter.delete('/:id/delete',verifyJWT, deleteAccountHandler);


// estas rutas no pueden tener verify JWT porque no tienen token
userRouter.post('/auth', googleLoginUserHandler); 
userRouter.post('/register', postUserHandler); // sign up
userRouter.post('/login', loginUserHandler); // login




module.exports = userRouter;