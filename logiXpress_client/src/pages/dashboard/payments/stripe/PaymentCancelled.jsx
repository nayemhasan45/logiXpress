import React from 'react';

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
                Payment Cancelled
            </h1>
            <p className="text-lg">Your payment was cancelled.</p>
        </div>

    );
};

export default PaymentCancelled;