import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase.config';

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);


    // create user ------------------------------
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    //login user ----------------------------------------
    const signInUser =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // get current user --------------------------------
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(initialUser)=>{
            if(initialUser){
                setUser(initialUser);
                setLoading(false);
            }
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    // logout user --------------------------------
    const signOutUser=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const authInfo={
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;