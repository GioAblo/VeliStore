import axios from "axios"
import { API_GET_CART_URL } from "./allUrl"
import ProductInterface from "./product"
import { log } from "console"




export  interface CartInterface {
    id: string,
    created_at: string,
    updated_at: string,
    product_id: string,
    user_id: string,
    count: number,
    cartProduct: Partial<ProductInterface>
}


export const getCartData = async(token: string): Promise<CartInterface[]> => {
    
    try {
    const res = await axios.get<CartInterface[]>(API_GET_CART_URL, {
        headers: {
        Authorization: `Bearer ${token}`,  
      }
    })   

    return res.data
    
    
    
  } catch(err) {
    throw new Error("failed")
  }
}




export const postCart = async(productId: string, token: string) => {

    try {
      const response = await axios.post(API_GET_CART_URL, 
        {product_id: productId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data
    } catch (error) {
      console.log(error);
      
    }
}

export const deleteCartProduct = async(productId: string, token: string) => {

    try {
      const response = await axios.delete(`${API_GET_CART_URL}/${productId}`, 
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data
    } catch (error) {
      console.log(error);
      
    }
}

export const clearCartProducts = async( token: string) => {
  

    try {
      const response = await axios.post("http://localhost:3000/cart/clear", 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data
    } catch (error) {
      console.log(error);
      
    }
}

