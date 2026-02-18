import axios from "axios";
import { API_GET_PRODUCTS_FILTERS_URL, API_GET_PRODUCTS_URL } from "./allUrl";
import { promises } from "dns";
import Swal from "sweetalert2";



export default interface ProductInterface {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image: string;
  price: string;
  salePrice: string;
  category_name: string;
}

export interface ProductsFilters {
  page?: string;
  pageSize?: string;
  minPrice?: string;
  maxPrice?: string;
  onlySales?: string;
  search?: string;
  categoryName?: string;
}

export interface GetProductsInterface {
  products: ProductInterface[];
  total: string;
}

export const getAllProducts = async (): Promise<ProductInterface[]> => {
  try {
    const res = await axios.get(API_GET_PRODUCTS_URL)

    return res.data.products
    
  } catch(err) {
    throw new Error("failed")
  }
}



export const getProducts = async (
  filters: ProductsFilters = {}
): Promise<GetProductsInterface> => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([Key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(Key, value);
      }
    });
   
    

    const response = await axios.get(API_GET_PRODUCTS_FILTERS_URL, { params });

    if (response.status === 200) {
      console.log(response.data);
      
      return response.data;
    }
  } catch (err) {
    throw new Error("Failed to get products");
  }
};





export const updateProduct = async (
  productId: string,
  updatedData: Partial<ProductInterface>,
  token: string
): Promise<number> => {
  
  try {
    const response = await axios.put(
      API_GET_PRODUCTS_URL,
      { id: productId, ...updatedData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("ERROR", err);
    
  }
};


export const deleteProductById = async (
  ids: Array<string>,
  token: string
): Promise<number> => {
  console.log(ids);
  
  try {
    const response = await axios.delete(API_GET_PRODUCTS_URL, {
      data: { ids },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      console.log("Deleted successfully, even though 404 returned");
      return 1; 
    }
    if (err.response?.status === 500) {
      Swal.fire({
              title: "Failed",
              text: "Could not deleted. This product is in favorites",
              icon:"warning",
        });
    }
    console.log("ERROR", err.response?.data || err.message);
    throw err;
  }
};


export  interface PostProductInterface {
    title: string;
    description: string;
    image: string;
    price: number;
    salePrice: number;
    category_name: string;
}


export const addProduct = async (
  formData: PostProductInterface,
  token: string
) => {

  
  try {
    const response = await axios.post(
      API_GET_PRODUCTS_URL,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}


export const deleteAllProducts = async (
  token: string
) => {
  try {
    const response = await axios.delete(`${API_GET_PRODUCTS_URL}/delete-all`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data;
  } catch (error) {

    if (error.response?.status === 500) {
      Swal.fire({
              title: "Failed",
              text: "Could not deleted. Some product is in favorites",
              icon:"warning",
      });

    console.log(error);
    
  }
}

}
