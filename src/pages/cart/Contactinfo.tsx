import React, { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Delivry from './Delivry'
import { Divide } from 'lucide-react'
import { getCurrentUser } from '@/services/api/user'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { UserInterface } from '@/interfaces/interface'
import { CartInterface } from '@/services/api/cart'
import { Button } from '@/components/ui/button'

interface ContactinfoProps {
  cartData?: CartInterface[];
  dataPrice?: DataPriceProps
}

interface DataPriceProps {
    countProduct: number,
    discuntPrice: number,
    mainTotPrice: number
    totalPrice: number
}




const Contactinfo = ({cartData, dataPrice}: ContactinfoProps, ) => {
    const token = useSelector((state: RootState) => state.auth.token)
    const [user, setUser] = useState<UserInterface>()
    const [contactInfo, setContactInfo] = useState({
        name: "",
        emali: "",
        phoneNumber: ""
    })

    const navigate = useNavigate()
    
    useEffect(() => {
        const currentUser = async() => {
            const res = await getCurrentUser(token)

            setContactInfo({
                name: res.first_name + " " + res.last_name,
                emali: res.email,
                phoneNumber: ""
            })
            setUser(res)
            return res
        }

        currentUser()
        
        
        
    },[token])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setContactInfo((prev) => ({
            ...prev,
            [name]: value
        }))    
    };    


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        
    }  

    
    
    

  return (
    <div>
        
        <Routes>
            <Route path='/' element={
                <div className='md:pt-[104px] xl:pt-[96px] md:p-[16px] lg:px-[64px] xl:m-auto xl:px-[32px] xl:max-w-[1232px] xl:w-full'>
                    <div className=''>
                        <div  className='md:hidden  flex justify-between items-center border-b py-[12px] px-[20px]'>
                            <div onClick={() => navigate("/cart")}>
                                <div><svg width="6" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.471251 7C0.479142 7.27621 0.581736 7.51296 0.794813 7.72604L6.93461 13.7317C7.11612 13.9053 7.3292 14 7.58963 14C8.11838 14 8.52875 13.5896 8.52875 13.0609C8.52875 12.8083 8.42615 12.5716 8.24464 12.3901L2.72041 7L8.24464 1.60992C8.42615 1.42841 8.52875 1.19955 8.52875 0.93912C8.52875 0.410372 8.11838 0 7.58963 0C7.33709 0 7.11612 0.0947008 6.93461 0.26832L0.794813 6.28185C0.573844 6.48703 0.471251 6.72379 0.471251 7Z" fill="currentColor"></path></svg></div>
                            </div>
                            <div className='font-bold text-[12px]' >Contact information</div>
                            <Link to='/cart'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></Link>
                        </div>

                        <div className='hidden md:flex gap-2 items-center mt-2 lg:mt-4 xl:mt-[40px] xl:mb-[32px]'>
                                <div className='text-[12px] font-semibold xl:font-bold'>Contact information</div>
                                <div className=''> <svg width="6" height="10" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52875 7C8.52086 6.72379 8.41826 6.48704 8.20519 6.27396L2.06539 0.26832C1.88388 0.0947012 1.6708 0 1.41037 0C0.881624 0 0.471252 0.410372 0.471252 0.939121C0.471252 1.19166 0.573845 1.42841 0.755356 1.60992L6.27959 7L0.755356 12.3901C0.573845 12.5716 0.471252 12.8005 0.471252 13.0609C0.471252 13.5896 0.881624 14 1.41037 14C1.66291 14 1.88388 13.9053 2.06539 13.7317L8.20519 7.71815C8.42616 7.51297 8.52875 7.27621 8.52875 7Z" fill="currentColor"></path></svg> </div>
                                <div className='text-[12px] font-medium '>Delivery information</div>
                        </div>

                        <div className='md:flex md:gap-6 md:mt-5'>

                            <div className='p-[16px] xl:p-[20px] xl:rounded-xl  md:w-full md:border md:rounded-2xl  md:p-4 md:mb-auto  '>
                                {user ? 
                                <div className='md:m-0'>
                                    <form className='grid gap-4 items-end gap-y-3 grid-cols-1 lg:grid-cols-2' onSubmit={handleSubmit}>
                                        <div className='col-start-1 col-end-3 lg:col-end-3'>
                                            <div className='flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' htmlFor="" >Full Name*</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] md:px-[20px] md:text-[16px] pb-0' onChange={handleChange} name='name' type="text"  value={contactInfo.name} />
                                            </div>
                                        </div>
                                        <div className='col-start-1 col-end-3 lg:col-end-2  '>
                                            <div className='flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' htmlFor="" >Email*</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:text-[16px]' onChange={handleChange} name='email' type="text"  value={contactInfo.emali} />
                                            </div>
                                        </div>
                                        <div className='col-start-1 col-end-2  lg:col-start-3'>
                                            <div className='flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' htmlFor="" >Phone Number*</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:text-[16px]' onChange={handleChange} name='phoneNumber' type="number"  value={contactInfo.phoneNumber} />
                                            </div>
                                        </div>
                                    
                                        
                                    </form>
                                    { contactInfo.phoneNumber === "" ? 
                                    <div className='mt-2 text-red-600 text-[14px] ml-2'>*მიუთითეთ ყველა ველი</div>
                                    :
                                    <Button className='md:w-auto w-full md:h-[48px] rounded-xl bg-black mt-4 md:mt-7'>
                                        <NavLink className="font-semibold md:text-[14px]" type='submit' to="delivry">Next step</NavLink>
                                    </Button>
                                    }
                                </div>
                                :
                                "Loading..."
                                }
                            </div>

                            <div className=' hidden md:block  lg:p-[24px] bg-white border rounded-2xl min-w-[310px] xl:min-w-[368px] m-auto h-auto p-[20px]  '>


                                                                                            <h2 className='text-[18px]  font-bold'>CART</h2>
                                                
                                                                                            <div className='mt-[26px] mb-[20px]'>
                                                                                                <div>
                                                                                                    <div className='flex font-semibold justify-between'>
                                                                                                        <p className='text-[12px] '>Products ({dataPrice.countProduct})</p>
                                                                                                        <p className='text-[12px]'>{dataPrice.mainTotPrice}$</p>
                                                                                                    </div>
                                                
                                                                                                    <div className='flex font-semibold my-[16px] justify-between text-[12px]'>
                                                                                                        <p className='text-[12px]'>Delivery Fee</p>
                                                                                                        <div>{dataPrice.mainTotPrice > 100 ? 
                                                                                                            <div className='flex gap-1'>
                                                                                                                <p className='text-slate-600 line-through'>$5.00</p>
                                                                                                                <p>$0.00</p>
                                                                                                            </div> :
                                                                                                            <></>
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                
                                                                                                <div className='pt-[16px] font-semibold border-t flex justify-between text-[12px]'>
                                                                                                    <p className='text-[12px]'>Discount</p>
                                                                                                    <p className='text-green-600'>-{dataPrice.discuntPrice}$</p>
                                                                                                </div>
                                                                                            </div>
                                                
                                                                                            <div className='py-[16px] border-t flex justify-between font-bold text-lg'>
                                                                                                <div>Total Price</div>
                                                                                                <div>{dataPrice.totalPrice}$</div>
                                                                                            </div>
                                                
                                                                                            
                            </div>
                        </div>

                    </div>



                  

                </div>
            } />
            <Route path='delivry/*' element={<Delivry contactInfo={contactInfo} productData={cartData} dataPrice={dataPrice}  />} />
        </Routes>
    </div>
  )
}

export default Contactinfo