import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSend, FiPackage, FiUser, FiDollarSign } from "react-icons/fi";
import warehouseData from "../../assets/data/warehouses.json";
import { v4 as uuidv4 } from 'uuid';
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";


const SendParcel = () => {
  const { user } = useAuth();
  const apiCall = useAxios();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [cost, setCost] = useState(0);

  const type = watch("type");
  const weight = watch("weight");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Unique regions
  const regions = [...new Set(warehouseData.map(item => item.region))];

  // Dynamic service centers based on region
  const senderServiceCenters = warehouseData
    .filter(item => item.region === senderRegion)
    .flatMap(item => item.covered_area);

  const receiverServiceCenters = warehouseData
    .filter(item => item.region === receiverRegion)
    .flatMap(item => item.covered_area);

  // Pricing calculation based on your policy
  const calculateCost = ({ type, weight, senderRegion, receiverRegion }) => {
    let base = 0;
    const withinCity = senderRegion === receiverRegion;
    const w = parseFloat(weight) || 0;

    if (type === "document") {
      base = withinCity ? 60 : 80;
    } else if (type === "non-document") {
      if (w <= 3) {
        base = withinCity ? 110 : 150;
      } else {
        const extraWeight = w - 3;
        base = withinCity
          ? 110 + extraWeight * 40
          : 150 + extraWeight * 40 + 40;
      }
    }

    return base;
  };

  // Calculate cost live
  useEffect(() => {
    setCost(calculateCost({ type, weight, senderRegion, receiverRegion }));
  }, [type, weight, senderRegion, receiverRegion]);

  const onSubmit = (data) => {
    // Generate tracking number
    const trackingNumber = uuidv4();

    // Calculate pricing breakdown
    const breakdown = [];
    const w = parseFloat(weight) || 0;
    const withinCity = senderRegion === receiverRegion;
    if (type === "document") {
      breakdown.push({
        label: "Document Parcel",
        amount: withinCity ? 60 : 80
      });
    } else if (type === "non-document") {
      if (w <= 3) {
        breakdown.push({
          label: `Non-Document up to 3kg`,
          amount: withinCity ? 110 : 150
        });
      } else {
        const extraWeight = w - 3;
        const base = withinCity ? 110 : 150;
        const extra = withinCity ? extraWeight * 40 : extraWeight * 40 + 40;
        breakdown.push({ label: "Base Price", amount: base });
        breakdown.push({ label: "Extra Weight", amount: extra });
      }
    }

    // Show toast with breakdown and proceed to payment
    toast.info(
      <div className="p-2">
        <h3 className="font-bold text-lg mb-2">Confirm Parcel Submission</h3>
        <p className="mb-2 font-semibold">Pricing Breakdown:</p>
        <ul className="mb-3">
          {breakdown.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.label}</span>
              <span>{item.amount} BDT</span>
            </li>
          ))}
        </ul>
        <p className="mb-3 font-bold">Total: <span className="text-blue-600">{cost} BDT</span></p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              handleConfirm(data, trackingNumber);
              toast.dismiss();
            }}
            className="flex-1 bg-primary text-secondary py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition text-sm flex items-center justify-center gap-1"
          >
            <FiSend /> Proceed to Payment
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const handleConfirm = (data, trackingNumber) => {
    const now = new Date();
    const parcelData = {
      ...data,
      userId: user?.id || "guest",
      userEmail: user?.email || "guest@example.com",
      trackingNumber,
      creation_date: now.toISOString(),
      creation_date_local: now.toLocaleDateString(),
      creation_time_local: now.toLocaleTimeString(),
      delivery_fee_status: "Pending",
      lastUpdated: now.toISOString(),
      history: [
        {
          status: "Pending",
          timestamp: now.toISOString(),
        },
      ],
      delivery_cost: cost,
    };

    apiCall.post('/parcels', parcelData)
      .then(res => {
        if (res.data.parcelId) {
          toast.success("Parcel submitted successfully!", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      })
      .catch(err=>{
        console.log(err);
      })

    reset();

  };

  return (
    <div className="max-w-11/12 mx-auto flex flex-col items-center justify-center py-10 px-4">
      <ToastContainer />
      <div className="w-full bg-white p-4 sm:p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl md:text-4xl text-secondary font-bold mb-2 text-center">
          Add Parcel
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Fill out the form below to send a new parcel order.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-10">
          {/* Parcel Info */}
          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-secondary flex items-center gap-2">
              <FiPackage /> Parcel Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block mb-2 font-medium text-sm sm:text-base">Type</label>
                <div className="flex items-center gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                    <input
                      type="radio"
                      value="document"
                      {...register("type", { required: true })}
                      className="w-4 h-4 sm:w-5 sm:h-5 accent-secondary focus:accent-primary transition"
                    />
                    Document
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                    <input
                      type="radio"
                      value="non-document"
                      {...register("type", { required: true })}
                      className="w-4 h-4 sm:w-5 sm:h-5 accent-secondary focus:accent-primary transition"
                    />
                    Non-Document
                  </label>
                </div>
                {errors.type && (
                  <span className="text-red-500 text-xs sm:text-sm mt-1 block">
                    Parcel type is required
                  </span>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block mb-1 font-medium text-sm sm:text-base">Title</label>
                <input
                  {...register("title", { required: true })}
                  placeholder="Parcel title"
                  className="w-full border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs sm:text-sm mt-1 block">Title is required</span>
                )}
              </div>

              {/* Weight */}
              {type === "non-document" && (
                <div>
                  <label className="block mb-1 font-medium text-sm sm:text-base">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("weight")}
                    placeholder="e.g. 2.5"
                    className="w-full border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Sender & Receiver Info */}
          <section className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Sender */}
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-secondary flex items-center gap-2">
                <FiUser /> Sender Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input {...register("senderName", { required: true })} placeholder="Sender Name" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base" />
                <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base" />
                <select {...register("senderRegion", { required: true })} className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base">
                  <option value="">Select Region</option>
                  {regions.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
                </select>
                <select
                  {...register("senderServiceCenter", { required: true })}
                  className={`border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base ${!senderRegion ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                  disabled={!senderRegion}
                >
                  <option value="">Select Service Center</option>
                  {senderServiceCenters.map((center, idx) => <option key={idx} value={center}>{center}</option>)}
                </select>
                <input {...register("senderAddress", { required: true })} placeholder="Sender Address" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition sm:col-span-2 text-sm sm:text-base" />
                <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" rows={3} className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition sm:col-span-2 resize-none text-sm sm:text-base" />
              </div>
            </div>

            {/* Receiver */}
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-secondary flex items-center gap-2">
                <FiUser /> Receiver Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base" />
                <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base" />
                <select {...register("receiverRegion", { required: true })} className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base">
                  <option value="">Select Region</option>
                  {regions.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
                </select>
                <select
                  {...register("receiverServiceCenter", { required: true })}
                  className={`border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition text-sm sm:text-base ${!receiverRegion ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                  disabled={!receiverRegion}
                >
                  <option value="">Select Service Center</option>
                  {receiverServiceCenters.map((center, idx) => <option key={idx} value={center}>{center}</option>)}
                </select>
                <input {...register("receiverAddress", { required: true })} placeholder="Receiver Address" className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition sm:col-span-2 text-sm sm:text-base" />
                <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" rows={3} className="border border-secondary focus:border-primary focus:ring-1 focus:ring-primary rounded-lg p-2 outline-none transition sm:col-span-2 resize-none text-sm sm:text-base" />
              </div>
            </div>
          </section>

          {/* Cost */}
          <div className="text-center mt-6 flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold text-secondary">
            <FiDollarSign /> Estimated Cost: {cost ? `${cost} BDT` : "-"}
          </div>

          {/* Submit Button */}
          <div className="w-2/3 mx-auto">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-secondary border-secondary py-3 rounded-lg font-semibold transition-all duration-300 group"
            >
              <FiSend className="transform transition-transform duration-300 group-hover:translate-x-2 active:translate-x-3" />
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
