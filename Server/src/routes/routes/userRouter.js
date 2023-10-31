const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler, deleteAccountHandler, userActivateByToken, resender } = require('../../handlers/userHandler');
const {googleLoginUserHandler} = require('../../handlers/googleLoginHandler');

const verifyJWT = require('../../utils/verifyJwt');
const verifyAdmin = require('../../utils/verifyIsAdmin');

const userRouter = Router();

// para el admin
userRouter.get('/',verifyJWT, verifyAdmin, getAllUsersHandler); 
userRouter.put('/toggle/:id',verifyJWT, verifyAdmin, toggleUserActiveHandler);

// para el user
userRouter.get('/:id',verifyJWT, getUserByIdHandler); // profile
userRouter.put('/:id',verifyJWT, updateUserHandler);
userRouter.delete('/:id/delete',verifyJWT, deleteAccountHandler);
userRouter.post('/resend/:id',verifyJWT, resender); // resend email')


// estas rutas no pueden tener verify JWT porque no tienen token
userRouter.post('/auth', googleLoginUserHandler); 
userRouter.post('/verify/:token', userActivateByToken)
userRouter.post('/register', postUserHandler); // sign up
userRouter.post('/login', loginUserHandler); // login



module.exports = userRouter;