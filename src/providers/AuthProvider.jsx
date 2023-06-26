import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfileName =(name)=>{
        return updateProfile(auth.currentUser, {displayName: name});
    }
    const updateUserProfilePhoto =(photo)=>{
        return updateProfile(auth.currentUser, {photoURL: photo});
    }
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log("Auth state changed. current User is : ", currentUser);

            // get and set Token using jwt 

            // if(currentUser){
            //     axios.post('https://global-speak-server-mahfuj2406.vercel.app/jwt',{email: currentUser.email})
            //     .then(data =>{
            //         // console.log(data.data)
            //         localStorage.setItem('access-token', data.data.token) 
            //     })
            // }
            // else{
            //     localStorage.removeItem('access-token')
            // }
            setLoading(false);
        });
        return ()=>{
            return unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        logIn, 
        updateUserProfileName,
        updateUserProfilePhoto,
        googleLogIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;