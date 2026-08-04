
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../config/firebase";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {

//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             console.log("Login Successful:", userCredential.user);

//             alert("Login Successful!");
//             navigate("/home");
//         } catch (error) {
//             console.error("Login error:", error.message);
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
//                 <div>
//                     <h2 className="text-center text-3xl font-extrabold text-gray-900">
//                         Login your account
//                     </h2>
//                     <p className="mt-2 text-center text-sm text-gray-600">
//                         Please fill in the details below to login
//                     </p>
//                 </div>

//                 <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>
//                     <div className="pt-2">
//                         <button
//                             type="submit"
//                             className="w-full flex justify-centre  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;