import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, use } from "react";
import { createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}



export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isloading, setIsLoading] = useState(false)


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout() {
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }
    const value = { globalUser, globalData, setGlobalData, isloading, signup, login, logout }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("User state changed", user)
            setGlobalUser(user)
            if (!user) {
                console.log("No active user")
                return
            }


            try {
                setIsLoading(true)
                // reference has been created for the document
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                    console.log("Found User Data", firebaseData);
                }
                setGlobalData(firebaseData)
                console.log("User Data", firebaseData)
                console.log("User Data", globalData)
            } catch (error) {
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }

        })
        return unsubscribe;
    }, [])



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 