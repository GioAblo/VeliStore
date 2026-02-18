import React from 'react'
import { NavLink } from 'react-router-dom'

const PaymentCart = ({countProduct, mainTotPrice, discuntPrice, totalPrice }) => {
  return (
    
    <>
                                                    <h2 className='text-[16px] font-bold'>Payment</h2>
        
                                                    <div className='mt-[26px] mb-[20px]'>
                                                        <div>
                                                            <div className='flex font-semibold justify-between'>
                                                                <p className='text-[12px] '>Products ({countProduct})</p>
                                                                <p className='text-[12px]'>{mainTotPrice}$</p>
                                                            </div>
        
                                                            <div className='flex font-semibold my-[16px] justify-between text-[12px]'>
                                                                <p className='text-[12px]'>Delivery Fee</p>
                                                                <div>{mainTotPrice > 100 ? 
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
                                                            <p className='text-green-600'>-{discuntPrice}$</p>
                                                        </div>
                                                    </div>
        
                                                    <div className='py-[16px] border-t flex justify-between font-bold text-lg'>
                                                        <div>Total Price</div>
                                                        <div>{totalPrice}$</div>
                                                    </div>
        
                                                    <div className='mt-[16px]'>
                                                        <div className='flex items-center justify-center gap-1 font-bold'>
                                                            <span><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00008 14.6666C7.00008 14.6666 12.3334 11.9999 12.3334 7.99992V3.33325L7.00008 1.33325L1.66675 3.33325V7.99992C1.66675 11.9999 7.00008 14.6666 7.00008 14.6666Z" stroke="#52B083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                                            <div className='text-[12px]'>Secure payment process</div>
                                                        </div>
                                                        <div className='flex items-center justify-center h-[48px] rounded-xl mt-[20px] w-full bg-[#B4D984]'>
                                                            <NavLink className="text-[12px]  font-bold" to="contactinfo">Checkout</NavLink>
                                                        </div>
                                                    </div>
    </>
  )
}

export default PaymentCart