import useAddToCart from '@/components/cartcomponent/useAddToCart'
import useClearCart from '@/components/cartcomponent/useClearCart'
import useDeleteFromCart from '@/components/cartcomponent/useDeleteFromCart'
import { CartInterface, clearCartProducts, getCartData } from '@/services/api/cart'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { setProductCount } from '@/store/countProduct'

const NavBarCart = ({setCartPopUp}) => {

    const [cartData, setCartData] = useState<CartInterface[]>([])
    const token = useSelector((state: RootState) => state.auth.token)
    const addToCart = useAddToCart()
    const deleteFromCart = useDeleteFromCart()
    const clearCart = useClearCart()
    const [countProduct, setCountProduct] = useState(Number)
    const [dataPrice, setDataPrice] = useState({
        countProduct: 0,
        discuntPrice: 0,
        mainTotPrice: 0,
        totalPrice: 0
    })

    const [mainTotPrice, setMainTotPrice] = useState(Number)
    const [discuntPrice, setDiscuntPrice] = useState(Number)
    const [totalPrice, setTotalPrice] = useState(Number)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setProductCount({count: countProduct}))
    },[addToCart, deleteFromCart, clearCart, countProduct, dispatch])
    
    
    
    useEffect(() => {
        const count = cartData.reduce((total, product) => total + product.count, 0);
        setCountProduct(count);
    }, [cartData]);
        

    useEffect(() => {
        const totalProductPrice = cartData.reduce((total, product) => total + Number(product.cartProduct.price) * product.count, 0)
        const productSalePrice = cartData.reduce((total, product) => total + Number(product.cartProduct.salePrice) * product.count, 0)
        setMainTotPrice(totalProductPrice)
       

        const  saleItemPrice = cartData
            .filter(product => Number(product.cartProduct.salePrice) != 0)
            .reduce((tot, prod) => tot + Number(prod.cartProduct.price) * prod.count, 0)
        
            

        const discunt = saleItemPrice - productSalePrice
        setDiscuntPrice(discunt)
        

        const totalPrice = totalProductPrice - discunt
        setTotalPrice(totalPrice)
        
        setDataPrice({mainTotPrice, discuntPrice, totalPrice, countProduct})
    
        
    },[cartData, countProduct, discuntPrice,mainTotPrice])
    

    

    useEffect(() => {
        
        const fetchCartData = async() => {
           

            if (!token) {
                console.error("No token found");
                return;
            }   

            try {
                const res = await getCartData(token)

                setCartData(res)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCartData()
    },[token])

    
    

    console.log(dataPrice);
    

  return (
    <div className='absolute top-[85px]  md:right-0 lg:right-[25px] xl:right-[-2px]' >
                <div className='bg-white relative  h-auto m-auto w-[460px] rounded-xl'>
                        <span className='absolute w-[22px] right-[33%] rounded-[1px] top-[-2px]  h-[22px] bg-white rotate-45'></span>
                    
                        <div className='text-[14px] flex justify-between py-4 px-5 items-center '>
                            <div className='text-[14px] font-bold'>My Cart</div>
                            <button onClick={() => setCartPopUp(false)} className='w-[24px] h-[24px] justify-center items-center flex bg-[#dcdde099] rounded-full'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                        </div>        

                        <div>
                            {cartData.length != 0  ? 

                            <>

                                <div className='h-[232px] overflow-auto cartcompcont'>


                                    <div className='flex flex-col border-t'>
                                        {cartData.map((product) => (
                                        <div className=' flex border-b  px-[16px] py-[20px] gap-5  ' key={product.id}>

                                            <img className='h-[76px] w-[76px] ' src={product.cartProduct.image} alt="image" />

                                            <div className='w-full'>
                                            
                                                <div className='text-left text-[14px] font-semibold'>{product.cartProduct.title}</div>

                                                <div className='mt-[15px] w-full flex justify-between items-center'>
                                                    <div className='mt-[8px]'>
                                                        {Number(product.cartProduct.salePrice) === 0 ? 
                                                        <div className='text-[16px] font-bold'>{product.cartProduct.price}$</div>
                                                    :
                                                    <div className='flex gap-2'>
                                                        <div className='text-[16px] font-bold'>{product.cartProduct.salePrice}$</div>
                                                        <div className='text-[#454952] text-[14px] line-through'>{product.cartProduct.price}$</div>
                                                    </div>
                                                    }
                                                    </div>

                                                    <div className=' flex border items-center rounded-3xl w-[96px] h-[36px] justify-evenly'>
                                                        <button className='text-[16px] text-[#6b707b]' onClick={() => deleteFromCart(product.id)}>-</button>
                                                        <div className='text-[12px] font-bold'>{product.count}</div>
                                                        <button className=' text-[16px] text-[#6b707b]' onClick={() => addToCart(product.cartProduct.id)}>+</button>
                                                    </div>
                                                </div>

                                                
                                            </div>

                                        </div>
                                    ))}
                                    </div>

                                    
                                </div>
                                <div className='flex items-center justify-between py-4 px-5'>
                                    <div className='font-bold text-[14px]'>Total: {totalPrice}$</div>
                                    <div className='flex gap-2'>
                                        <Link to="/cart" className='text-[12px] flex justify-center items-center font-bold px-3 transition-all hover:bg-slate-800  h-[40px] text-white rounded-lg bg-black'>View bag ({countProduct})</Link>
                                        <Link to="/cart/contactinfo" className='text-[12px] flex justify-center items-center font-bold px-3  transition-all rounded-lg h-[40px] text-black hover:bg-[#afd480] bg-[#B4D984]'>Proceed to checkout</Link>
                                    </div>
                                </div>
                            </>    
                            :
                            <div className='text-left text-[14px] pt-3 pb-6 border-t  px-5 font-semibold'>
                                Your cart is empty!
                            </div>
                            }
                        </div>
                    
                </div>
    </div>
  )
}

export default NavBarCart