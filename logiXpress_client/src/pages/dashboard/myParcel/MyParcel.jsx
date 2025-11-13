import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios"; // your custom hook
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrash, FaEye, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../shared/components/Loading";

const MyParcel = () => {
  const { user } = useAuth();
  const Axios = useAxios(); // use your custom hook

  // Fetch parcels
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await Axios.get(`/parcels?userEmail=${user?.email}`);
      return res.data.sort(
        (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
      );
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your parcel order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await Axios.delete(`/parcels/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your parcel order has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete the parcel.", "error");
      }
    }
  };

  const handleEdit = (id) => {
    alert(`Edit parcel with ID: ${id}`);
  };

  const handlePayment = (id) => {
    alert(`Proceed to payment for parcel ID: ${id}`);
  };

  const handleViewDetails = (id) => {
    alert(`Viewing details for parcel ID: ${id}`);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 My Parcels</h2>

      {/* Desktop Table */}
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
                  <span
                    className={`badge ${
                      parcel.delivery_fee_status === "Pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {parcel.delivery_fee_status}
                  </span>
                </td>
                <td>{parcel.creation_time_local}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-xs btn-accent"
                    onClick={() => handlePayment(parcel._id)}
                  >
                    <FaCreditCard />
                  </button>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleViewDetails(parcel._id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleEdit(parcel._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="card bg-base-200 shadow-md p-4 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">
                  {parcel.type === "document"
                    ? "📄 Document"
                    : "📦 Non-Document"}
                </h3>
                <p className="text-sm text-gray-500">
                  {parcel.creation_time_local}
                </p>
              </div>
              <span
                className={`badge ${
                  parcel.delivery_fee_status === "Pending"
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {parcel.delivery_fee_status}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-semibold">{parcel.delivery_cost} €</p>

              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-accent"
                  onClick={() => handlePayment(parcel._id)}
                >
                  <FaCreditCard />
                </button>
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => handleEdit(parcel._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(parcel._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParcel;
