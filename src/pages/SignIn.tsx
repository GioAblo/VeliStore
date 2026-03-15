import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { signin, signinFormInterface } from '@/services/api/auth'
import { getCurrentUser } from '@/services/api/user'
import { logInSuccess } from '@/store/slices/authSlice'
import Swal from "sweetalert2"

const SignIn = ({setIsSign}) => {
    const [formData, setFormData] = useState<signinFormInterface>({ email: "", password: "" })
    //email: "abloablo3030@gmail.com", password: "barcelona2015"
    const [error, setError] = useState<string>("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await signin(formData)
            const currentUser = await getCurrentUser(response.access_token)

            dispatch(logInSuccess({ user: currentUser, token: response.access_token }))

            setTimeout(() => {
                navigate('/')
            }, 1500)

            Swal.fire({
                title: "You are loged in!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        } catch (err) {
            setError(err.message)
            console.log("Error: ", err)
        }
    }


  
    useEffect(() => {
       
        const check = () => {

            if (location.pathname === "/signin" && window.innerWidth > 1024) {
            navigate("/");
            }
        };

        check();

      
        window.addEventListener("resize", check);

        return () => {
            window.removeEventListener("resize", check);
        };
       
    },[location.pathname, navigate])

    return (
    <>
        
        <div className='pt-4 px-3 pb-12 md:hidden'>
            <div>
                <Link to="/"><svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6641 6.56152C14.6641 6.87793 14.4289 7.13942 14.1239 7.18081L14.0391 7.18652L3.0524 7.18602L7.02155 11.139C7.26616 11.3825 7.26701 11.7782 7.02346 12.0228C6.80205 12.2452 6.45487 12.2661 6.2098 12.0851L6.13957 12.0247L1.09791 7.00474C1.06567 6.97264 1.03766 6.93789 1.01389 6.9012C1.00718 6.89016 1.00035 6.87886 0.993866 6.86733C0.987908 6.85745 0.982523 6.84719 0.977443 6.83682C0.970387 6.82173 0.963494 6.80614 0.957235 6.79023C0.952149 6.77796 0.947902 6.76603 0.944029 6.75401C0.939425 6.7391 0.93495 6.72321 0.931102 6.70708C0.928241 6.69581 0.925975 6.68497 0.923999 6.67409C0.921219 6.6579 0.918854 6.64114 0.917166 6.62418C0.915708 6.61125 0.914831 6.59844 0.914346 6.58561C0.914221 6.57784 0.914063 6.5697 0.914063 6.56152L0.914377 6.53731C0.914855 6.52504 0.915693 6.51278 0.916891 6.50056L0.914063 6.56152C0.914063 6.52208 0.917717 6.48349 0.924703 6.44608C0.926323 6.43714 0.928254 6.42797 0.930392 6.41883C0.934831 6.40002 0.939962 6.3819 0.94587 6.36414C0.94877 6.35531 0.952148 6.34588 0.955758 6.33652C0.963062 6.31772 0.971 6.29979 0.979733 6.28233C0.983791 6.27412 0.988334 6.26552 0.993093 6.25701C1.0009 6.24313 1.00895 6.22994 1.01746 6.21708C1.02346 6.20798 1.03011 6.19851 1.03705 6.18918L1.04246 6.18198C1.0593 6.15998 1.07756 6.13913 1.09712 6.11958L1.09787 6.11899L6.13954 1.09816C6.38412 0.854589 6.77985 0.855408 7.02342 1.09999C7.24485 1.32234 7.2643 1.6696 7.08225 1.9139L7.02159 1.98387L3.05406 5.93602L14.0391 5.93652C14.3842 5.93652 14.6641 6.21634 14.6641 6.56152Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></Link>
                <div className='flex w-full items-center justify-center flex-col'>
                    <Link className='bg-[#B4D984] w-[40px] h-[40px] flex justify-center items-center rounded-lg' to='/'><svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7383 19.3626V0.634766H20.9267L13.7383 19.3626Z" fill="currentColor"></path><path d="M26.2042 8.65838C27.8363 8.65838 29.1594 7.33531 29.1594 5.70321C29.1594 4.07112 27.8363 2.74805 26.2042 2.74805C24.5721 2.74805 23.249 4.07112 23.249 5.70321C23.249 7.33531 24.5721 8.65838 26.2042 8.65838Z" fill="currentColor"></path><path d="M26.2042 16.7873C27.8363 16.7873 29.1594 15.4642 29.1594 13.8321C29.1594 12.2 27.8363 10.877 26.2042 10.877C24.5721 10.877 23.249 12.2 23.249 13.8321C23.249 15.4642 24.5721 16.7873 26.2042 16.7873Z" fill="currentColor"></path><path d="M8.03018 19.3626H13.7385L6.54839 0.634766H0.841797L8.03018 19.3626Z" fill="currentColor"></path></svg></Link>
                    <div className='text-[16px] font-semibold mt-[16px]'>Shopping starts here</div>
                </div>
            </div>

            <div className='flex  my-5 '>
                <Link to="/signin" className='w-full text-[11px] font-bold border-[#B4D984] text-center py-3 border-b'>Sign In</Link>
                <Link to="/signup" className='w-full text-[11px]  font-semibold text-center py-3 border-b'>Sign Up</Link>
            </div>
            <div className=''>
                

                <form onSubmit={handleSubmit} className='space-y-6'>
                    
                    <div className='flex focus-within:border-[#6D942E] group  border rounded-lg relative h-[48px]'>
                        <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3' htmlFor="" >Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            
                            required
                            className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-lg text-[14px] font-bold pt-[14px] px-[12px] pb-0'
                        />
                    </div>

                    <div className='flex focus-within:border-[#6D942E] group  border rounded-lg relative h-[48px]'>
                        <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3' htmlFor="" >Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            
                            required
                            className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-lg text-[14px] font-bold pt-[14px] px-[12px] pb-0'
                        />
                    </div>

                    {error && <p className='text-red-500 text-md'>{error}</p>}

                    <Button type="submit" className='w-full rounded-[10px] bg-black h-[48px]'>Log in</Button>
                </form>

                
            </div>
        </div>

        <div className='hidden md:block md:mt-[140px] md:pb-10 lg:pb-0 lg:mt-0 mx-auto md:max-w-[500px] lg:max-w-auto'>
           <div className='text-[24px] font-bold text-center'>Authorize</div>

            <div className='flex  my-6 gap-2 '>
                <div   className='w-full text-[14px] cursor-pointer font-bold border-black text-center py-3 border-b-2'>Sign In</div>
                <Link to="/signup" className='w-full lg:hidden text-[14px] cursor-pointer  font-semibold text-center py-3 border-b'>Sign Up</Link>
                <div onClick={() => setIsSign(true)} className='w-full hidden lg:block text-[14px] cursor-pointer  font-semibold text-center py-3 border-b'>Sign Up</div>
            </div>

            <div className=''>
                

                <form onSubmit={handleSubmit} className='space-y-6'>
                    
                    <div className='flex focus-within:border-[#6D942E] md:w-full lg:w-[440px] group  border rounded-lg relative h-[55px]'>
                        <label className='text-[13px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3' htmlFor="" >Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            
                            required
                            className='focus:ring-0 outline-none  w-full h-full bg-transparent rounded-lg text-[14px] font-bold pt-[14px] px-[14px] pb-0'
                        />
                    </div>

                    <div className='flex focus-within:border-[#6D942E]  md:w-full lg:w-[440px] group  border rounded-lg relative h-[55px]'>
                        <label className='text-[13px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3' htmlFor="" >Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            
                            required
                            className='focus:ring-0 outline-none  w-full h-full bg-transparent rounded-lg text-[14px] font-bold pt-[14px] px-[14px] pb-0'
                        />
                    </div>

                    {error && <p className='text-red-500 text-md'>{error}</p>}

                    <Button type="submit" className='w-full rounded-[10px] bg-black h-[55px]'>Log in</Button>
                </form>

                
            </div>
        </div>
    </>
    )
}

export default SignIn