const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler } = require('../handlers/user/userHandler');

const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUserByIdHandler);
userRouter.post('/', postUserHandler);
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', toggleUserActiveHandler);

module.exports = userRouter;