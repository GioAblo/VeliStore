import axios from "axios";
import { API_GET_CATEGORY_URL } from "./allUrl";
import Swal from "sweetalert2";

export interface CategoryInterface {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}

export const getCategories = async (): Promise<CategoryInterface[]> => {
  try {
    const respone = await axios.get(API_GET_CATEGORY_URL);
    const result = await respone.data.map((item: CategoryInterface) => item.name)
    
    
    return result
  } catch (err) {
    throw new Error("Failed to get categories");
  }
};

export const getAllCategories = async (): Promise<CategoryInterface[]> => {
  try {
    const respone = await axios.get(API_GET_CATEGORY_URL);
    const result = await respone.data
    
    
    return result
  } catch (err) {
    throw new Error("Failed to get categories");
  }
};


export const addCategory = async (
  formData: Partial<CategoryInterface>, 
  token: string
) => {
  try {
    const respone = await axios.post(API_GET_CATEGORY_URL,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    
    
    return respone
  } catch (err) {
    throw new err
    
  }
};


export const deleteCategoryById = async (
  ids: string, 
  token: string
) => {
  try {
    const respone = await axios.delete(`${API_GET_CATEGORY_URL}/${ids}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    
    return respone
  } catch (err) {
    
     if (err.status == 500) {
            Swal.fire({
              title: "Can not Delete !",
              text: "This category can't deleted cause you made product with that category!",
              icon: "warning",
              showConfirmButton: true,
              
            })
          }
  }
};



export const deleteAllCategory = async (
  token: string
) => {
  try {
    const respone = await axios.delete(`${API_GET_CATEGORY_URL}/delete-all`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    
    return respone
  } catch (err) {
    if (err.status == 500) {
            Swal.fire({
              title: "Can not Delete !",
              text: "Some category can't deleted cause you made product with that categories!",
              icon: "warning",
              showConfirmButton: true,
              
            })
          }
  }
};


