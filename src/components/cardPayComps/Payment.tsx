
import { paySchema } from "../cardPayComps/schema";
import { useFormik } from "formik";
import { formatCardNumber, formatExpiryDate } from "../cardPayComps/formating";
import { Button } from "../ui/button";
import { purchase } from "@/services/api/purchases";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Payment = ({amount, totalItem}) => {

  const [data, setData] = useState({
    totalPrice: amount,
    totalItems: totalItem
  })
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  
  const Pay = async() => {
    try {
      const res = await purchase(data, token)

      if (res.status === 201) {
        setTimeout(() => {
          navigate('/')
        }, 2600)
      }
      Swal.fire({
        title: "გილოცავთ!",
        text: " გადახდა წარმატებით შესრულლდა",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true        
      })
      return res
    } catch (error) {
      Swal.fire({
        title: "ვწუხვარ!",
        text: " გადახდა გადახდა ვერ მოხერხდა",
        icon: "error",
        showConfirmButton: false,
        timer: 2800,
        timerProgressBar: true        
      })

      console.log(error);
      
    }
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: paySchema,
    onSubmit: async (values) => {
      Pay()
      console.log("Processing payment...", values);
    },
  });


  
  



  return (
    <>
        
        <div>
          
          <div className="border mb-3 rounded-lg flex justify-between w-full items-center px-4 py-3">
            <div className="text-[#81818d] text-[14px]">Amount:</div>
            <div className="text-14px">{amount} <span className="text-[#81818d]">USD</span></div>
          </div>
          
          <div className="px-4 pt-5 pb-7  rounded-lg border">
            <div className="text-[14px] text-[#191e50] font-bold">Pay with card</div>
            <form className="mt-5" onSubmit={formik.handleSubmit}>
              <div >
                
                <div className="w-full rounded-lg border relative" >
                  <div >
                    <label className="absolute text-[12px] text-[#73737f] font-bold left-4 top-2" htmlFor="card number">Card number</label>
                    <input
                      className="focus:ring-0 w-full text-[13px] outline-none pt-[25px] pl-4 pb-2 rounded-lg "
                      id="cardNumber"
                      name="cardNumber"
                      value={formatCardNumber(formik.values.cardNumber)}
                      onChange={(e) => {
                        e.target.value = formatCardNumber(e.target.value);
                        formik.handleChange(e);
                      }}
                      
                      maxLength={19}
                    />
                     {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.cardNumber}
                      </span>
                     )}
                  </div>
                </div>

                <div className="flex mt-3 gap-2">
                    
                  <div className="w-full rounded-lg border relative">
                    <div>
                      <label className="absolute text-[12px] text-[#73737f] font-bold left-4 top-2" htmlFor="expiryDate">Expiry date</label>
        
                      <input
                        className="focus:ring-0 text-[13px] outline-none pt-[25px] pl-4 pb-2 rounded-lg "
                        id="expiryDate"
                        name="expiryDate"
                        value={formik.values.expiryDate}
                        onChange={(e) => {
                          e.target.value = formatExpiryDate(e.target.value);
                          formik.handleChange(e);
                        }}
                        
                        
                      />
                      
                      {formik.touched.expiryDate && formik.errors.expiryDate && (
                        <p className="text-red-500 text-sm">{formik.errors.expiryDate}</p>
                      )}
                      </div>
                  </div>


                  <div className="w-full rounded-lg border relative">
                      <div>
                        <label className="absolute text-[12px] text-[#73737f] font-bold left-4 top-2" htmlFor="card number">CVV / CVC</label>  
                        <input
                          className="focus:ring-0 text-[13px] outline-none pt-[25px] pl-4 pb-2 rounded-lg "
                          id="cvv"
                          name="cvv"
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          maxLength={4}
                      
                          />
                        {formik.touched.cvv && formik.errors.cvv && (
                          <p className="text-red-500 text-sm">{formik.errors.cvv}</p>
                        )}
                      </div>
                  </div>
                </div> 

              </div>
              
              <Button className="w-full text-[14px] font-bold py-7 bg-black rounded-lg mt-5" type="submit">Pay</Button>
              
            </form>
          </div>
        </div>
    
    </>
  );
};

export default Payment;
