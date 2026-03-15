import { Button } from '@/components/ui/button';
import { addCategory } from '@/services/api/category';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddCategory = () => {

    const token = useSelector((state: RootState) => state.auth.token)
    const [formData, setFormData] = useState({
      name: "",
      image: ""
    });
    


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = event.target
  
          console.log(name, value);
          
  
          setFormData((prev) => ({
              ...prev,
              [name]: value,
          }));
    };    
  
   
      
      
  
    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
  
          try {
              const addCategorySuccessfully = await addCategory(formData, token)
              
              if (addCategorySuccessfully) {
                 
  
                  Swal.fire({
                      title: "გილოცავთ!",
                      text: "თქვენ წარმატებით გაიარეთ რეგისტრაცია!",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true
                  });
                  
                  setFormData({name: "", image: ""})
              }
  
          } catch (err) {
              console.log("Error: ", err)
          }
    }        



  return (
    <div className='mt-10'>
      <form
          onSubmit={handleSubmit}
          className="flex gap-2 mt-5 flex-col lg:max-w-[420px]"
        >

          <div className="grid gap-3">

            <div className="flex flex-col">
              <label className='text-[13px] lg:text-[14px] lg:font-medium'>Name for image</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-8 lg:h-9 border rounded"
              />
            </div>

            <div className="flex flex-col lg:mt-1">
              <label className='text-[13px] lg:text-[14px] lg:font-medium'>Image URL</label>
              <textarea
                name="image"
                defaultValue={formData.image}
                onChange={handleChange}
                className="h-8 lg:h-9 border rounded "
              />
            </div>
          </div>

          <button type="submit" className="px-3 py-1 lg:mt-4 lg:w-[120px] lg:px-2 lg:font-medium  bg-[#B4D984]  rounded">
            Add
          </button>
        </form>
    </div>
  )
}

export default AddCategory