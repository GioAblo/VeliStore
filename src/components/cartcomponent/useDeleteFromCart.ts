import { deleteCartProduct} from '@/services/api/cart'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const useDeleteFromCart = () => {

    const token = useSelector((state: RootState) => state.auth.token)


    const deleteFromCart = async(productId: string) => {
            try {
                const res = await deleteCartProduct(productId, token )
               
    
                console.log(res);
                
            } catch (error) {
                console.log(error);
                
            }
    
    }

  return deleteFromCart
}

export default useDeleteFromCart