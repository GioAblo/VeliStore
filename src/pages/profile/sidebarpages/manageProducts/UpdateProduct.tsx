import { Button } from "@/components/ui/button";
import ProductInterface, { deleteAllProducts, deleteProductById, getAllProducts, updateProduct } from "@/services/api/product";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [updatedData, setUpdatedData] = useState< Partial<ProductInterface>>({
    image: ''
  });
  const token = useSelector((state: RootState) => state.auth.token);
  const [loadingId, setLoadingId] = useState<string | null>(null);

 
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdatedData((prev) => ({
      ...prev,
      [name]: value
    }));
  };




  const handleSubmit = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();

    setLoadingId(productId)
    
    try {
      
      const updated = await updateProduct(productId, updatedData, token);

      if (updated) {
        Swal.fire({
          title: "Updated!",
          text: "Product updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error("Error updating product:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to update product",
        icon: "error",
      });
    } finally{
      setLoadingId(null)
    }
  };


  const deleteProduct = async(ids: string) => {
    try {
      const response = await deleteProductById([ids], token)

      if (response) {
        Swal.fire({
          title: "Deleted !",
          text: "Products deleted successfully!",
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
      const response = await deleteAllProducts(token)

      if (response) {
        Swal.fire({
          title: "Deleted !",
          text: "Products deleted successfully!",
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
    <div className="mt-6 lg:max-w-[500px]">
      <button className="mb-4 bg-slate-200 px-3 text-[15px] rounded mt-2 py-1" onClick={() => deleteAll()} >Delete all product</button>
      {products.map((product) => (
        <div className="flex flex-col pb-4 mt-5" key={product.id}>

            <form
              onSubmit={(e) => handleSubmit(e, product.id)}
              className="flex  flex-col mt-5"
            >
              <img className="w-[76px] h-[76px]" src={product.image} alt="img" />

              <div className="flex text-[13px] mt-2 flex-col gap-2">

                <div className="flex flex-col text-[15px]">
                  <label className="font-medium">Title</label>
                  <input

                    name="title"
                    defaultValue={product.title}
                    onChange={handleChange}
                    className=" border rounded md:px-2"
                  />
                </div>

                <div className="flex flex-col text-[15px]">
                  <label>Description</label>
                  <input
                    name="description"
                    defaultValue={product.description}
                    onChange={handleChange}
                    className=" border rounded md:px-2"
                  />
                </div>

                <div className="flex flex-col text-[15px]">
                  <label>Image URL</label>
                  <textarea
                    name="image"
                    defaultValue=''
                    onChange={handleChange}
                    className="border rounded md:px-2"
                  />
                </div>
              </div>

              <button type="submit" className="px-3 text-[15px] md:w-auto md:px-3 md:py-2 py-1 mt-4 bg-[#B4D984] text-black rounded">
                {loadingId === product.id ? "Updating..." : "Update"}
              </button>
            </form>
          <div>
            <button className="bg-slate-200 w-full md:w-auto md:px-3 md:py-2 text-[15px] rounded mt-2 py-1" onClick={()=> deleteProduct(product.id)}>Delete product</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateProduct;
