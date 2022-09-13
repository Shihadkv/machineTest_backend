import express from "express";
const router = express.Router();
import  {doLogin,register} from '../Controllers/UserControllers.js'

router.post("/login",doLogin);
router.post("/register",register)

export default router;