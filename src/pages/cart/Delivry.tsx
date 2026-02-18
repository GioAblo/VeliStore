import React, { useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Checkout from './Checkout'
import { Button } from '@/components/ui/button'


const Delivry = ({contactInfo, productData, dataPrice}) => {

    const [address, setAddress] = useState({
        address: "",
        region: "",
        addressName: "",
        additionalInfo: ""
    })
    const [isAddAddress, setIsAddAddress] = useState(false)
    const deliveryOptions = [
        "Tomorrow: 19:00 - 22:00",
        "Tomorrow: 22:00 - 01:00",
        "Today: 09:00 - 12:00",
        "Today: 12:00 - 15:00",
        "Today: 15:00 - 18:00",
    ]
    const [delivryTime, setDelivryTime] = useState(deliveryOptions[0])
    const navigate = useNavigate()


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target
            setAddress((prev) => ({
                ...prev,
                [name]: value
            }))    
    };    
    
    
    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            console.log(contactInfo);
            
    }  
   
   
    
  return (
    <div>
        <Routes>
            <Route path='/' element={
                <div className='md:pt-[104px] lg:px-[64px] xl:pt-[96px] md:px-[16px] xl:px-[32px] xl:m-auto xl:max-w-[1232px] xl:w-full'>

                    
                    <div className='hidden md:flex gap-2 items-center mt-2 lg:mt-4 xl:mt-[40px] xl:mb-[32px]'>
                                <div onClick={() => navigate("/cart/contactinfo")} className='text-[12px] font-medium  cursor-pointer '>Contact information</div>
                                <div className=''> <svg width="6" height="10" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52875 7C8.52086 6.72379 8.41826 6.48704 8.20519 6.27396L2.06539 0.26832C1.88388 0.0947012 1.6708 0 1.41037 0C0.881624 0 0.471252 0.410372 0.471252 0.939121C0.471252 1.19166 0.573845 1.42841 0.755356 1.60992L6.27959 7L0.755356 12.3901C0.573845 12.5716 0.471252 12.8005 0.471252 13.0609C0.471252 13.5896 0.881624 14 1.41037 14C1.66291 14 1.88388 13.9053 2.06539 13.7317L8.20519 7.71815C8.42616 7.51297 8.52875 7.27621 8.52875 7Z" fill="currentColor"></path></svg> </div>
                                <div className='text-[12px]  font-bold '>Delivery information</div>
                    </div>
                    <div className='md:flex md:m-auto md:gap-5 md:mt-6 '>

                        <div className='md:w-full md:border md:rounded-xl md:p-4 lg:p-6'>

                            <div  className='InfoTop relative after:w-[33%]  md:hidden  flex justify-between items-center border-b py-[12px] px-[20px]'>
                                                <div onClick={() => navigate("/cart")}>
                                                            <div><svg width="6" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.471251 7C0.479142 7.27621 0.581736 7.51296 0.794813 7.72604L6.93461 13.7317C7.11612 13.9053 7.3292 14 7.58963 14C8.11838 14 8.52875 13.5896 8.52875 13.0609C8.52875 12.8083 8.42615 12.5716 8.24464 12.3901L2.72041 7L8.24464 1.60992C8.42615 1.42841 8.52875 1.19955 8.52875 0.93912C8.52875 0.410372 8.11838 0 7.58963 0C7.33709 0 7.11612 0.0947008 6.93461 0.26832L0.794813 6.28185C0.573844 6.48703 0.471251 6.72379 0.471251 7Z" fill="currentColor"></path></svg></div>
                                                        </div>
                                                <div className='font-bold text-[12px]' >Delivery information</div>
                                                <Link to='/cart'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></Link>
                            </div>


                            {isAddAddress ? 
                                <div className='AddAddress mt-4 px-3  md-p md:m-0 md:p-[8px]'>
                                    
                                    <div className='text-[14px] font-bold border-b md:border-none pb-3 md:pb-0'>Add address</div>

                                    <div className='mt-6'>
                                        <form onSubmit={handleSubmit}>
                                            <div className='flex mt-4 focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 font-semibold md:left-5 md:text-[12px] md:top-1 ' htmlFor="" >Add street</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-lg text-[14px] font-semibold md:font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:text-[16px] ' onChange={handleChange} name='address' type="text"  value={address.address} />
                                            </div>
                                            <div className='flex mt-3 focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 font-semibold md:left-5 md:text-[12px] md:top-1 ' htmlFor="" >Region</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-lg text-[14px] font-semibold md:font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:text-[16px]' onChange={handleChange} name='region' type="text"  value={address.region} />
                                            </div>
                                            <div className='flex mt-3 focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                                                <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 font-semibold md:left-5 md:text-[12px] md:top-1 ' htmlFor="" >Title(E.G Work)</label>
                                                <input className='focus:ring-0 outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-semibold md:font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:text-[16px]' onChange={handleChange} name='addressName' type="text"  value={address.addressName} />
                                            </div>
                                            <div className='flex   mt-6 focus-within:border-[#6D942E] group  border rounded-xl relative h-[80px] md:h-[110px]'>
                                                <label className='text-[10px] transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 font-semibold md:left-5 md:text-[12px] md:top-3 ' htmlFor="" >Make a note  </label>
                                                <textarea className='focus:ring-0 outline-none w-full h-auto bg-transparent rounded-xl text-[14px] font-semibold md:font-medium pt-[14px] px-[12px] pb-0 md:px-[20px] md:pt-6 md:text-[16px]' onChange={handleChange} name='additionalInfo'  value={address.additionalInfo} />
                                            </div>
                                            {/* <input onChange={handleChange} name='address' type="text"  value={address.address} />
                                            <input onChange={handleChange} name='region' type="text"  value={address.region} />
                                            <input onChange={handleChange} name='addressName' type="text" value={address.addressName} /> */}


                                            <Button className='mt-8 md:mt-10 w-full md:w-auto md:rounded-xl md:h-[48px] md:font-bold' type='submit' onClick={() => setIsAddAddress(!isAddAddress)}>Save address</Button>
                                        </form>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='border rounded-lg mx-[12px]  mt-3 md:m-0' onClick={() => setIsAddAddress(!isAddAddress)}>
                                        <div className='p-[12px] md:p-4 flex justify-between items-center'>
                                            <div className='flex items-center gap-4'>
                                            <div className='w-[40px] h-[40px] flex justify-center items-center bg-[#f5f6f6] rounded-lg'>
                                                <svg width="12" height="15" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 0C13.2848 0 15.9555 1.12882 17.9246 3.13814C19.8938 5.14746 21 7.87268 21 10.7143C21 15.15 17.6867 19.7976 11.2 24.7619C10.9981 24.9165 10.7524 25 10.5 25C10.2476 25 10.0019 24.9165 9.8 24.7619C3.31333 19.7976 0 15.15 0 10.7143C0 7.87268 1.10625 5.14746 3.07538 3.13814C5.04451 1.12882 7.71523 0 10.5 0ZM10.5 7.14286C9.57174 7.14286 8.6815 7.51913 8.02513 8.1889C7.36875 8.85868 7 9.76708 7 10.7143C7 11.6615 7.36875 12.5699 8.02513 13.2397C8.6815 13.9094 9.57174 14.2857 10.5 14.2857C11.4283 14.2857 12.3185 13.9094 12.9749 13.2397C13.6313 12.5699 14 11.6615 14 10.7143C14 9.76708 13.6313 8.85868 12.9749 8.1889C12.3185 7.51913 11.4283 7.14286 10.5 7.14286Z" fill="currentColor"></path></svg>
                                            </div>
                                            {address.address != "" ? 
                                                <div>
                                                    <div className='font-bold text-[12px]  md:text-[14px]'>{address.addressName}</div>
                                                    <div className='mt-1 lg:mt-2 flex gap-1 font-medium'>
                                                        <div className='text-[11px] md:text-[12]  text-[#58606d]'>{address.address},</div>
                                                        <div className='text-[11px] md:text-[12]  text-[#58606d]'>{address.region},</div>
                                                        <div className='text-[11px] md:text-[12]  text-[#58606d]'>Georgia</div>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    მიუთითე მისამართი
                                                </div>
                                            }
                                            </div>
                                            <div><svg width="6" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.52875 7C8.52086 6.72379 8.41826 6.48704 8.20519 6.27396L2.06539 0.26832C1.88388 0.0947012 1.6708 0 1.41037 0C0.881624 0 0.471252 0.410372 0.471252 0.939121C0.471252 1.19166 0.573845 1.42841 0.755356 1.60992L6.27959 7L0.755356 12.3901C0.573845 12.5716 0.471252 12.8005 0.471252 13.0609C0.471252 13.5896 0.881624 14 1.41037 14C1.66291 14 1.88388 13.9053 2.06539 13.7317L8.20519 7.71815C8.42616 7.51297 8.52875 7.27621 8.52875 7Z" fill="currentColor"></path></svg></div>
                                        </div>
                                        
                                    </div>

                                    <div className='DTime px-3 md:p-0 mt-3 md:mt-6'>
                                        <div className='font-bold text-[12px] md:text-[14px]'>Choose delivery time</div>

                                        <div className='flex flex-col gap-4 md:grid grid-cols-2 lg:grid-cols-3 text-[12px] font-semibold mt-3 '>
                                            {deliveryOptions.map((time, i) => (
                                                <label className='flex  bg-[#f5f5f5] justify-between  p-3 md:p-[13px] rounded-lg'  key={i}>
                                                    <div className=''>{time}</div>
                                                    <input
                                                        className=' md:w-5'
                                                        type="radio"
                                                        name="deliveryTime"
                                                        value={time}
                                                        checked={delivryTime === time}
                                                        onChange={(e) => setDelivryTime(e.target.value)}
                                                    />
                                                </label>
                                            ))}
                                            
                                        </div>
                                    </div>
                                    <div className='px-3 mt-5 md:mt-6 md:p-0'>
                                        {address.address != "" ?
                                            <Button className='w-full md:w-auto md:h-[48px] rounded-[10px]'>
                                                <NavLink to="checkout">Next step</NavLink>
                                            </Button>   
                                            :
                                            <div className='text-red-500 font-medium text-[12px]  lg:text-[14px] ml-2 '>*მიუთითეთ ყველა ველი</div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        
                        <div className=' hidden md:block  lg:p-[24px] bg-white border rounded-2xl min-w-[310px] xl:min-w-[368px] mb-auto h-auto p-[20px]  '>


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
                } />
            <Route path='checkout/*' element={<Checkout dataPrice={dataPrice} contactInfo={contactInfo} productData={productData} delivryTime={delivryTime} address={address} />} />
        </Routes>
    </div>
  )
}

export default Delivry