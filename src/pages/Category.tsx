import AddWishList from '@/components/AddWishList'
import useAddToCart from '@/components/cartcomponent/useAddToCart'
import ProductInterface, { getAllProducts } from '@/services/api/product'
import { RootState } from '@/store'
import { setProductCount } from '@/store/countProduct'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Category = () => {

    const {categoryName} = useParams()
    const [products, setProducts] = useState<ProductInterface[]>([])
    const countOfProduct = useSelector((state: RootState) => state.product.count)
    const [countProduct, setCountProduct] = useState(countOfProduct)
    const addToCart = useAddToCart()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await getAllProducts()
            setProducts(res.filter(product => product.category_name === categoryName)) 
        } catch (error) {
            console.error("Failed to fetch products:", error)
        }
        }

        fetchProducts()
    }, [categoryName])   

    useEffect(() => {
        dispatch(setProductCount({count: countProduct}))
    },[addToCart, dispatch, countProduct])   

    const addToCartManually = (id: string) => {

        setCountProduct((prev) => prev + 1)

        addToCart(id)
    }



  return (
    <div className='pb-20 md:mt-[120px] md:px-[16px] lg:px-[64px] xl:max-w-[1232px] xl:mx-auto xl:px-[32px]'>
        <div className='flex md:hidden  items-center gap-9 py-4 px-4 border-b'>
            <button onClick={() => navigate("/")}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.471251 7C0.479142 7.27621 0.581736 7.51296 0.794813 7.72604L6.93461 13.7317C7.11612 13.9053 7.3292 14 7.58963 14C8.11838 14 8.52875 13.5896 8.52875 13.0609C8.52875 12.8083 8.42615 12.5716 8.24464 12.3901L2.72041 7L8.24464 1.60992C8.42615 1.42841 8.52875 1.19955 8.52875 0.93912C8.52875 0.410372 8.11838 0 7.58963 0C7.33709 0 7.11612 0.0947008 6.93461 0.26832L0.794813 6.28185C0.573844 6.48703 0.471251 6.72379 0.471251 7Z" fill="currentColor"></path></svg></button>
            <div className='text-[12px] font-bold'>{categoryName}</div>
        </div>
        <div className='hidden md:block text-[12px] md:text-[20px] font-bold'>{categoryName}</div>
        <div className='mt-5'>
                <div className="grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {products.map((product) => (
                        <div className=" p-3 border border-[#f5f5f5]   flex flex-col  justify-between h-auto   w-auto " key={product.id}>
                            <div className="pt-1">
                                <div className="flex justify-center">
                                    <img className=" h-[128px]" src={product.image} alt="image" />
                                </div>

                                <div className="flex w-full gap-2">

                                    <div className='mt-1'>
                                        {Number(product.salePrice) === 0 ? 
                                            <div className="text-[14px] font-bold">{product.price}$</div>
                                                    :
                                            <div className='flex items-center gap-2'>
                                                <div className="text-[14px] font-bold">{product.salePrice}$</div>
                                                <div className='text-slate-600 line-through text-[12px]'>{product.price}$</div>
                                            </div>
                                        }
                                    </div>
                                    
                                </div>

                                <div className="text-[11px] font-semibold ">{product.title}</div>
                            </div>

                            <div className="flex gap-1 mt-2 ">
                                <AddWishList productId={product.id} />
                                <button className="bg-[#B4D984] flex items-center justify-center gap-2 rounded-lg w-full" onClick={() => addToCartManually(product.id)} >
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95153 11.6052C4.50443 11.6052 4.95741 12.0679 4.95741 12.6394C4.95741 13.204 4.50443 13.6667 3.95153 13.6667C3.39196 13.6667 2.93898 13.204 2.93898 12.6394C2.93898 12.0679 3.39196 11.6052 3.95153 11.6052ZM11.4457 11.6052C11.9986 11.6052 12.4516 12.0679 12.4516 12.6394C12.4516 13.204 11.9986 13.6667 11.4457 13.6667C10.8861 13.6667 10.4331 13.204 10.4331 12.6394C10.4331 12.0679 10.8861 11.6052 11.4457 11.6052ZM0.852802 0.333423L0.920689 0.339169L2.50945 0.583411C2.73594 0.624912 2.90248 0.814726 2.92246 1.04604L3.04903 2.57C3.06901 2.78839 3.24221 2.95167 3.45538 2.95167H12.4517C12.8581 2.95167 13.1245 3.09454 13.391 3.4075C13.6574 3.72046 13.7041 4.16948 13.6441 4.577L13.0113 9.04003C12.8914 9.89794 12.1719 10.53 11.3259 10.53H4.05824C3.17227 10.53 2.4395 9.83671 2.36623 8.93866L1.75337 1.52228L0.74749 1.34539C0.481031 1.29777 0.29451 1.03243 0.34114 0.760299C0.387771 0.48204 0.647568 0.297668 0.920689 0.339169L0.852802 0.333423ZM10.2601 5.46825H8.41485C8.13507 5.46825 7.91524 5.69276 7.91524 5.9785C7.91524 6.25744 8.13507 6.48876 8.41485 6.48876H10.2601C10.5399 6.48876 10.7597 6.25744 10.7597 5.9785C10.7597 5.69276 10.5399 5.46825 10.2601 5.46825Z" fill="currentColor"></path></svg>
                                    <div className="font-bold text-[10px]">Add</div> 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    </div>
  )
}

export default Category