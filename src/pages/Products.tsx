import FilterPanel from "@/components/FilterPanel"
import { GetProductsInterface } from "@/services/api/product"
import { productsLoader } from "@/services/loader/loader"
import { RootState } from "@/store"
import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom"
import useAddToCart from "@/components/cartcomponent/useAddToCart"
import AddWishList from "@/components/AddWishList"
import { setProductCount } from "@/store/countProduct"
import { Pagination } from "@/components/ui/pagination"

interface ProductsLoaderData {
    productsResponse: Promise<GetProductsInterface>
}

const Products = () => {
    const loader = useLoaderData() as ProductsLoaderData
    const token = useSelector((state: RootState) => state.auth.token)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = searchParams.get('page') || '1'
    const [pageSize, setPageSize] = useState<string>(searchParams.get('pageSize') || '5')
    const [page, setPage] = useState<string>(searchParams.get('page') || '1')
    const pageSizeOptions = ["5", "10", "15", "20", "40"]
    const pageOptions = ["1", "2", "3", "4", "5"]
    const countOfProduct = useSelector((state: RootState) => state.product.count)
    const [countProduct, setCountProduct] = useState(countOfProduct)
    const dispatch = useDispatch()

   

    const [panel, setPanel] = useState(false)

    const addToCart = useAddToCart()

    const changePageSize = (value: string) => {
        setPageSize(value)
        
        searchParams.set('pageSize', value)

        setSearchParams(searchParams)
    }

    const changePage = (value: string) => {
        setPage(value)
        searchParams.set('page', value)
        

        setSearchParams(searchParams)
    }

    useEffect(() => {
        dispatch(setProductCount({count: countProduct}))
    },[addToCart, dispatch, countProduct])       

    const addToCartManually = (id: string) => {

        setCountProduct((prev) => prev + 1)

        addToCart(id)
    }   

    return (
        <div className='mt-[120px] md:mt-[140px] relative md:px-4 lg:px-[64px] max-w-[1232px] xl:px-[32px] mx-auto'>
            <div className="md:flex md:gap-6">
                <Link className="md:hidden" to="/">
                    <div   className="pl-3 pb-3 mt-4"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.471251 7C0.479142 7.27621 0.581736 7.51296 0.794813 7.72604L6.93461 13.7317C7.11612 13.9053 7.3292 14 7.58963 14C8.11838 14 8.52875 13.5896 8.52875 13.0609C8.52875 12.8083 8.42615 12.5716 8.24464 12.3901L2.72041 7L8.24464 1.60992C8.42615 1.42841 8.52875 1.19955 8.52875 0.93912C8.52875 0.410372 8.11838 0 7.58963 0C7.33709 0 7.11612 0.0947008 6.93461 0.26832L0.794813 6.28185C0.573844 6.48703 0.471251 6.72379 0.471251 7Z" fill="currentColor"></path></svg></div>
                </Link>
                
                <div className="flex justify-between border-t px-2 py-4 md:hidden">

                    <div className="px-3 py-1   bg-[#EEF0F5] rounded-2xl">
                        <label className='text-[11px] font-bold'>Sort</label>
                        <select
                            value={pageSize}
                            onChange={(e) => changePageSize(e.target.value)}
                            className='sortselect text-[12px] font-bold border-none '
                        >
                            {pageSizeOptions.map(size => (
                                <option className="" key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className=''>

                        <button onClick={() => setPanel(!panel)}  className="flex px-4 py-2 items-center justify-center gap-2 bg-[#EEF0F5] text-[11px] font-bold rounded-2xl">
                            <div><svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.27605 6.22086L5.4606 6.22755C5.59682 6.22802 5.70709 6.34209 5.70709 6.48193V7.7109C5.70709 7.85121 5.6274 7.97817 5.50323 8.03687L3.52022 8.96802C3.47388 8.9895 3.42477 9 3.37566 9C3.31033 9 3.245 8.98091 3.18802 8.9432C3.0884 8.87734 3.02817 8.76375 3.02817 8.64205V6.47525C3.02817 6.33445 3.13937 6.22039 3.27605 6.22086ZM8.04232 0C8.57143 0 9 0.441474 9 0.986515V1.67569C9 1.9401 8.89668 2.194 8.7132 2.37918L5.78595 5.34016C5.73544 5.39171 5.66687 5.42034 5.59598 5.41987L3.14502 5.41223C3.07042 5.41223 2.99954 5.38025 2.94857 5.32441L0.258533 2.36582C0.0922008 2.18303 0 1.94153 0 1.69096V0.986992C0 0.441951 0.428571 0 0.957683 0H8.04232Z" fill="currentColor"></path></svg></div>
                            <div>filter</div>
                        </button>                            
                        {panel ?
                        <div className="fixed z-50  top-0 left-0 h-screen w-full  justify-end  bg-[#000000a8]">
                            <div className="bg-white w-full absolute bottom-0 left-0 rounded-t-3xl">
                                <div className="flex justify-between items-center px-4 mt-4 pb-4 ">
                                    <div className="text-[14px] font-bold">Filtering</div>
                                    <div  onClick={() => setPanel(!panel)}><svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                                </div>
                                <FilterPanel />
                            </div>
                        </div> 
                        :
                        <></>
                        }    
                    </div>
                </div>

                <div className="hidden md:block">
                    <FilterPanel />
                </div>

                <div className="md:w-full">
                    <Suspense fallback={<div>იტვირთბა...</div>}>
                        <Await resolve={loader.productsResponse}>
                            {(productsResponse: GetProductsInterface) => (
                                <>
                                    <div className="grid  grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 md:w-full  ">
                                        {productsResponse.products.map((product) => {
                                            return (
                                                <div className=" p-3 border border-[#f5f5f5]    flex flex-col  justify-between h-auto   w-auto " key={product.id}>
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
                                            )
                                        })}
                                    </div>

                                    <div>

                                    </div>
                                </>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className=" md:flex md:justify-between">
                <div className="flex gap-3 m-5 text-[14px] font-semibold">
                    {pageOptions.map(size => (
                        <div className={`${currentPage === size ? "bg-black text-white flex items-center justify-center w-6 h-6 rounded-full" : 'items-center flex justify-center' }`} onClick={() => changePage(size)} key={size} >{size}</div>
                    ))}
                </div>
                    <div className="hidden md:flex  px-3 py-3 md:my-auto   bg-[#EEF0F5] rounded-3xl">
                        <label className='text-[12px] font-semibold'>Show Products</label>
                        <select
                            value={pageSize}
                            onChange={(e) => changePageSize(e.target.value)}
                            className='sortselect text-[12px] font-bold border-none '
                        >
                            {pageSizeOptions.map(size => (
                                <option className="" key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>               
            </div>
        </div>
    )
}

export default Products
