import axios from "axios";
import { API_SIGNIN_URL, API_SIGNUP_URL } from "./allUrl";

export interface signinFormInterface {
  email: string;
  password: string;
}

interface signinResponseInterface {
  access_token: string;
  refresh_token: string;
}

export const signin = async (
  formData: signinFormInterface
): Promise<signinResponseInterface> => {
  try {
    const response = await axios.post(API_SIGNIN_URL, formData);

    if (response.status === 201) {
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    }
  } catch (err) {
    throw new Error("Failed to sign in");
  }
};

export interface signupFormInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export const signup = async (
  formData: signupFormInterface
): Promise<boolean> => {
  try {
    const response = await axios.post(API_SIGNUP_URL, formData);

    if (response.status === 201) {
      return true;
    }
  } catch (err) {
    throw new Error("Failed to register user");
  }
};
