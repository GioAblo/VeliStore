import axios from "axios";
import {
  API_GET_CURRENT_USER_URL,
  API_UPDATE_CURRENT_USER_URL,
} from "./allUrl";
import { UserInterface } from "@/interfaces/interface";


export interface userUpdateDataInterface {
  first_name?: string;
  last_name?: string;
  password?: string;
  phone_number?: string;
}

export const getCurrentUser = async (token: string): Promise<UserInterface> => {
  try {
    const response = await axios.get(API_GET_CURRENT_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      
      
      return response.data;
    }
  } catch (err) {
    throw new Error("Failed to get current user");
  }
};



export const updateCurrentUser = async (
  token: string,
  updateData: userUpdateDataInterface
  ) => {
  try {
    const response = await axios.put(API_UPDATE_CURRENT_USER_URL, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } )

    console.log(response.data);
    return response.data
    
    
  } catch (error) {
    console.log("ERROR", error);
  }
}