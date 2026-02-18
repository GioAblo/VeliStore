import { Button } from '@/components/ui/button';
import { CategoryInterface,  deleteAllCategory,  deleteCategoryById, getAllCategories } from '@/services/api/category';
import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const UpdateCategory = () => {
  const [categories, setCategories] = useState<Partial<CategoryInterface>[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

 
  
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchCategories();
  }, []);

  





  


  const deleteCategory = async(ids: string) => {
    try {
      const response = await deleteCategoryById(ids, token)

      
      
      if (response) {
        Swal.fire({
          title: "Deleted !",
          text: "Category deleted successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      }
      

      return response
    } catch (error) {
      console.log(error);
  
    }
  }


  const deleteAll = async() => {
    try {
      const response = await deleteAllCategory(token)

      
      
      if (response) {
        Swal.fire({
          title: "Deleted !",
          text: "Categories deleted successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      }

      return response
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className='mt-4 pb-16'>
      <button className='mb-4 bg-slate-200 px-3 text-[15px] rounded mt-2 py-1' onClick={() => deleteAll()} >Delete all categories</button>
      <div className='flex flex-wrap gap-4'>
        {categories.map((category) => (
          
          <div className='mt-4' key={category.id}>

            <img className='h-[76px] w-[76px]' src={category.image} alt="image" />
            <div className='text-[12px] mt-2'>{category.name}</div>
            <button className='mb-4 bg-slate-200 px-3 text-[15px] rounded mt-2 py-1' onClick={() => deleteCategory(category.id)}>Delete categorie</button>
          </div>
        ))}
        </div>
    </div>
  );
}

export default UpdateCategory