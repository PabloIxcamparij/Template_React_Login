import jwt from "jsonwebtoken";
import Types from 'mongoose'

type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {

  const secret = process.env.JWT_SECRET || "default_secret";

  const token = jwt.sign(payload, secret, {
    expiresIn: "80d",
  });

  return token;
};
