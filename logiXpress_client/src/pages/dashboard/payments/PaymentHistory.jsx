import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../shared/components/Loading";


const PaymentHistory = () => {
  const { user } = useAuth();
  const Axios = useAxios();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await Axios.get(`/parcels?email=${user?.email}`);
      // return only paid parcels
      return res.data.filter(p => p.delivery_fee_status === "Paid");
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
console.log(parcels);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>

      {parcels.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Parcel</th>
                <th>Cost (€)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((p, idx) => (
                <tr key={p._id}>
                  <td>{idx + 1}</td>
                  <td>{p.title || p.type}</td>
                  <td>{p.delivery_cost}</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td>{p.creation_date_local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
