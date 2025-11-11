import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);


    // create user ------------------------------
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    // create user with googel 
    const createUserGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    //login user ----------------------------------------
    const signInUser =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // get current user --------------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (initialUser) => {
            // set user whether there's a user or null (signed out)
            setUser(initialUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // logout user --------------------------------
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    const authInfo={
        user,
        loading,
        createUser,
        createUserGoogle,
        signInUser,
        signOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;