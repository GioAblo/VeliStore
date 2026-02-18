import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/services/api/category';
import { addProduct } from '@/services/api/product';
import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddProducts = () => {

    const token = useSelector((state: RootState) => state.auth.token)
    const [formData, setFormData] = useState({
        title: "",
        category_name: "",
        description: "",
        image: "",
        price: 0,
        salePrice: 0
    });
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("")


    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories()
                setCategories(response)
            } catch (err) {
                console.log('Error: ', err);
            }
        }

        fetchCategories()
    }, [])        



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target

        

        setFormData((prev) => ({
            ...prev,
            [name]:
            name === "price" || name === "salePrice"
                ? Number(value)
                : value,
        }));
    };    

        
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const addProductSuccessfully = await addProduct(formData, token)
            
            if (addProductSuccessfully) {
               

                Swal.fire({
                    title: "გილოცავთ!",
                    text: "თქვენ წარმატებით გაიარეთ რეგისტრაცია!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });

            }

        } catch (err) {
            setError(err.message)
            console.log("Error: ", err)
        }
    }        




  return (
    
    <div className="pb-20 mt-10 lg:max-w-[500px]">
       

        <form onSubmit={handleSubmit} className="space-y-6 ">
            <div>
            <label htmlFor="first_name" className="block mb-2 text-[14px] font-medium">
                Product name
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            </div>

            <div>
            <div className="flex items-center gap-2 mb-4">
                <label className="text-sm text-gray-600">Categories:</label>
                <select
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
                className="border rounded px-2 py-1 bg-white"
                >
                <option value="">choose categorie</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                    {category.name}
                    </option>
                ))}
                </select>
            </div>
            </div>

            <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Description
            </label>
            <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                
                className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            </div>

            <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Image URL
            </label>
            <textarea
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                
                className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            </div>

            <div>
            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">
                Price
            </label>
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className=" px-2 py-1 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            </div>

            <div>
            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">
                Sale Price
            </label>
            <input
                type="number"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className=" px-2 py-1 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            </div>

            {error && <p className="text-red-600 text-md">{error}</p>}

            <button type="submit" className="w-full lg:w-auto lg:px-10 bg-[#B4D984] rounded-md py-2 font-bold">
                Add
            </button>
        </form>
    </div>
  )
}

export default AddProducts