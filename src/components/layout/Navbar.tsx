import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useWindowScroll } from "@uidotdev/usehooks";
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import NavBarCart from '../cartcomponent/NavBarCart'
import MyVelicomp from '../MyVelicomp'
import { CartInterface, getCartData } from '@/services/api/cart'
import LogOutComp from '../LogOutComp'


const Navbar: React.FC = () => {

        const location = useLocation()        
        const [pathName, setPathName] = useState("")
        const path = location.pathname
        const [{ x, y }, scrollTo] = useWindowScroll();
        const user = useSelector((state: RootState) => state.auth.user)
        const token = useSelector((state: RootState) => state.auth.token)
        const [cartData, setCartData] = useState<CartInterface[]>([])
        const [initilaCount, setIniCount] = useState(Number)
         
        const [signPopUp, setSignPopUp] = useState(false)
        const [isSign, setIsSign] = useState<boolean>(false)
        const [cartPopUp, setCartPopUp] = useState<boolean>(false)
        const [veliPopUp, setVeliPopUp] = useState<boolean>(false)
        const productCount = useSelector((state: RootState) => state.product.count)
        


        const [isLogoutOpen, setIsLogoutOpen] = useState(false);

         


        
    const CalculateCount = () => {
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
          },[])
      
          useEffect(() => {
              const count = cartData.reduce((total, product) => total + product.count, 0);

              setIniCount(count)
            
              
          }, [cartData]);

    
    }
    CalculateCount()
        
        


       
        useEffect(() => {
            if (!path) return
        
            const firstSegment = path.split("/")[1] 
            
            
        
            if (firstSegment === "category") {
                setPathName("category")
            } else {
                setPathName(path)
            }
        }, [path])    

    useEffect(() => {
            if (signPopUp || cartPopUp || veliPopUp) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = ""
            }


           
            return () => {
                document.body.style.overflow = ""
            }
    }, [signPopUp, cartPopUp, veliPopUp])

       

    const cartFunc = () => {
        setCartPopUp(!cartPopUp)
        setVeliPopUp(false)
    }

    const veliFunc = () => {
        setVeliPopUp(!veliPopUp)
        setCartPopUp(false)
    }
                

    
    


    return (
        <nav 
            className={`${["/profile/manage", "/profile/wishlist", "/profile/settings", "/profile", "/cart", "/cart/checkout", "/cart/contactinfo", "/cart/contactinfo/delivry", "/cart/contactinfo/delivry/checkout", "/profile/notifications", "/signin", "/signup", "category"].includes(pathName) ? "hidden md:block" : ''} ${y > 31 ? "-translate-y-full opacity-0 pointer-events-none  transition-all  ease-in-out"  : "translate-y-0 opacity-100 transition-all ease-in-out"} fixed top-0  left-0 w-full xl:w-full bg-[#B4D984]  z-50 transition-all  ease-in-out` }
        >

            {signPopUp ?
            <div className='fixed z-50 top-0 left-0 w-full h-screen flex items-center justify-center bg-[#000000b3]'>
                <div className=' rounded-2xl relative'>

                    <div onClick={() => setSignPopUp(!signPopUp)} className='top-[-45px] cursor-pointer right-0 absolute flex items-center justify-center p-3 rounded-full bg-white'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                    <div className='bg-white p-9 rounded-2xl signupscroll  max-h-[70vh]  relative  overflow-y-auto'>
                        
                        {isSign ? 

                            <SignUp setIsSign={setIsSign} />
                            :
                            <SignIn setIsSign={setIsSign} />
                        } 
                        
                    </div>
                </div>
            </div>
            :
            <></>
            }



            <div className='w-auto h-8 xl:h-[36px] bg-black'></div>

            <div className="container relative mx-auto px-4 lg:px-16 xl:px-[32px] xl:max-w-[1232px]  py-3 xl:py-2 flex justify-between bg-[#B4D984] items-center">
                <div className='py-1'>
                    <Link to="/" className="flex items-center  ">
                        <svg className='lg:hidden' width="40" height="27" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.7383 19.3626V0.634766H20.9267L13.7383 19.3626Z" fill="currentColor"></path>
                            <path d="M26.2042 8.65838C27.8363 8.65838 29.1594 7.33531 29.1594 5.70321C29.1594 4.07112 27.8363 2.74805 26.2042 2.74805C24.5721 2.74805 23.249 4.07112 23.249 5.70321C23.249 7.33531 24.5721 8.65838 26.2042 8.65838Z" fill="currentColor"></path>
                            <path d="M26.2042 16.7873C27.8363 16.7873 29.1594 15.4642 29.1594 13.8321C29.1594 12.2 27.8363 10.877 26.2042 10.877C24.5721 10.877 23.249 12.2 23.249 13.8321C23.249 15.4642 24.5721 16.7873 26.2042 16.7873Z" fill="currentColor"></path>
                            <path d="M8.03018 19.3626H13.7385L6.54839 0.634766H0.841797L8.03018 19.3626Z" fill="currentColor"></path>
                        </svg>
                        <svg className='hidden lg:block' width="113" height="30" viewBox="0 0 133 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M127.179 14.5614C130.173 14.5614 132.599 12.16 132.599 9.1977C132.599 6.2354 130.173 3.83398 127.179 3.83398C124.186 3.83398 121.76 6.2354 121.76 9.1977C121.76 12.16 124.186 14.5614 127.179 14.5614Z" fill="currentColor"></path><path d="M127.179 29.3114C130.173 29.3114 132.599 26.91 132.599 23.9477C132.599 20.9854 130.173 18.584 127.179 18.584C124.186 18.584 121.76 20.9854 121.76 23.9477C121.76 26.91 124.186 29.3114 127.179 29.3114Z" fill="currentColor"></path><path d="M23.6465 33.9826L36.8292 0H23.6465V33.9826Z" fill="currentColor"></path><path d="M66.9961 33.9828H89.5075L92.9849 25.0186H66.9961V33.9828Z" fill="currentColor"></path><path d="M66.9961 0V25.0183L76.7014 0H66.9961Z" fill="currentColor"></path><path d="M0 0L13.1827 33.9826H23.6456L10.4629 0H0Z" fill="currentColor"></path><path d="M105.468 8.98385H112.997L116.503 0H94.6988L94.6855 8.98385H102.226V25.0183H94.6855V34H113.011L116.503 25.0183H105.468V8.98385Z" fill="currentColor"></path><path d="M61.8279 8.95115L65.2855 0H38.5391V33.9826H61.8081L65.2855 25.0183H41.7786V20.6681H57.2692L60.2159 13.0704H41.7786V8.95115H61.8279Z" fill="currentColor"></path></svg>
                    </Link>
                </div>
                
                <div className='w-full ml-4 bg-white rounded-lg lg:py-[12px]  py-[14px] px-3 text-[13px]'>
                    <form className='w-full flex items-center gap-3' action="">
                        <button ><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.76709 1C9.94701 1 12.5336 3.52952 12.5336 6.63931C12.5336 8.10649 11.9578 9.44464 11.0157 10.4489L12.8696 12.2582C13.0431 12.4278 13.0437 12.7023 12.8702 12.872C12.7837 12.9577 12.6694 13 12.5557 13C12.4426 13 12.3289 12.9577 12.2419 12.8732L10.3656 11.0434C9.37857 11.8164 8.1271 12.2792 6.76709 12.2792C3.58717 12.2792 1 9.74909 1 6.63931C1 3.52952 3.58717 1 6.76709 1ZM6.76709 1.86865C4.07688 1.86865 1.88825 4.00844 1.88825 6.63931C1.88825 9.27017 4.07688 11.4105 6.76709 11.4105C9.4567 11.4105 11.6453 9.27017 11.6453 6.63931C11.6453 4.00844 9.4567 1.86865 6.76709 1.86865Z" fill="currentColor" stroke="currentColor"></path></svg></button>
                        <input className='w-full' type="text" placeholder='Search For Anything' />
                    </form>
                </div>

                <div className='relative  ml-7 border border-[#B4D984] hover:border-white rounded-lg px-2 py-2 hidden lg:block'>

                    <button onClick={() => cartFunc()} className='flex relative  items-center gap-3'>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95153 11.6052C4.50443 11.6052 4.95741 12.0679 4.95741 12.6394C4.95741 13.204 4.50443 13.6667 3.95153 13.6667C3.39196 13.6667 2.93898 13.204 2.93898 12.6394C2.93898 12.0679 3.39196 11.6052 3.95153 11.6052ZM11.4457 11.6052C11.9986 11.6052 12.4516 12.0679 12.4516 12.6394C12.4516 13.204 11.9986 13.6667 11.4457 13.6667C10.8861 13.6667 10.4331 13.204 10.4331 12.6394C10.4331 12.0679 10.8861 11.6052 11.4457 11.6052ZM0.852802 0.333423L0.920689 0.339169L2.50945 0.583411C2.73594 0.624912 2.90248 0.814726 2.92246 1.04604L3.04903 2.57C3.06901 2.78839 3.24221 2.95167 3.45538 2.95167H12.4517C12.8581 2.95167 13.1245 3.09454 13.391 3.4075C13.6574 3.72046 13.7041 4.16948 13.6441 4.577L13.0113 9.04003C12.8914 9.89794 12.1719 10.53 11.3259 10.53H4.05824C3.17227 10.53 2.4395 9.83671 2.36623 8.93866L1.75337 1.52228L0.74749 1.34539C0.481031 1.29777 0.29451 1.03243 0.34114 0.760299C0.387771 0.48204 0.647568 0.297668 0.920689 0.339169L0.852802 0.333423ZM10.2601 5.46825H8.41485C8.13507 5.46825 7.91524 5.69276 7.91524 5.9785C7.91524 6.25744 8.13507 6.48876 8.41485 6.48876H10.2601C10.5399 6.48876 10.7597 6.25744 10.7597 5.9785C10.7597 5.69276 10.5399 5.46825 10.2601 5.46825Z" fill="currentColor"></path></svg>  
                      <span className='text-[13px] font-bold'>Cart</span>
                      <div className='text-white flex items-center text-center text-[8px] justify-center bg-[#FF8469] font-bold w-[12px] h-[12px] top-[-3px] left-[9px]  rounded-full absolute '>{productCount === 0 ? initilaCount : productCount}</div>
                    </button>

                    {cartPopUp ?
                    <div className='fixed w-full h-screen left-0 top-[98px] xl:top-[95px] flex  justify-end  bg-[#000000b3]'></div>
                    :
                    <></>
                    }

                    {veliPopUp ?
                    <div className='fixed w-full h-screen left-0 top-[98px] xl:top-[95px] flex  justify-end  bg-[#000000b3]'></div>
                    :
                    <></>
                    }
                    
                </div>
                {cartPopUp ?
                    <>
                        {/* <div onClick={() => setCartPopUp(!cartPopUp)} className='top-[-45px] cursor-pointer right-0 absolute flex items-center justify-center p-3 rounded-full bg-white'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></div> */}
                        <NavBarCart setCartPopUp={setCartPopUp} />
                    </>    
                    :
                    <></>
                }

                {veliPopUp ?
                    <>
                        <MyVelicomp onLogoutClick={() => setIsLogoutOpen(true)}/>
                    </>    
                    :
                    <></>
                }
                
                <button className='ml-3 w-[110px]  border border-[#B4D984] hover:border-white  rounded-lg transition-all  py-2 hidden lg:flex justify-center'>
                    {token && user ? (
                      <div onClick={() => veliFunc()}  className='flex  items-center gap-[6px] ]'>
                        <div><svg width="14" height="16" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.52632 9.22172C8.5229 9.22172 11.0526 9.71479 11.0526 11.6191C11.0526 13.5234 8.50668 14 5.52632 14C2.52973 14 0 13.5062 0 11.6026C0 9.69835 2.54522 9.22172 5.52632 9.22172ZM5.52632 0C7.556 0 9.18299 1.64804 9.18299 3.70399C9.18299 5.75993 7.556 7.40798 5.52632 7.40798C3.49663 7.40798 1.86964 5.75993 1.86964 3.70399C1.86964 1.64804 3.49663 0 5.52632 0Z" fill="currentColor"></path></svg></div>
                        <span className='text-[13px] font-bold'>My Veli</span>
                      </div>
                    ) :
                    (
                      <div onClick={() => setSignPopUp(!signPopUp)} className='flex  items-center gap-3  '>
                        <div><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.52632 9.22172C8.5229 9.22172 11.0526 9.71479 11.0526 11.6191C11.0526 13.5234 8.50668 14 5.52632 14C2.52973 14 0 13.5062 0 11.6026C0 9.69835 2.54522 9.22172 5.52632 9.22172ZM5.52632 0C7.556 0 9.18299 1.64804 9.18299 3.70399C9.18299 5.75993 7.556 7.40798 5.52632 7.40798C3.49663 7.40798 1.86964 5.75993 1.86964 3.70399C1.86964 1.64804 3.49663 0 5.52632 0Z" fill="currentColor"></path></svg></div>
                        <span className='text-[13px] font-bold'>Log In</span>
                      </div>
                    )
                    }        
                </button>

                
            </div>

                {isLogoutOpen && (
                 <LogOutComp onClose={() => setIsLogoutOpen(false)} />
                )}

           
        </nav>
    )
}

export default Navbar

