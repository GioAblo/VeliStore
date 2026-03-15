import AddWishList from "@/components/AddWishList"
import useAddToCart from "@/components/cartcomponent/useAddToCart"
import likedProductInterface, { deleteLikedProducts, getLikedProducts } from "@/services/api/wishlist"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Wishlist = () => {
  const [likedData, setLikedData] = useState<likedProductInterface[]>([])
  const token = useSelector((state: RootState) => state.auth.token)
  const addToCart = useAddToCart()
  const [ids, setIds] = useState<string[]>([])


  useEffect(() => {
    const fetchLikedData = async() => {
      try {
        const res = await getLikedProducts(token)
        

        setLikedData(res)
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchLikedData()
  },[token])

  const deleteProduct =  async(id: string) => {
    await deleteLikedProducts(id, token)
    setIds((prev) => [...prev, id])
    
  }

  
  

  const DataComp = () => {
    if (likedData.length != 0) {
      return (
        <div>
            {likedData.map((likeData) => (
            <div className="flex justify-between border-b border-[#dcdde066] pt-[4px] pb-[16px] lg:pb-[24px] lg:pt-[20px] mb-[8px]" key={likeData.id}>
                <div className="flex lg:gap-2">

                  <img className="w-[76px] h-[76px] lg:h-[90px]" src={likeData.likedProduct.image} alt="img" />

                  <div className="mx-[12px]">
                    <div className="text-[13px] font-bold max-w-[164px] lg:text-[12px] lg:font-medium">{likeData.likedProduct.title}</div>
                    <div className="mt-[6px]">
                        {Number(likeData.likedProduct.salePrice) === 0 ? 
                            <div className="font-bold text-[15px]">{likeData.likedProduct.price}$</div>
                            :
                            <div className='flex gap-2'>
                                <div className="font-bold text-[15px]">{likeData.likedProduct.salePrice}$</div>
                                <div className='text-slate-600 text-[13px] line-through'>{likeData.likedProduct.price}$</div>
                            </div>
                        }
                    </div>
                    <button className="text-[11px] lg:text-[14px] xl:px-3 xl:py-2 bg-[#B4D984] px-[8px] py-1 rounded-lg font-bold mt-[12px]" onClick={() => addToCart(likeData.likedProduct.id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div  className="flex items-end">
                  {ids.includes(likeData.id) ? 
                   <button  className="">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" width="9" height="9" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1556 1.68913C11.8577 1.39105 11.5039 1.15459 11.1146 0.993265C10.7252 0.831937 10.3079 0.748901 9.88643 0.748901C9.46498 0.748901 9.04766 0.831937 8.65831 0.993265C8.26895 1.15459 7.9152 1.39105 7.61726 1.68913L6.99893 2.30747L6.3806 1.68913C5.77878 1.08731 4.96253 0.749213 4.11143 0.749213C3.26033 0.749213 2.44408 1.08731 1.84226 1.68913C1.24044 2.29095 0.902344 3.1072 0.902344 3.9583C0.902344 4.8094 1.24044 5.62565 1.84226 6.22747L2.4606 6.8458L6.99893 11.3841L11.5373 6.8458L12.1556 6.22747C12.4537 5.92953 12.6901 5.57577 12.8515 5.18642C13.0128 4.79707 13.0958 4.37975 13.0958 3.9583C13.0958 3.53685 13.0128 3.11953 12.8515 2.73018C12.6901 2.34082 12.4537 1.98707 12.1556 1.68913V1.68913Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                   </button>  
                  :
                    <button onClick={() => deleteProduct(likeData.id)} className="">
                     <svg className="w-4 h-4 lg:w-5 lg:h-5" width="9" height="9" viewBox="0 0 14 12" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M12.1556 1.68913C11.8577 1.39105 11.5039 1.15459 11.1146 0.993265C10.7252 0.831937 10.3079 0.748901 9.88643 0.748901C9.46498 0.748901 9.04766 0.831937 8.65831 0.993265C8.26895 1.15459 7.9152 1.39105 7.61726 1.68913L6.99893 2.30747L6.3806 1.68913C5.77878 1.08731 4.96253 0.749213 4.11143 0.749213C3.26033 0.749213 2.44408 1.08731 1.84226 1.68913C1.24044 2.29095 0.902344 3.1072 0.902344 3.9583C0.902344 4.8094 1.24044 5.62565 1.84226 6.22747L2.4606 6.8458L6.99893 11.3841L11.5373 6.8458L12.1556 6.22747C12.4537 5.92953 12.6901 5.57577 12.8515 5.18642C13.0128 4.79707 13.0958 4.37975 13.0958 3.9583C13.0958 3.53685 13.0128 3.11953 12.8515 2.73018C12.6901 2.34082 12.4537 1.98707 12.1556 1.68913V1.68913Z" stroke="red" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                  }
                 

                      
                </div>
         
            </div>
            ))}
      </div>
      )
    }else {
      return (
        <div>You dont have favorites yet!</div>
      )
    }
  }

  return (
    <div>
      <Link className="md:hidden" to='/profile'><svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6641 6.56152C14.6641 6.87793 14.4289 7.13942 14.1239 7.18081L14.0391 7.18652L3.0524 7.18602L7.02155 11.139C7.26616 11.3825 7.26701 11.7782 7.02346 12.0228C6.80205 12.2452 6.45487 12.2661 6.2098 12.0851L6.13957 12.0247L1.09791 7.00474C1.06567 6.97264 1.03766 6.93789 1.01389 6.9012C1.00718 6.89016 1.00035 6.87886 0.993866 6.86733C0.987908 6.85745 0.982523 6.84719 0.977443 6.83682C0.970387 6.82173 0.963494 6.80614 0.957235 6.79023C0.952149 6.77796 0.947902 6.76603 0.944029 6.75401C0.939425 6.7391 0.93495 6.72321 0.931102 6.70708C0.928241 6.69581 0.925975 6.68497 0.923999 6.67409C0.921219 6.6579 0.918854 6.64114 0.917166 6.62418C0.915708 6.61125 0.914831 6.59844 0.914346 6.58561C0.914221 6.57784 0.914063 6.5697 0.914063 6.56152L0.914377 6.53731C0.914855 6.52504 0.915693 6.51278 0.916891 6.50056L0.914063 6.56152C0.914063 6.52208 0.917717 6.48349 0.924703 6.44608C0.926323 6.43714 0.928254 6.42797 0.930392 6.41883C0.934831 6.40002 0.939962 6.3819 0.94587 6.36414C0.94877 6.35531 0.952148 6.34588 0.955758 6.33652C0.963062 6.31772 0.971 6.29979 0.979733 6.28233C0.983791 6.27412 0.988334 6.26552 0.993093 6.25701C1.0009 6.24313 1.00895 6.22994 1.01746 6.21708C1.02346 6.20798 1.03011 6.19851 1.03705 6.18918L1.04246 6.18198C1.0593 6.15998 1.07756 6.13913 1.09712 6.11958L1.09787 6.11899L6.13954 1.09816C6.38412 0.854589 6.77985 0.855408 7.02342 1.09999C7.24485 1.32234 7.2643 1.6696 7.08225 1.9139L7.02159 1.98387L3.05406 5.93602L14.0391 5.93652C14.3842 5.93652 14.6641 6.21634 14.6641 6.56152Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path></svg></Link>
      <div className="text-[18px] xl:text-[24px] font-bold mt-8 mb-3  md:m-0 md:mb-5">Wishlist</div>
      {likedData != null ? 
       <DataComp />
       :
       <div>Loading...</div>
      }
    </div>
  )
}

export default Wishlist