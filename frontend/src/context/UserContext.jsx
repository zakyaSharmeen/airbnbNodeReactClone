// import React, { createContext, useContext, useEffect, useState } from "react";
// import { authDataContext } from "./AuthContext";
// import axios from "axios";export const userDataContext = createContext();
// function UserContext({ children }) {
//     let {serverUrl} = useContext(authDataContext);
//     let[userData, setUserData] = useState(null);
//     let value = {}

//     const getCurrentUser= async()=>{
//         try{
//             let result = await axios.get(`${serverUrl}/api/user/get-current-user`,
//                 {
//                     withCredentials:true
//                 }
//             )
//             setUserData(result.data);
//         }
//         catch(err){
//             setUserData(null);
//             console.log(err);
//         }}
//         useEffect(()=>{
//             getCurrentUser();
//         },[])

//         let value = {
//             userData,
//                 setUserData
//         }
//     }

//    (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   );
// }

// export default UserContext;
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (err) {
      setUserData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
