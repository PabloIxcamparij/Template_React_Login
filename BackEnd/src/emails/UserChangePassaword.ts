import { transporter } from "../config/nodemailer";
interface IEmail {
  email: string;
  token: string;
}

export class UserChangePassaword {
  static sendVerificationEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: '"Cambio de contraseña" <no-reply@cuenta.com>', // Ajusta el remitente con un formato formal
      to: user.email,
      subject: "Cambiar la contraseña - Registro de Cuenta",
      text: `Hola, 
    
Usted ha solicitado un cambio de contraseña en nuestra plataforma. 
Por favor usando este ${user.token} para verificar su cuenta al ingresarlo en el siguiente enlace: ${process.env.FRONTEND_URL}/user/changePassword

Si no solicitaste este correo, por favor ignóralo.
    
Saludos cordiales,
El equipo de Registro de Cuenta`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h1 style="color: #007bff;">Verificación de Cuenta</h1>
          <p>Hola,</p>
          <p>Usted ha solicitado un cambio de contraseña en nuestra plataforma.</p>
          <p>Para completar el proceso visite el siguiente enlace</p>
          
          <br/>

          <p style="text-align: center;">
            <a 
              href="${process.env.FRONTEND_URL}/user/changePassword" 
              style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"
            >
              Cambiar Contraseña
            </a>
          </p>

          <br/>

          <p">E ingrese este toquen: <span style="color: #007bff; font-weight: bold;">${user.token}</span> </p>

          <br/>

          <p>Este toquen solo durara 10 minutos</p>
          <p>Si no solicitaste este correo, puedes ignorarlo.</p>
          <p>Saludos cordiales,<br>El equipo de Registro de Cuenta</p>
        </div>
      `,
    });
  };
}
