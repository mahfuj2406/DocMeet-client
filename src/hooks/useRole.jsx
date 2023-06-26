import { useEffect, useState } from "react";
import useAuth from "./useAuth";


const useRole = () => {
    const [user, loading] = useAuth();
    const [role, setRole] = useState("");
    useEffect(()=>{
        fetch(`http://localhost:5000/users/role/${user.email}`)
        .then(res =>res.json())
        .then(data =>console.log("role data:",data))
    },[])
    return ;
};

export default useRole;