import { UserInterface } from '@/interfaces/interface'
import { getCurrentUser, updateCurrentUser, userUpdateDataInterface } from '@/services/api/user'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Settings = () => {

  const token = useSelector((state: RootState) => state.auth.token)

  const [userInfo, setUserInfo] = useState<UserInterface | null>(null)
  const [updatedData, setUpdatedData] = useState<userUpdateDataInterface>({})

  const [firstName, setFirstName] = useState(true)
  const [lastName, setLastName] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState(true)


  useEffect(() => {
    if (!token) return

    const getUser = async () => {
      try {
        const user = await getCurrentUser(token)
        
        
        setUserInfo(user)
        setUpdatedData(user)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }, [token])



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setUpdatedData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {

      const res = await updateCurrentUser(token, updatedData)
      
      

      setUserInfo(res)
    } catch (error) {
      console.log(error)
    } 
  }

 


   

  return (
    <div>
      <Link className="md:hidden" to='/profile'><svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6641 6.56152C14.6641 6.87793 14.4289 7.13942 14.1239 7.18081L14.0391 7.18652L3.0524 7.18602L7.02155 11.139C7.26616 11.3825 7.26701 11.7782 7.02346 12.0228C6.80205 12.2452 6.45487 12.2661 6.2098 12.0851L6.13957 12.0247L1.09791 7.00474C1.06567 6.97264 1.03766 6.93789 1.01389 6.9012C1.00718 6.89016 1.00035 6.87886 0.993866 6.86733C0.987908 6.85745 0.982523 6.84719 0.977443 6.83682C0.970387 6.82173 0.963494 6.80614 0.957235 6.79023C0.952149 6.77796 0.947902 6.76603 0.944029 6.75401C0.939425 6.7391 0.93495 6.72321 0.931102 6.70708C0.928241 6.69581 0.925975 6.68497 0.923999 6.67409C0.921219 6.6579 0.918854 6.64114 0.917166 6.62418C0.915708 6.61125 0.914831 6.59844 0.914346 6.58561C0.914221 6.57784 0.914063 6.5697 0.914063 6.56152L0.914377 6.53731C0.914855 6.52504 0.915693 6.51278 0.916891 6.50056L0.914063 6.56152C0.914063 6.52208 0.917717 6.48349 0.924703 6.44608C0.926323 6.43714 0.928254 6.42797 0.930392 6.41883C0.934831 6.40002 0.939962 6.3819 0.94587 6.36414C0.94877 6.35531 0.952148 6.34588 0.955758 6.33652C0.963062 6.31772 0.971 6.29979 0.979733 6.28233C0.983791 6.27412 0.988334 6.26552 0.993093 6.25701C1.0009 6.24313 1.00895 6.22994 1.01746 6.21708C1.02346 6.20798 1.03011 6.19851 1.03705 6.18918L1.04246 6.18198C1.0593 6.15998 1.07756 6.13913 1.09712 6.11958L1.09787 6.11899L6.13954 1.09816C6.38412 0.854589 6.77985 0.855408 7.02342 1.09999C7.24485 1.32234 7.2643 1.6696 7.08225 1.9139L7.02159 1.98387L3.05406 5.93602L14.0391 5.93652C14.3842 5.93652 14.6641 6.21634 14.6641 6.56152Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></Link>
      <div className="text-[18px] md:text-[20px] xl:text-[24px] font-bold mt-8 mb-3  md:m-0 md:mb-5">Profile & Settings</div>
      {userInfo != null ?

      <div >

        <div className='pb-[24px] mb-[36px] border-b'>
          <label className='text-[12px] md:text-[14px] font-semibold' >Email</label>
          <p className='text-[12px] md:text-[16px] font-medium mt-2'>{userInfo.email}</p>
        </div>


        <div className='pb-[24px] mb-[36px] border-b flex justify-between'>
          <div className='w-[368px]'>
            <label className='text-[12px] md:text-[14px] font-semibold'>First name</label>
            {firstName ? <p className='text-[12px] md:text-[16px] font-medium mt-2'>{updatedData.first_name}</p> : <></>}

            {!firstName ? 
            <div>
              <div className='mt-[20px] flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' >First name</label>
                <input className='focus:ring-0  outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] md:px-[20px] md:text-[16px] pb-0' onChange={handleChange} name='first_name' type="text" value={updatedData.first_name || ''}  />
              </div>            
              <button className='h-[48px] mt-[16px] bg-black rounded-[11px] text-white text-[14px] px-[24px] font-bold' onClick={handleSubmit}>Update first name</button>
            </div>
            :
            <></>
            }

          </div>
          <button onClick={() => setFirstName(!firstName)} className='text-[#5f7141] md:text-[14px] text-[12px] font-bold'>{firstName ? "Edit" : "Cancel"}</button>
        </div>


        <div className='pb-[24px] mb-[36px] border-b flex justify-between'>
          <div className='w-[368px]'>
            <label className='text-[12px] md:text-[14px] font-semibold'>Last name</label>
            {lastName ? <p className='text-[12px] md:text-[16px] font-medium mt-2'>{updatedData.last_name}</p> : <></>}

            {!lastName ? 
            <div>
              <div className='mt-[20px] flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' >Last Name</label>
                <input className='focus:ring-0  outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] md:px-[20px] md:text-[16px] pb-0' onChange={handleChange} name='last_name' type="text" value={updatedData.last_name || ''}  />
              </div>            
              <button className='h-[48px] mt-[16px] bg-black rounded-[11px] text-white text-[14px] px-[24px] font-bold' onClick={handleSubmit}>Update last name</button>
            </div>
            :
            <></>
            }

          </div>
          <button onClick={() => setLastName(!lastName)} className='text-[#5f7141] md:text-[14px] text-[12px] font-bold'>{lastName ? "Edit" : "Cancel"}</button>
        </div>


        <div className='pb-[24px] mb-[36px] border-b flex justify-between'>
          <div className='w-[368px]'>
            <label className='text-[12px] md:text-[14px] font-semibold'>Phone number</label>
            {phoneNumber ? <p className='text-[12px] md:text-[16px] font-medium mt-2'>{updatedData.phone_number}</p> : <></>}

            {!phoneNumber ? 
            <div>
              <div className='mt-[20px] flex focus-within:border-[#6D942E] group  border rounded-xl relative h-[48px] md:h-[55px]'>
                <label className='text-[10px] md:text-[12px] font-medium transition-colors  group-focus-within:text-[#6D942E] absolute text-[#717785] top-2 left-3 md:left-5' >Phone number</label>
                <input className='focus:ring-0  outline-none w-full h-full bg-transparent rounded-xl text-[14px] font-medium pt-[14px] px-[12px] md:px-[20px] md:text-[16px] pb-0' onChange={handleChange} name='phone_number' type="text" value={updatedData.phone_number || ''}  />
              </div>            
              <button className='h-[48px] mt-[16px] bg-black rounded-[11px] text-white text-[14px] px-[24px] font-bold' onClick={handleSubmit}>Update phone number</button>
            </div>
            :
            <></>
            }

          </div>
          <button onClick={() => setPhoneNumber(!phoneNumber)} className='text-[#5f7141] md:text-[14px] text-[12px] font-bold'>{phoneNumber ? "Edit" : "Cancel"}</button>
        </div>



       

        <div className='pb-[24px] mb-[36px] border-b flex justify-between'>
          <div>
            <label className='text-[12px] md:text-[14px] font-semibold'>Password</label>
            <p className='text-[12px] md:text-[16px] font-medium mt-2'>***********</p>
          </div>
          
        </div>

      </div>
      :
      <div>Loading...</div>
      }
    </div>
  )
}

export default Settings