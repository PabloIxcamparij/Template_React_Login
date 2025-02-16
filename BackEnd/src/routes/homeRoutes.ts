import { Router } from "express";
import { body } from "express-validator";
import { homeController } from "../controllers/homeController";
import { handleInputErrors } from "../middleware/validation";
import {authenticate} from "../middleware/auth"

const router = Router ()

// Register Something
router.post(
  "/register",
  
  authenticate,

  body("name")
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("Se rquiere un Nombre"),

  handleInputErrors,

  homeController.createSome
);

export default router;
