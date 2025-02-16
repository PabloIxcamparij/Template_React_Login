import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import { z } from "zod";

// Auth schema

const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
  token: z.string().length(6),
})

export type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm =  Pick<Auth, "name" | "email" | "password" | "passwordConfirm">
export type ConfirmToken = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick <Auth, "email">
export type ChangePasswordConfirmation = Pick <Auth,  "token" | "password" | "passwordConfirm">

export type HomeType = Pick <Auth, "name">