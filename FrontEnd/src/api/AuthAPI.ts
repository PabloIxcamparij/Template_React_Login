import api from "../lib/axios";
// import {isAxiosError} from "axios";
import {
  UserRegistrationForm,
  UserLoginForm,
} from "../types";

export async function loginAccount(formData: UserLoginForm) {
  try {
    console.log(formData)

    const url = "/user/login";
    const { data } = await api.post<string>(url, formData);
    console.log(data)
    localStorage.setItem('AUTH_TOKEN_LOGIN', data)
    return data;
  } catch (error : any) {
    // if (axios.isAxiosError(error)) {
    //   const errorMessage = error.response?.data || "Error desconocido";
    //   throw new Error(errorMessage);
    // }
    throw error;
  }
}

export async function createAccount(formData: UserRegistrationForm) {
  try {
    console.log(formData)

    const url = "/user/registerAccount";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error : any) {
    // if (isAxiosError(error)) {
    //   return error.response?.data;
    // }
    throw error;
  }
}
