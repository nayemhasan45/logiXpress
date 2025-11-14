import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import ParcelForm from "../../shared/components/ParcelForm";


const CreateParcel = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const now = new Date();
    const payload = {
      ...data,
      creation_date: now.toISOString(),
      creation_date_local: now.toLocaleDateString(),
      creation_time_local: now.toLocaleTimeString(),
      lastUpdated: now.toISOString(),
      delivery_fee_status: "Pending",
      delivery_cost: data.delivery_cost || 0,
    };

    api.post("/parcels", payload)
      .then(() => {
        toast.success("Parcel created successfully!");
        navigate("/dashboard/myParcels");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to create parcel");
      });
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <ToastContainer />
      <h1 className="text-xl md:text-4xl text-secondary font-bold mb-6">Send New Parcel</h1>
      <ParcelForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateParcel;
