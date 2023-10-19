import { Router } from "express";
import { getAllUser, register } from '../controllers/userController.js';

export default (router: Router) => {
    router.post('/auth/register', register);
    router.get('/users', getAllUser);
}