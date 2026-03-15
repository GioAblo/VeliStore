import useAddToCart from '@/components/cartcomponent/useAddToCart'
import useClearCart from '@/components/cartcomponent/useClearCart'
import useDeleteFromCart from '@/components/cartcomponent/useDeleteFromCart'
import { CartInterface, clearCartProducts, getCartData } from '@/services/api/cart'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, Routes } from 'react-router-dom'
import Checkout from './Checkout'
import Contactinfo from './Contactinfo'
import { setProductCount } from '@/store/countProduct'
import { useWindowScroll } from '@uidotdev/usehooks'
import PaymentCart from './PaymentCart'
import { number } from 'yup'

const Cart = () => {

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
    const [{ x, y }, scrollTo] = useWindowScroll();

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
    }, [cartData, countProduct, deleteFromCart, addToCart, clearCart]);
        

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


    
    

    

  return (
    <>
        <Routes> 
            <Route path='/' element={
                <div className='bg-[#f5f6f6] lg:bg-white lg:m-auto xl:px-[32px] xl:max-w-[1232px] xl:w-full lg:relative' >
                    <div className='md:pt-[104px] lg:px-16 xl:px-0'>

                        <div className='py-[16px] lg:mt-[36px] px-[16px] lg:px-0 md:pt-[24px] flex justify-between bg-white'>
                            <h3 className=' text-[16px] lg:text-[28px] font-bold'>There are {countProduct} Items in your cart</h3>
                            <button className=' flex items-center gap-1 text-[12px] lg:text-[16px] font-medium' onClick={() => clearCart()}>
                                <div><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.75H2.33333H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.33398 3.74992V2.41659C4.33398 2.06296 4.47446 1.72382 4.72451 1.47378C4.97456 1.22373 5.3137 1.08325 5.66732 1.08325H8.33398C8.68761 1.08325 9.02674 1.22373 9.27679 1.47378C9.52684 1.72382 9.66732 2.06296 9.66732 2.41659V3.74992M11.6673 3.74992V13.0833C11.6673 13.4369 11.5268 13.776 11.2768 14.0261C11.0267 14.2761 10.6876 14.4166 10.334 14.4166H3.66732C3.3137 14.4166 2.97456 14.2761 2.72451 14.0261C2.47446 13.776 2.33398 13.4369 2.33398 13.0833V3.74992H11.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                                <div>Clear cart</div>
                            </button>
                        </div>

                        <div className='mt-1'>
                            {cartData.length != 0  ? 

                                <div className='MainCartComp lg:flex lg:gap-10 lg:w-full'>

                                    

                                    <div className='flex flex-col  lg:w-full  lg:gap-5 '>
                                        {cartData.map((product) => (
                                        <div className=' flex bg-white lg:rounded-2xl lg:border lg:w-full py-[24px] px-[16px]' key={product.id}>

                                            <img className='h-[80px] w-[80px] lg:w-[100px] lg:h-[100px] mr-[12px] lg:mr-8' src={product.cartProduct.image} alt="image" />

                                            <div className=''>
                                            

                                                <div className=' '>
                                                    <div className='text-[11px] xl:text-[14px] text-black font-medium'>{product.cartProduct.title}</div>
                                                    
                                                    <div className='flex lg:items-center gap-2 my-2 lg:my-4'>
                                                        <div className='relative flex items-center justify-center rounded-lg lg:rounded-3xl w-[24px] h-[16px] lg:w-[36px] lg:h-[24px] bg-black'>
                                                            <span className=''><svg width="13" height="13" viewBox="0 0 17 15" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M14.4167 3.49967C14.1001 3.08301 13.6084 2.83301 13.0834 2.83301H11.0001V1.99967C11.0001 1.08301 10.2501 0.333008 9.33341 0.333008H1.83341C0.916748 0.333008 0.166748 1.08301 0.166748 1.99967V10.333C0.166748 11.2497 0.916748 11.9997 1.83341 11.9997C1.83341 13.3747 2.95841 14.4997 4.33341 14.4997C5.70841 14.4997 6.83341 13.3747 6.83341 11.9997H10.1667C10.1667 13.3747 11.2917 14.4997 12.6667 14.4997C14.0417 14.4997 15.1667 13.3747 15.1667 11.9997C16.0834 11.9997 16.8334 11.2497 16.8334 10.333V7.27467C16.8334 6.91634 16.7167 6.55801 16.5001 6.27467L14.4167 3.49967ZM13.0834 4.49967L14.3334 6.16634H11.0001V4.49967H13.0834ZM4.33341 12.833C3.87508 12.833 3.50008 12.458 3.50008 11.9997C3.50008 11.858 3.54175 11.708 3.60841 11.583C3.91675 11.058 4.74175 11.058 5.05008 11.583C5.12508 11.708 5.15841 11.8497 5.15841 11.9913C5.15841 12.4497 4.78341 12.8247 4.32508 12.8247L4.33341 12.833ZM6.19175 10.333C6.19175 10.333 6.15008 10.2913 6.12508 10.2747C6.07508 10.2247 6.02508 10.183 5.98341 10.1413C5.88341 10.0497 5.77508 9.96634 5.66675 9.89967C5.60842 9.85801 5.55008 9.82468 5.48341 9.79134C5.35841 9.72468 5.23341 9.67467 5.10841 9.63301C5.05008 9.61634 4.99175 9.59134 4.93341 9.57467C4.74175 9.52468 4.54175 9.49967 4.33341 9.49967C4.12508 9.49967 3.92508 9.53301 3.73341 9.57467C3.67508 9.59134 3.61675 9.61634 3.55841 9.63301C3.42508 9.67467 3.30008 9.72468 3.18341 9.79134C3.12508 9.82468 3.05841 9.85801 3.00008 9.89967C2.89175 9.97467 2.78341 10.0497 2.68341 10.1413C2.63341 10.183 2.58341 10.2247 2.53341 10.2747C2.51675 10.2997 2.49175 10.308 2.46675 10.333H1.82508V1.99967H9.32508V3.66634V10.333H6.18341H6.19175ZM12.6667 12.833C12.2084 12.833 11.8334 12.458 11.8334 11.9997C11.8334 11.858 11.8751 11.708 11.9417 11.583C12.2501 11.058 13.0751 11.058 13.3834 11.583C13.4584 11.708 13.4917 11.8497 13.4917 11.9913C13.4917 12.4497 13.1167 12.8247 12.6584 12.8247L12.6667 12.833ZM15.1667 10.333H14.5251C14.5251 10.333 14.4834 10.2913 14.4584 10.2747C14.4084 10.2247 14.3584 10.183 14.3167 10.1413C14.2167 10.0497 14.1084 9.96634 14.0001 9.89967C13.9417 9.85801 13.8834 9.82468 13.8167 9.79134C13.6917 9.72468 13.5667 9.67467 13.4417 9.63301C13.3834 9.61634 13.3251 9.59134 13.2667 9.57467C13.0751 9.52468 12.8751 9.49967 12.6667 9.49967C12.4584 9.49967 12.2751 9.53301 12.0834 9.57467C12.0334 9.58301 11.9834 9.59968 11.9334 9.61634C11.7834 9.66634 11.6334 9.72467 11.5001 9.79967C11.4667 9.81634 11.4334 9.83301 11.4001 9.84968C11.2584 9.93301 11.1251 10.0247 11.0001 10.1413V7.84134H15.1667V10.3413V10.333Z" fill="white"></path></svg></span>
                                                            <span className='h-[6px] w-[6px] lg:w-[10px] lg:h-[10px]  bg-[#82b224] absolute top-0 right-[-2px] border rounded-full'></span>
                                                        </div>
                                                        <div className='text-[10px] lg:text-[12px] font-bold'>Delivery in tbilisi on the next working day</div>
                                                    </div>
                                                    
                                                    <div className='mt-[8px]'>
                                                        {Number(product.cartProduct.salePrice) === 0 ? 
                                                        <div className='text-[12px] lg:text-[16px] font-bold'>{product.cartProduct.price}$</div>
                                                        :
                                                        <div className='flex gap-2'>
                                                            <div className='text-[12px] lg:text-[16px] font-bold'>{product.cartProduct.salePrice}$</div>
                                                            <div className='text-[#454952] lg:text-[14px] text-[11px] line-through'>{product.cartProduct.price}$</div>
                                                        </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className='mt-[16px] flex border items-center rounded-3xl w-[96px] h-[36px] justify-evenly'>
                                                    <button className='text-[16px] text-[#6b707b]' onClick={() => deleteFromCart(product.id)}>-</button>
                                                    <div className='text-[12px] font-bold'>{product.count}</div>
                                                    <button className=' text-[16px] text-[#6b707b]' onClick={() => addToCart(product.cartProduct.id)}>+</button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    </div>

                                    <div className='mt-[6px] lg:mt-0   lg:min-w-[368px]  lg:p-0  lg:rounded-2xl   bg-white  pb-[100px]'>
                                        
                                        <aside className={`${y > 155 ? "lg:sticky" : "" } lg:p-[24px] bg-white lg:border lg:rounded-2xl lg:min-w-[368px] lg:m-auto lg:h-auto p-[20px]  lg:top-[70px]`}>
                                            <PaymentCart countProduct={countProduct} mainTotPrice={mainTotPrice} discuntPrice={discuntPrice} totalPrice={totalPrice} />
                                        </aside>

                                    </div>

                                    
                                </div>
                            :
                            <div>
                                Your cart is empty!
                            </div>
                            }
                        </div>
                    </div>
                </div>
                } 
            />
            <Route path='contactinfo/*' element={<Contactinfo cartData={cartData} dataPrice={dataPrice} />}  />
        </Routes>
    </>
  )
}

export default Cart