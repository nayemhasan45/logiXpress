import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import ParcelForm from "../../shared/components/ParcelForm";

const CreateParcel = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (data) => {
    // Send only necessary fields.
    // Backend will auto-generate:
    // trackingNumber, dates, history, status, delivery_fee_status, etc.

    const payload = {
      ...data,
      userEmail: user?.email,
      userId: user?.uid || "guest",
    };

    api.post("/parcels", payload)
      .then(() => {
        toast.success("Parcel created successfully!");
        navigate("/dashboard/myParcels");
      })
      .catch(err => {
        console.error("Create parcel error:", err);
        toast.error("Failed to create parcel");
      });
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <ToastContainer />
      <h1 className="text-xl md:text-4xl text-secondary font-bold mb-6">
        Send New Parcel
      </h1>

      <ParcelForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateParcel;
