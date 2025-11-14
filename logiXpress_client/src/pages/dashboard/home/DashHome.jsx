import React from 'react';
import useAuth from '../../../hooks/useAuth';

const DashHome = () => {
    const {user}=useAuth();
    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
                {/* User Info */}
                <div className="flex flex-col items-center gap-4">
                    {/* User Photo */}
                    {user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || "User Photo"}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                            No Photo
                        </div>
                    )}

                    {/* User Name */}
                    <h2 className="text-xl font-semibold">
                        {user.displayName || "Anonymous User"}
                    </h2>

                    {/* Email */}
                    <p className="text-gray-600">{user.email}</p>

                    {/* Email Verified */}
                    <p className="text-sm text-green-500">
                        {user.emailVerified ? "Email Verified ✅" : "Email Not Verified ❌"}
                    </p>

                    {/* UID or other info */}
                    <p className="text-gray-500 text-xs">User ID: {user.uid}</p>
                </div>

                {/* Message About Website */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl  text-secondary">
                    <h3 className="text-lg md:text-3xl font-medium md:font-bold mb-2">Welcome to LogiXpress!</h3>
                    <p>
                        We are committed to providing a smooth, intuitive, and secure
                        platform for managing your parcels and tracking your deliveries.
                        Explore our features and enjoy seamless parcel management at your
                        fingertips.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashHome;