import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrash, FaEye, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../shared/components/Loading";
import { useNavigate } from 'react-router';


const MyParcel = () => {
  const { user } = useAuth();
  const Axios = useAxios();
  const navigate = useNavigate();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await Axios.get(`/parcels?email=${user?.email}`);
      return res.data.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await Axios.delete(`/parcels/${id}`);
        refetch();
        Swal.fire("Deleted!", "Parcel removed successfully.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete parcel.", "error");
      }
    }
  };

  const handleEdit = (id) => navigate(`/dashboard/editParcel/${id}`);
  const handlePayment = (id) => navigate(`/payment/${id}`);


  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 My Parcels</h2>
      <div className="overflow-x-auto hidden md:block">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Type</th>
              <th>Sender Center</th>
              <th>Receiver Center</th>
              <th>Cost (€)</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td>{parcel.type === "document" ? "📄 Document" : "📦 Non-Document"}</td>
                <td>{parcel.senderServiceCenter}</td>
                <td>{parcel.receiverServiceCenter}</td>
                <td>{parcel.delivery_cost}</td>
                <td>
                  <span className={`badge ${parcel.delivery_fee_status === "Pending" ? "badge-warning" : "badge-success"}`}>
                    {parcel.delivery_fee_status}
                  </span>
                </td>
                <td>{parcel.creation_time_local}</td>
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-xs btn-accent" onClick={() => handlePayment(parcel._id)}><FaCreditCard /></button>
                  
                  <button className="btn btn-xs btn-warning" onClick={() => handleEdit(parcel._id)}><FaEdit /></button>
                  <button className="btn btn-xs btn-error" onClick={() => handleDelete(parcel._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {parcels.map(parcel => (
          <div key={parcel._id} className="card bg-base-200 shadow-md p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{parcel.type === "document" ? "📄 Document" : "📦 Non-Document"}</h3>
                <p className="text-sm text-gray-500">{parcel.creation_time_local}</p>
              </div>
              <span className={`badge ${parcel.delivery_fee_status === "Pending" ? "badge-warning" : "badge-success"}`}>
                {parcel.delivery_fee_status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-semibold">{parcel.delivery_cost} €</p>
              <div className="flex gap-2">
                <button className="btn btn-xs btn-accent" onClick={() => handlePayment(parcel._id)}><FaCreditCard /></button>
                <button className="btn btn-xs btn-warning" onClick={() => handleEdit(parcel._id)}><FaEdit /></button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(parcel._id)}><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParcel;
