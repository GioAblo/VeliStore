import axios from "axios"
import { API_WISHLIST_URL } from "./allUrl"
import ProductInterface from "./product";


export default interface likedProductInterface {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    likedProduct: ProductInterface
}


export const addLikedProducts = async(
    productId: string,
    token: string, 
    ) => {
    try {
        const respponse = await axios.post(API_WISHLIST_URL, 
            {product_id: productId},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return respponse
    } catch (error) {
        console.log(error);
        
    }
}


export const deleteLikedProducts = async(
    productId: string,
    token: string, 
    ) => {
    try {
        const respponse = await axios.delete(`${API_WISHLIST_URL}/${productId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return respponse
    } catch (error) {
        console.log(error);
        
    }
}


export const getLikedProducts = async(
    token: string, 
    ): Promise<likedProductInterface[]> => {
    try {
        const response = await axios.get(API_WISHLIST_URL, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error);
        
    }
}