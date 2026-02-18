import { getAllProducts } from "@/services/api/product"
import { useEffect, useState } from "react"
import ProductInterface from "../services/api/product"
import { getAllCategories } from "@/services/api/category"
import { postCart } from "@/services/api/cart"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import useAddToCart from "@/components/cartcomponent/useAddToCart"
import AddWishList from "@/components/AddWishList"
import { setProductCount } from "@/store/countProduct"
import { Link, useLocation } from "react-router-dom"



const Home = () => {
    const countOfProduct = useSelector((state: RootState) => state.product.count)
    const [products, setProducts] = useState<ProductInterface[]>([])
    const [categories, setCategories] = useState([])
    const [countProduct, setCountProduct] = useState(countOfProduct)
    const [sale, setSale] = useState<ProductInterface[]>([])
    const [clothing, setClothing] = useState<ProductInterface[]>([])
    const [electroinics, setElectronics] = useState<ProductInterface[]>([])
    const [books, setBooks] = useState<ProductInterface[]>([])


    
    const addToCart = useAddToCart()

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories()
                setCategories(response)
                
            } catch (err) {
                console.log('Error: ', err);
            }
        }

        fetchCategories()
    }, [])    


    useEffect(() => {
        dispatch(setProductCount({count: countProduct}))
    },[addToCart, dispatch, countProduct])

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const res = await getAllProducts()
          
            setProducts(res) 
            setSale(res.filter(product => Number(product.salePrice) != 0))
            setClothing(res.filter(product => product.category_name === "Clothing & Accessories"))
            setElectronics(res.filter(product => product.category_name === "Electronics"))
            setBooks(res.filter(product => product.category_name === "Books"))
        } catch (error) {
            console.error("Failed to fetch products:", error)
        }
        }

        fetchProducts()
    }, [])
    

    const addToCartManually = (id: string) => {

        setCountProduct((prev) => prev + 1)

        addToCart(id)
    }

    


    
  

    return (
        <div className="home mx-4 lg:px-16 xl:px-[32px] xl:max-w-[1232px] lg:mx-auto xl:w-full lg:mt-[140px] mt-[120px]">

            <div className="flex w-full relative overflow-hidden ">

                <div className="flex   mr-0 overflow-x-scroll scrollbarhide scroll-smooth">
                    <div className="flex ">

                        <Link to="/products" className="bg-black absolute z-10 md:cursor-pointer  mr-2 rounded-md w-[96px] h-[132px] lg:w-[148px] lg:h-[172px] text-white flex justify-center items-center">
                            <h4 className="text-[12px] lg:text-[14px] lg:font-semibold md:hidden   ">Categories</h4>
                            <h4 className="text-[12px] lg:text-[14px] lg:font-semibold hidden md:block text-center  ">All Categories & Products</h4>
                        </Link>
                        
                        {categories.map((category) => (
                            
                                <Link to={`/category/${category.name}`} className="lg:w-[148px] lg:h-[172px] w-[96px] overflow-hidden relative h-[132px] mr-2 rounded-md bg-[#eaeaea]" key={category.id}>
                                    <div className="text-[11px] lg:text-[14px] lg:font-semibold lg:mt-6 mt-4 px-2 text-center font-medium">{category.name}</div>
                                    <img className="absolute bottom-0 right-0 lg:w-[96px] lg:h-[96px] w-[72px] h-[72px]" src={category.image} alt="image" />
                                </Link>
                            
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl   overflow-hidden my-7 lg:my-9 xl:my-11">
                <img className="md:hidden " src="https://media.veli.store/media/bodybuilder/banners/3asasassachukari.webp" alt="banner" />
                <img className="hidden  md:block" src="https://media.veli.store/media/bodybuilder/banners/3sachukrebi.webp" alt="banner" />
            </div>

           

            

            <div className="mt-6 ">
                <div>
                    <h3 className="font-bold mb-4 text-black text-[14px] xl:text-[32px]">Sale products</h3>
                </div>

                <div className="flex   mr-0 overflow-x-scroll scrollbarhide scroll-smooth">

                    <div className="flex gap-3 xl:gap-8">

                        {sale.map((product) => (
                            <div className="min-w-[180px]  w-full  flex flex-col  overflow-hidden  justify-between" key={product.id}>
                                <div className="pt-1">
                                    <div className="flex justify-center">
                                        <img className=" h-[128px] xl:h-[172px] xl:w-[172px] " src={product.image} alt="image" />
                                    </div>

                                    <div className="flex w-full gap-2">

                                        <div className="mt-1">
                                            {Number(product.salePrice) === 0 ? 
                                                <div className="text-[14px] xl:text-[16px]  font-bold">{product.price}$</div>
                                                        :
                                                <div className='flex items-center gap-2'>
                                                    <div className="text-[14px] xl:text-[16px] font-bold">{product.salePrice}$</div>
                                                    <div className='text-slate-600 line-through xl:text-[14px] text-[12px]'>{product.price}$</div>
                                                </div>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="text-[11px] xl:text-[14px] font-semibold mt-1 ">{product.title}</div>
                                </div>

                                <div className="flex gap-1 xl:gap-2 ">
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

            <div className="rounded-2xl overflow-hidden my-7 xl:my-11">
                <img className="md:hidden" src="https://media.veli.store/media/bodybuilder/banners/%E1%83%A1%E1%83%90%E1%83%9C%E1%83%93%E1%83%99%E1%83%9C%E1%83%93%E1%83%A1.webp" alt="banner" />
                <img className="hidden md:block" src="https://media.veli.store/media/bodybuilder/banners/%E1%83%9B%E1%83%91%E1%83%A1%E1%83%AE%E1%83%9B%E1%83%B0%E1%83%91%E1%83%AA%E1%83%AE.webp" alt="banner" />
            </div>
            

            <div className="mt-6 ">
                <div className="flex justify-between mb-4 items-center">
                    <h3 className="font-bold  text-black text-[14px] xl:text-[32px]">Clothing & Accessories</h3>
                    <Link className="flex items-center gap-2" to='/products?categoryName=Clothing+%26+Accessories'>
                        <div className="text-[12px] xl:text-[14px] font-bold">See more</div>
                        <div><svg width="11" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.333008 6.43848C0.333008 6.12207 0.568136 5.86058 0.873199 5.81919L0.958008 5.81348L11.9447 5.81398L7.97552 1.86104C7.73092 1.61749 7.73006 1.22176 7.97362 0.977161C8.19503 0.754795 8.5422 0.733875 8.78727 0.914893L8.8575 0.975258L13.8992 5.99526C13.9314 6.02736 13.9594 6.06211 13.9832 6.0988C13.9899 6.10984 13.9967 6.12114 14.0032 6.13267C14.0092 6.14255 14.0145 6.15281 14.0196 6.16318C14.0267 6.17827 14.0336 6.19386 14.0398 6.20977C14.0449 6.22204 14.0492 6.23397 14.053 6.24599C14.0576 6.2609 14.0621 6.27679 14.066 6.29293C14.0688 6.30419 14.0711 6.31503 14.0731 6.32591C14.0759 6.34211 14.0782 6.35886 14.0799 6.37582C14.0814 6.38875 14.0822 6.40156 14.0827 6.41439C14.0828 6.42216 14.083 6.43031 14.083 6.43848L14.0827 6.4627C14.0822 6.47496 14.0814 6.48722 14.0802 6.49944L14.083 6.43848C14.083 6.47792 14.0794 6.51651 14.0724 6.55393C14.0707 6.56286 14.0688 6.57204 14.0667 6.58117C14.0622 6.59999 14.0571 6.6181 14.0512 6.63587C14.0483 6.64469 14.0449 6.65412 14.0413 6.66348C14.034 6.68228 14.0261 6.70021 14.0173 6.71767C14.0133 6.72589 14.0087 6.73448 14.004 6.74299C13.9962 6.75687 13.9881 6.77006 13.9796 6.78292C13.9736 6.79202 13.967 6.8015 13.96 6.81082L13.9546 6.81802C13.9378 6.84002 13.9195 6.86087 13.9 6.88043L13.8992 6.88101L8.85753 11.9018C8.61295 12.1454 8.21722 12.1446 7.97365 11.9C7.75222 11.6777 7.73277 11.3304 7.91482 11.0861L7.97548 11.0161L11.943 7.06398L0.958008 7.06348C0.61283 7.06348 0.333008 6.78366 0.333008 6.43848Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></div>
                    </Link>    
                </div>

                <div className="flex   mr-0 overflow-x-scroll scrollbarhide scroll-smooth">

                    <div className="flex gap-3 xl:gap-8">

                        {clothing.map((product) => (
                            <div className="min-w-[180px] w-full  flex flex-col  overflow-hidden  justify-between" key={product.id}>
                                <div className="pt-1">
                                    <div className="flex justify-center">
                                        <img className=" h-[128px] xl:h-[172px] xl:w-[172px]" src={product.image} alt="image" />
                                    </div>

                                    <div className="flex w-full gap-2">

                                        <div className=" mt-1">
                                            {Number(product.salePrice) === 0 ? 
                                                <div className="text-[14px] xl:text-[16px] font-bold">{product.price}$</div>
                                                        :
                                                <div className='flex items-center gap-2'>
                                                    <div className="text-[14px] xl:text-[16px] font-bold">{product.salePrice}$</div>
                                                    <div className='text-slate-600 line-through xl:text-[14px] text-[12px]'>{product.price}$</div>
                                                </div>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="text-[11px] font-semibold mt-1 xl:text-[14px]">{product.title}</div>
                                </div>

                                <div className="flex gap-1 xl:gap-2 ">
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

            <div className="rounded-2xl overflow-hidden my-7 xl:my-11">
                <img className="md:hidden" src="https://media.veli.store/media/bodybuilder/banners/Groumobikodddp_44773.webp" alt="banner" />
                <img className="hidden md:block" src="https://media.veli.store/media/bodybuilder/banners/Groudeskikop_44755.webp" alt="banner" />
            </div>

            <div className="mt-8 ">
                <div className="flex justify-between mb-4 items-center">
                    <h3 className="font-bold   text-black text-[14px] xl:text-[32px]">Electronics</h3>
                     <Link className="flex items-center gap-2" to='/products?categoryName=Electronics'>
                        <div className="text-[12px] font-bold xl:text-[14px]">See more</div>
                        <div><svg width="11" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.333008 6.43848C0.333008 6.12207 0.568136 5.86058 0.873199 5.81919L0.958008 5.81348L11.9447 5.81398L7.97552 1.86104C7.73092 1.61749 7.73006 1.22176 7.97362 0.977161C8.19503 0.754795 8.5422 0.733875 8.78727 0.914893L8.8575 0.975258L13.8992 5.99526C13.9314 6.02736 13.9594 6.06211 13.9832 6.0988C13.9899 6.10984 13.9967 6.12114 14.0032 6.13267C14.0092 6.14255 14.0145 6.15281 14.0196 6.16318C14.0267 6.17827 14.0336 6.19386 14.0398 6.20977C14.0449 6.22204 14.0492 6.23397 14.053 6.24599C14.0576 6.2609 14.0621 6.27679 14.066 6.29293C14.0688 6.30419 14.0711 6.31503 14.0731 6.32591C14.0759 6.34211 14.0782 6.35886 14.0799 6.37582C14.0814 6.38875 14.0822 6.40156 14.0827 6.41439C14.0828 6.42216 14.083 6.43031 14.083 6.43848L14.0827 6.4627C14.0822 6.47496 14.0814 6.48722 14.0802 6.49944L14.083 6.43848C14.083 6.47792 14.0794 6.51651 14.0724 6.55393C14.0707 6.56286 14.0688 6.57204 14.0667 6.58117C14.0622 6.59999 14.0571 6.6181 14.0512 6.63587C14.0483 6.64469 14.0449 6.65412 14.0413 6.66348C14.034 6.68228 14.0261 6.70021 14.0173 6.71767C14.0133 6.72589 14.0087 6.73448 14.004 6.74299C13.9962 6.75687 13.9881 6.77006 13.9796 6.78292C13.9736 6.79202 13.967 6.8015 13.96 6.81082L13.9546 6.81802C13.9378 6.84002 13.9195 6.86087 13.9 6.88043L13.8992 6.88101L8.85753 11.9018C8.61295 12.1454 8.21722 12.1446 7.97365 11.9C7.75222 11.6777 7.73277 11.3304 7.91482 11.0861L7.97548 11.0161L11.943 7.06398L0.958008 7.06348C0.61283 7.06348 0.333008 6.78366 0.333008 6.43848Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></div>
                    </Link>    
                </div>

                <div className="flex   mr-0 overflow-x-scroll scrollbarhide scroll-smooth">

                    <div className="flex gap-3 xl:gap-8">

                        {electroinics.map((product) => (
                            <div className="min-w-[180px] w-full  flex flex-col  overflow-hidden  justify-between" key={product.id}>
                                <div className="pt-1">
                                    <div className="flex justify-center">
                                        <img className=" h-[128px] xl:h-[172px] xl:w-[172px]" src={product.image} alt="image" />
                                    </div>

                                    <div className="flex w-full gap-2">

                                        <div className=" mt-1">
                                            {Number(product.salePrice) === 0 ? 
                                                <div className="text-[14px] xl:text-[16px] font-bold">{product.price}$</div>
                                                        :
                                                <div className='flex items-center gap-2'>
                                                    <div className="text-[14px] xl:text-[16px] font-bold">{product.salePrice}$</div>
                                                    <div className='text-slate-600 line-through xl:text-[14px] text-[12px]'>{product.price}$</div>
                                                </div>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="text-[11px] font-semibold mt-1 xl:text-[14px] ">{product.title}</div>
                                </div>

                                <div className="flex gap-1 xl:gap-2  ">
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

            <div className="mt-20 ">
                <div className="flex justify-between mb-10 items-center">
                    <h3 className="font-bold   text-black text-[14px] xl:text-[32px]">Choose books on VELI</h3>
                     <Link className="flex items-center gap-2" to='/products?categoryName=Books'>
                        <div className="text-[12px] font-bold xl:text-[14px]">See more</div>
                        <div><svg width="11" height="10" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.333008 6.43848C0.333008 6.12207 0.568136 5.86058 0.873199 5.81919L0.958008 5.81348L11.9447 5.81398L7.97552 1.86104C7.73092 1.61749 7.73006 1.22176 7.97362 0.977161C8.19503 0.754795 8.5422 0.733875 8.78727 0.914893L8.8575 0.975258L13.8992 5.99526C13.9314 6.02736 13.9594 6.06211 13.9832 6.0988C13.9899 6.10984 13.9967 6.12114 14.0032 6.13267C14.0092 6.14255 14.0145 6.15281 14.0196 6.16318C14.0267 6.17827 14.0336 6.19386 14.0398 6.20977C14.0449 6.22204 14.0492 6.23397 14.053 6.24599C14.0576 6.2609 14.0621 6.27679 14.066 6.29293C14.0688 6.30419 14.0711 6.31503 14.0731 6.32591C14.0759 6.34211 14.0782 6.35886 14.0799 6.37582C14.0814 6.38875 14.0822 6.40156 14.0827 6.41439C14.0828 6.42216 14.083 6.43031 14.083 6.43848L14.0827 6.4627C14.0822 6.47496 14.0814 6.48722 14.0802 6.49944L14.083 6.43848C14.083 6.47792 14.0794 6.51651 14.0724 6.55393C14.0707 6.56286 14.0688 6.57204 14.0667 6.58117C14.0622 6.59999 14.0571 6.6181 14.0512 6.63587C14.0483 6.64469 14.0449 6.65412 14.0413 6.66348C14.034 6.68228 14.0261 6.70021 14.0173 6.71767C14.0133 6.72589 14.0087 6.73448 14.004 6.74299C13.9962 6.75687 13.9881 6.77006 13.9796 6.78292C13.9736 6.79202 13.967 6.8015 13.96 6.81082L13.9546 6.81802C13.9378 6.84002 13.9195 6.86087 13.9 6.88043L13.8992 6.88101L8.85753 11.9018C8.61295 12.1454 8.21722 12.1446 7.97365 11.9C7.75222 11.6777 7.73277 11.3304 7.91482 11.0861L7.97548 11.0161L11.943 7.06398L0.958008 7.06348C0.61283 7.06348 0.333008 6.78366 0.333008 6.43848Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></div>
                    </Link>    
                </div>

                <div className="flex   mr-0 overflow-x-scroll scrollbarhide scroll-smooth">

                    <div className="flex gap-5 xl:gap-8">

                        {books.map((product) => (
                            <div className="min-w-[180px] w-full  flex flex-col  overflow-hidden  justify-between" key={product.id}>
                                <div className="pt-1">
                                    <div className="flex w-full justify-center">
                                        <img className=" h-[168px]" src={product.image} alt="image" />
                                    </div>

                                    <div className="flex w-full gap-2">

                                        <div className=" mt-1">
                                            {Number(product.salePrice) === 0 ? 
                                                <div className="text-[14px] xl:text-[16px] font-bold">{product.price}$</div>
                                                        :
                                                <div className='flex items-center gap-2'>
                                                    <div className="text-[14px] xl:text-[16px] font-bold">{product.salePrice}$</div>
                                                    <div className='text-slate-600 line-through xl:text-[14px] text-[12px]'>{product.price}$</div>
                                                </div>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="text-[11px] font-semibold mt-1 xl:text-[14px] ">{product.title}</div>
                                </div>

                                <div className="flex gap-1 xl:gap-2 mt-2  ">
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

        </div>
    )
}

export default Home