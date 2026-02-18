import { clearCartProducts } from '@/services/api/cart'
import { RootState } from '@/store'

import { useSelector } from 'react-redux'

const useClearCart = () => {

    const token = useSelector((state: RootState) => state.auth.token)

        const clearCart = async() => {
    
            try {
                const res = await clearCartProducts(token)
    
                console.log(res);
                
            } catch (error) {
                console.log(error);
                
            }
    
        }

  return clearCart
}

export default useClearCart