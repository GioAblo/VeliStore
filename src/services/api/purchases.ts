import axios from "axios";
import { API_PURCHASES_URL } from "./allUrl";


interface PostPurchasesInterface  {
    totalPrice: number,
    totalItems: number
}

interface GetAllPurchasesInterface {
    id: string,
    created_at: string ,
    updated_at: string,
    totalPrice: number,
    totalItems: number,
    user_id: string
}

export const purchase = async (
  data: PostPurchasesInterface,
  token: string
) => {

  
  try {
    const response = await axios.post(
      API_PURCHASES_URL,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response;
  } catch (error) {
    console.log(error);
    
  }
}


export const getAllPurchases = async (
  token: string
): Promise<GetAllPurchasesInterface[]> => {

  
  try {
    const response = await axios.get(
      API_PURCHASES_URL,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}