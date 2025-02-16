import type { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { UserEmail } from "../emails/UserEmail";
import { UserChangePassaword } from "../emails/UserChangePassaword";
import { generateJWT } from "../utils/jwt";


export class userController {

  static createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, email } = req.body;

      const UserExists = await User.findOne({ email });

      if (UserExists) {
        res.status(400).send("El usuario ya existe");
        return; // Fin del flujo
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      await Promise.all([user.save(), token.save()]);

      await UserEmail.sendVerificationEmail({
        email: user.email,
        token: token.token,
      });

      res.status(201).send("Revise su correo para verificar su cuenta");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  static confirmAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

      const tokenExists: any = await Token.findOne({ token });

      if (!tokenExists) {
        res.status(404).send("Token no válido");
        return; // Fin del flujo
      }

      const user: any = await User.findById(tokenExists.user);
      user.confirmed = true;

      await Promise.all([user.save(), tokenExists.deleteOne()]);

      res.status(200).send("Cuenta verificada");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user: any = await User.findOne({ email });

      if (!user) {
        res.status(404).send("Usuario no encontrado");
        return; // Fin del flujo
      }

      if (!user.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = user.id;
        await token.save();

        await UserEmail.sendVerificationEmail({
          email: user.email,
          token: token.token,
        });

        res.status(404).send("Cuenta no verificada, hemos enviado un nuevo token a su correo");
        return; // Fin del flujo
      }

      const valid = await checkPassword(password, user.password);

      if (!valid) {
        res.status(401).send("Contraseña incorrecta");
        return; // Fin del flujo
      }
      
      // res.status(200).send("Usuario logeado");

      const token = generateJWT({id: user._id})

      res.send(token)

    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  static newToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      const user: any = await User.findOne({ email });

      if (!user) {
        res.status(404).send("Usuario no encontrado");
        return; // Fin del flujo
      }

      if (user.confirmed) {
        res.status(403).send("El usuario ya está confirmado");
        return; // Fin del flujo
      }

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();

      await UserEmail.sendVerificationEmail({
        email: user.email,
        token: token.token,
      });

      res.status(201).send("Revise su correo para verificar su cuenta");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  static newTokenForChangePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      const user: any = await User.findOne({ email });

      if (!user) {
        res.status(404).send("Usuario no encontrado");
        return; // Fin del flujo
      }

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();
      
      await UserChangePassaword.sendVerificationEmail({
        email: user.email,
        token: token.token,
      });

      res.status(201).send("Revise su correo para verificar su cuenta");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

  static confirmChangePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, password } = req.body;

      const tokenExists: any = await Token.findOne({ token });

      if (!tokenExists) {
        res.status(404).send("Token no válido");
        return; // Fin del flujo
      }

      const user: any = await User.findById(tokenExists.user);

      if (!user) {
        res.status(404).send("Usuario no encontrado");
        return;
      }

      user.password = await hashPassword(password)


      await Promise.all([user.save(), tokenExists.deleteOne()]);

      res.status(200).send("Contraseña actualizada correctamente");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

}
