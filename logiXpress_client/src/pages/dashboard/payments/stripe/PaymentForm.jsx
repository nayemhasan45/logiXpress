import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Loading from "../../../shared/components/Loading";
import { useParams } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState("");
    const { parcelId } = useParams();
    const api = useAxios();


    // loading parcel data form db-------------------
    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ["parcel", parcelId],
        queryFn: async () => {
            const res = await api.get(`/parcels/${parcelId}`);
            return res.data;
        },
        enabled: !!parcelId,
    });

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading parcel</p>;


    // handle submit for card from ------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        if (!stripe || !elements) return;

        setLoading(true);
        setCardError("");

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        setLoading(false);

        if (error) {
            setCardError(error.message);
        } else {
            setCardError("");
            console.log(paymentMethod);
        }
    };
    console.log(parcel);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">

            {/* Parcel Summary */}
            <div className="bg-gray-50 border p-3 rounded-lg mb-5">
                <p className="font-semibold text-gray-700">Parcel ID: {parcel?._id}</p>
                <p className="text-gray-600">Price: ${parcel?.delivery_cost}</p>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Complete Your Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Card Input Box */}
                <div className="p-4 border border-gray-300 rounded-xl bg-gray-50">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#e63946",
                                },
                            },
                        }}
                    />
                </div>

                {/* Card Error */}
                {cardError && (
                    <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-300 p-2 rounded-lg">
                        {cardError}
                    </p>
                )}

                {/* Pay Button */}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-3 text-white font-semibold rounded-xl transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
                >
                    {loading ? "Processing..." : "Pay for Parcel"}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
