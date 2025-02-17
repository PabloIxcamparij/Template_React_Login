import api from "../lib/axios";
// import {isAxiosError} from "axios";
import {
  UserRegistrationForm,
  ConfirmToken,
  RequestConfirmationCodeForm,
  UserLoginForm,
} from "../types";

export async function loginAccount(formData: UserLoginForm) {
  try {
    const url = "/user/login";
    const { data } = await api.post<string>(url, formData);
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


// Change Password
export async function requestChangeToken(
  formData: RequestConfirmationCodeForm
) {
  try {
    const url = "/user/requestTokenChangePassword";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    // if (isAxiosError(error)) {
    //   return error.response?.data;
    // }
    throw error;
  }
}

export async function confirmChangePassword(formData: ConfirmToken) {
  try {
    const url = "/user/confirmChangePassword";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    // if (isAxiosError(error)) {
    //   return error.response?.data;
    // }
    throw error;
  }
}

