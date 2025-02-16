import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controllers/userController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

// Create User
router.post(
  "/registerAccount",

  body("name")
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("Se rquiere un Nombre"),

  body("password")
    .isLength({ min: 8 })
    .notEmpty()
    .withMessage("Se rquiere un password"),

  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),

  body("email").isEmail().notEmpty().withMessage("Se rquiere un email"),

  handleInputErrors,

  userController.createAccount
);

// Confirm User
router.post(
  "/confirmAccount",
  body("token").notEmpty().withMessage("Se requiere un token"),
  handleInputErrors,
  userController.confirmAccount
);

// Login User
router.post( 

  "/login",

  body("password")
    .isLength({ min: 8 })
    .notEmpty()
    .withMessage("Se rquiere un password"),

  body("email").isEmail().notEmpty().withMessage("Se requiere un email"),
  handleInputErrors,
  userController.login
);

// New Token
router.post(
  "/requestToken",
  body("email").isEmail().notEmpty().withMessage("Se requiere un email"),
  handleInputErrors,
  userController.newToken
);

// Change Passwrod

// Token for change
router.post(
  "/requestTokenChangePassword",
  body("email").isEmail().notEmpty().withMessage("Se requiere un email"),
  handleInputErrors,
  userController.newTokenForChangePassword
);

router.post(
  "/confirmChangePassword",
  body("token").notEmpty().withMessage("Se requiere un token"),

  body("password")
    .isLength({ min: 8 })
    .notEmpty()
    .withMessage("Se rquiere un password"),

  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
  handleInputErrors,
  userController.confirmChangePassword
);

export default router;
