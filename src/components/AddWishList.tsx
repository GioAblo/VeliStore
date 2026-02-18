import likedProductInterface, { 
  addLikedProducts, 
  deleteLikedProducts, 
  getLikedProducts 
} from "@/services/api/wishlist"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

interface AddWishListProps {
  productId: string
}

const AddWishList = ({ productId }: AddWishListProps) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const [like, setLike] = useState<boolean>(false)
  const [likedData, setLikedData] = useState<likedProductInterface[]>([])

 
  

  useEffect(() => {
    const fetchFavorites = async () => {
    if (!token) return
    try {
      const response = await getLikedProducts(token)
      setLikedData(response || [])
      const isLiked = response?.some((item) => item.likedProduct?.id === productId)
      setLike(isLiked)
    } catch (error) {
      console.log("Failed to fetch favorites:", error)
    }
  }
    fetchFavorites()
  }, [token, productId,])

const toFavorites = async () => {
  if (!token) return

  try {
    const likedItem = likedData.find(
      (item) => item.likedProduct?.id === productId
    )

    if (likedItem) {
      await deleteLikedProducts(likedItem.id, token)

      // update local state
      setLikedData(prev =>
        prev.filter(item => item.id !== likedItem.id)
      )
      setLike(false)

    } else {
      const newItem = await addLikedProducts(productId, token)

      // update local state
      setLikedData(prev => [...prev, newItem])
      setLike(true)
    }

  } catch (error) {
    console.log("Error updating favorites:", error)
  }
}
  return (
    <button
      onClick={toFavorites}
      className="w-[32px] h-[32px] xl:h-[36px] xl:w-[46px] rounded-lg flex items-center justify-center bg-[#EEF0F5]"
    >
      {like ? 
        <div className="">
          <svg className="xl:w-3 xl:h-3" width="9" height="9" viewBox="0 0 14 12" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M12.1556 1.68913C11.8577 1.39105 11.5039 1.15459 11.1146 0.993265C10.7252 0.831937 10.3079 0.748901 9.88643 0.748901C9.46498 0.748901 9.04766 0.831937 8.65831 0.993265C8.26895 1.15459 7.9152 1.39105 7.61726 1.68913L6.99893 2.30747L6.3806 1.68913C5.77878 1.08731 4.96253 0.749213 4.11143 0.749213C3.26033 0.749213 2.44408 1.08731 1.84226 1.68913C1.24044 2.29095 0.902344 3.1072 0.902344 3.9583C0.902344 4.8094 1.24044 5.62565 1.84226 6.22747L2.4606 6.8458L6.99893 11.3841L11.5373 6.8458L12.1556 6.22747C12.4537 5.92953 12.6901 5.57577 12.8515 5.18642C13.0128 4.79707 13.0958 4.37975 13.0958 3.9583C13.0958 3.53685 13.0128 3.11953 12.8515 2.73018C12.6901 2.34082 12.4537 1.98707 12.1556 1.68913V1.68913Z" stroke="red" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
       : 
        <div className="">
          <svg className="xl:w-3 xl:h-3" width="9" height="9" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1556 1.68913C11.8577 1.39105 11.5039 1.15459 11.1146 0.993265C10.7252 0.831937 10.3079 0.748901 9.88643 0.748901C9.46498 0.748901 9.04766 0.831937 8.65831 0.993265C8.26895 1.15459 7.9152 1.39105 7.61726 1.68913L6.99893 2.30747L6.3806 1.68913C5.77878 1.08731 4.96253 0.749213 4.11143 0.749213C3.26033 0.749213 2.44408 1.08731 1.84226 1.68913C1.24044 2.29095 0.902344 3.1072 0.902344 3.9583C0.902344 4.8094 1.24044 5.62565 1.84226 6.22747L2.4606 6.8458L6.99893 11.3841L11.5373 6.8458L12.1556 6.22747C12.4537 5.92953 12.6901 5.57577 12.8515 5.18642C13.0128 4.79707 13.0958 4.37975 13.0958 3.9583C13.0958 3.53685 13.0128 3.11953 12.8515 2.73018C12.6901 2.34082 12.4537 1.98707 12.1556 1.68913V1.68913Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      }
    </button>
  )
}

export default AddWishList
