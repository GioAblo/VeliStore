import { logOut } from '@/store/slices/authSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


interface Props {
  onClose: () => void
}


const LogOutComp = ({ onClose }: Props) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOutFrom = () => {
        dispatch(logOut())
        navigate('/')
        window.location.reload();
    }
    


  return (
    <div className='bg-[#000000a8] fixed inset-0 z-[9999] w-full h-screen flex justify-center items-center'>
        <div className='bg-white rounded-[16px] w-[343px]'>
            <div className='flex justify-between items-center border-b py-5 '>
                <div className='text-[14px] font-bold pl-[16px]'>Log out</div>
                <button onClick={onClose} className='pr-[16px]'><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            </div>


            <div className='text-[#6c6c7e] px-4 text-[14px] font-medium my-[16px]  '>
                <div className='pb-[16px] border-b'>Do you really want to come out?</div>
            </div>

            <div className='px-4 pb-4'>
                <button onClick={() => logOutFrom()} className='bg-[#fb7d7d] mb-2 w-full leading-[56px] rounded-lg font-semibold text-[14px]'>Confirm</button>
                <button onClick={onClose} className='bg-black w-full  leading-[56px] rounded-lg font-medium text-[14px] text-white'>cancel</button>
            </div>

        </div>
    </div>
  )
}

export default LogOutComp