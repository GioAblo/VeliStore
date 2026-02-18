import { postCart } from '@/services/api/cart'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

const useAddToCart = () => {

    const token = useSelector((state: RootState) => state.auth.token)
 
    

    const addToCart = async(productId: string) => {
        try {
                const res = await postCart(productId, token )
    
                console.log("respnse", res);
                
        } catch (error) {
                console.log("ERROR", error);
                
        }
    
    }

  return addToCart
}

export default useAddToCart