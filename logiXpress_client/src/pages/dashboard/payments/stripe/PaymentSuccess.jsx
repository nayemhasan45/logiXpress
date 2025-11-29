import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const Axios = useAxios();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) return;

    Axios.post("/payments/confirm", { session_id })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment has been confirmed",
            showConfirmButton: false,
            timer: 1500
          });
          // Redirect after a short delay
          setTimeout(() => {
            navigate("/dashboard/myParcels");
          }, 1500);
        }
      })
      .catch((err) => {
        console.error("Payment confirm error:", err);
      });
  }, [searchParams, Axios, navigate]);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg">Your parcel payment has been processed.</p>

      <p className="text-sm text-gray-500 mt-4">
        Redirecting to your parcels...
      </p>
    </div>
  );
};

export default PaymentSuccess;
