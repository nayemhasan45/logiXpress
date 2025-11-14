import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import ParcelForm from "../../shared/components/ParcelForm";
import Loading from "../../shared/components/Loading";

const EditParcel = () => {
  const { id } = useParams();
  const api = useAxios();
  const navigate = useNavigate();
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/parcels/${id}`)
      .then(res => {
        setParcelData(res.data);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch parcel");
        navigate("/dashboard/myParcels");
      })
      .finally(() => setLoading(false));
  }, [id, api, navigate]);

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };

    // Remove immutable fields before sending to backend
    delete payload._id;

    api.patch(`/parcels/${id}`, payload)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myParcels");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update parcel");
      });
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <ToastContainer />
      <h1 className="text-xl md:text-4xl text-secondary font-bold mb-6">Edit Parcel</h1>
      <ParcelForm defaultValues={parcelData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditParcel;
