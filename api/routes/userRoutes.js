import express from "express";
import { deleteUser, getAllUsers, getCurrentUser, login, logout, register, updateUser } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleWare/authHandler.js";
const router=express.Router();

router.route('/').post(register).get(authenticate,authorizeAdmin,getAllUsers);
router.route("/profile").get(authenticate,getCurrentUser).delete(authenticate,deleteUser).put(authenticate,updateUser);
router.post("/login",login);
router.post("/logout",logout);




export default router;