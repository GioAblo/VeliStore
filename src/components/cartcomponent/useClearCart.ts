import { clearCartProducts } from '@/services/api/cart'
import { RootState } from '@/store'
import { setProductCount } from '@/store/countProduct'

import { useDispatch, useSelector } from 'react-redux'

const useClearCart = () => {

    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch()

    const clearCart = async() => {
    
            try {
                const res = await clearCartProducts(token)
                
                dispatch(setProductCount({count: 0}))
                
                
            } catch (error) {
                console.log(error);
                
            }
    
    }

  return clearCart
}

export default useClearCart