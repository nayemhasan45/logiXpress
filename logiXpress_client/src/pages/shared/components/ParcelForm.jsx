// src/components/ParcelForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend, FiPackage, FiUser, FiDollarSign } from "react-icons/fi";
import warehouseData from "../../../assets/data/warehouses.json";

const ParcelForm = ({ defaultValues = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const [cost, setCost] = useState(0);

  const type = watch("type");
  const weight = watch("weight");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Regions & service centers
  const regions = [...new Set(warehouseData.map(item => item.region))];
  const senderServiceCenters = warehouseData
    .filter(item => item.region === senderRegion)
    .flatMap(item => item.covered_area);
  const receiverServiceCenters = warehouseData
    .filter(item => item.region === receiverRegion)
    .flatMap(item => item.covered_area);

  // Cost calculation
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

  // Live cost update
  useEffect(() => {
    setCost(calculateCost({ type, weight, senderRegion, receiverRegion }));
  }, [type, weight, senderRegion, receiverRegion]);

  // Reset form when defaultValues change (for edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [JSON.stringify(defaultValues), reset]);

  return (
    <form onSubmit={handleSubmit(formData => onSubmit({ ...formData, delivery_cost: cost }))} className="space-y-6 sm:space-y-10">
      {/* Parcel Info */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiPackage /> Parcel Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register("type", { required: true })} />
                Document
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="non-document" {...register("type", { required: true })} />
                Non-Document
              </label>
            </div>
            {errors.type && <span className="text-red-500 text-sm">Type required</span>}
          </div>
          <div>
            <label className="block mb-2">Title</label>
            <input {...register("title", { required: true })} placeholder="Add Title" className="w-full border rounded p-2" />
            {errors.title && <span className="text-red-500 text-sm">Title required</span>}
          </div>
          {type === "non-document" && (
            <div>
              <label className="block mb-2">Weight (kg)</label>
              <input type="number" step="0.1" {...register("weight")} className="w-full border rounded p-2" />
            </div>
          )}
        </div>
      </section>

      {/* Sender Info */}
      <section className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiUser /> Sender Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register("senderName", { required: true })} placeholder="Sender Name" className="border rounded p-2" />
            <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="border rounded p-2" />
            <select {...register("senderRegion", { required: true })} className="border rounded p-2">
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
            <select {...register("senderServiceCenter", { required: true })} className="border rounded p-2" disabled={!senderRegion}>
              <option value="">Select Service Center</option>
              {senderServiceCenters.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            <input {...register("senderAddress", { required: true })} placeholder="Sender Address" className="border rounded p-2 sm:col-span-2" />
            <textarea {...register("pickupInstruction", { required: true })} placeholder="Pickup Instruction" rows={3} className="border rounded p-2 sm:col-span-2" />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiUser /> Receiver Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="border rounded p-2" />
            <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="border rounded p-2" />
            <select {...register("receiverRegion", { required: true })} className="border rounded p-2">
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>
            <select {...register("receiverServiceCenter", { required: true })} className="border rounded p-2" disabled={!receiverRegion}>
              <option value="">Select Service Center</option>
              {receiverServiceCenters.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            <input {...register("receiverAddress", { required: true })} placeholder="Receiver Address" className="border rounded p-2 sm:col-span-2" />
            <textarea {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" rows={3} className="border rounded p-2 sm:col-span-2" />
          </div>
        </div>
      </section>

      {/* Cost & Submit */}
      <div className="text-center mt-6 flex items-center justify-center gap-2 text-lg font-semibold">
        <FiDollarSign /> Estimated Cost: {cost} BDT
      </div>

      <div className="w-2/3 mx-auto mt-4">
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-3 rounded-lg flex items-center justify-center gap-2">
          <FiSend /> Submit
        </button>
      </div>
    </form>
  );
};

export default ParcelForm;
