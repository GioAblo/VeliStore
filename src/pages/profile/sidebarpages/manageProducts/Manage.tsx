import React, { useState } from 'react'
import AddProducts from './AddProducts'
import AddCategory from './AddCategory'
import UpdateCategory from './UpdateCategory'
import UpdateProduct from './UpdateProduct'
import { Link } from 'react-router-dom'


const Manage = () => {

  const [activeTab, setActiveTab] = useState<string>("addCategory")


  return (
    
      <div className="">
        <div className=''>
          <Link className="md:hidden" to='/profile'><svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6641 6.56152C14.6641 6.87793 14.4289 7.13942 14.1239 7.18081L14.0391 7.18652L3.0524 7.18602L7.02155 11.139C7.26616 11.3825 7.26701 11.7782 7.02346 12.0228C6.80205 12.2452 6.45487 12.2661 6.2098 12.0851L6.13957 12.0247L1.09791 7.00474C1.06567 6.97264 1.03766 6.93789 1.01389 6.9012C1.00718 6.89016 1.00035 6.87886 0.993866 6.86733C0.987908 6.85745 0.982523 6.84719 0.977443 6.83682C0.970387 6.82173 0.963494 6.80614 0.957235 6.79023C0.952149 6.77796 0.947902 6.76603 0.944029 6.75401C0.939425 6.7391 0.93495 6.72321 0.931102 6.70708C0.928241 6.69581 0.925975 6.68497 0.923999 6.67409C0.921219 6.6579 0.918854 6.64114 0.917166 6.62418C0.915708 6.61125 0.914831 6.59844 0.914346 6.58561C0.914221 6.57784 0.914063 6.5697 0.914063 6.56152L0.914377 6.53731C0.914855 6.52504 0.915693 6.51278 0.916891 6.50056L0.914063 6.56152C0.914063 6.52208 0.917717 6.48349 0.924703 6.44608C0.926323 6.43714 0.928254 6.42797 0.930392 6.41883C0.934831 6.40002 0.939962 6.3819 0.94587 6.36414C0.94877 6.35531 0.952148 6.34588 0.955758 6.33652C0.963062 6.31772 0.971 6.29979 0.979733 6.28233C0.983791 6.27412 0.988334 6.26552 0.993093 6.25701C1.0009 6.24313 1.00895 6.22994 1.01746 6.21708C1.02346 6.20798 1.03011 6.19851 1.03705 6.18918L1.04246 6.18198C1.0593 6.15998 1.07756 6.13913 1.09712 6.11958L1.09787 6.11899L6.13954 1.09816C6.38412 0.854589 6.77985 0.855408 7.02342 1.09999C7.24485 1.32234 7.2643 1.6696 7.08225 1.9139L7.02159 1.98387L3.05406 5.93602L14.0391 5.93652C14.3842 5.93652 14.6641 6.21634 14.6641 6.56152Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></Link>
          <h3 className='text-[18px] xl:text-[24px] font-bold mt-8 mb-3  md:m-0 md:mb-5'>Manage products</h3>
        </div>

        <div className="flex flex-wrap gap-3  lg:gap-4 ">
          <div
            onClick={() => setActiveTab("addCategory")}
            className={`px-1 py-2 cursor-pointer rounded-lg text-[12px] lg:px-3 lg:text-[13px] lg:font-medium text-center ${
              activeTab === "addCategory" ? " bg-[#B4D984] " : "bg-gray-200"
            }`}
          >
            Add Category
          </div>

          <div
            onClick={() => setActiveTab("addProduct")}
            className={`px-1 py-2 cursor-pointer rounded-lg text-[12px] lg:px-3 lg:text-[13px] text-center  ${
              activeTab === "addProduct" ? " bg-[#B4D984]" : "bg-gray-200"
            }`}
          >
            Add Product
          </div>

          <div
            onClick={() => setActiveTab("updateProduct")}
            className={`px-1 py-2 cursor-pointer rounded-lg text-[12px] lg:px-3 lg:text-[13px] text-center ${
              activeTab === "updateProduct" ? "bg-[#B4D984]" : "bg-gray-200"
            }`}
          >
            Change Product
          </div>

          <div
            onClick={() => setActiveTab("updateCategory")}
            className={`px-1 py-2 cursor-pointer rounded-lg text-[12px] lg:px-3 lg:text-[13px] text-center ${
              activeTab === "updateCategory" ? " bg-[#B4D984] " : "bg-gray-200"
            }`}
          >
            Change Category
          </div>
        </div>

        
        <div className="f">
          {activeTab === "addCategory" && <AddCategory />}
          {activeTab === "addProduct" && <AddProducts />}
          {activeTab === "updateProduct" && <UpdateProduct />}
          {activeTab === "updateCategory" && <UpdateCategory />}
        </div>

      </div>

    
  )
}

export default Manage