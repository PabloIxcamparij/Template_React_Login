import type { Request, Response } from "express";
import Some from "../models/Some";

export class homeController {

    static createSome = async (req: Request, res: Response): Promise<void> => {
        try {
    
    
          const some = new Some(req.body);
          await some.save()
    
          res.status(201).send("Some Creado");
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      };
    
}