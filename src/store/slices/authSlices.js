import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../config/firebase';

// 1. Signup Thunk (Sari input fields ka data save karne ke liye)
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, phoneNumber, address, city }, thunkAPI) => {
        try {
            // Step A: Firebase Auth mein user create karen
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step B: Firestore mein extra details store karen (Phone, Address, City)
            const userData = {
                uid: user.uid,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                createdAt: new Date().toISOString()
            };

            // "users" collection mein user.uid ko document ID bana kar save karen
            await setDoc(doc(db, "users", user.uid), userData);

            return userData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// 2. Login Thunk (Auth verify karke Firestore se data lane ke liye)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            // Firebase Auth se check karen
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Database (Firestore) se us user ka saara details (Address, Phone, etc.) uthain
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return thunkAPI.rejectWithValue("User profile data not found in database!");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearAuthMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup Lifecycles
            .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.successMessage = "Account created and data saved successfully!"; })
            .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Login Lifecycles
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.isAuthenticated = true; state.error = null; state.successMessage = "Logged in successfully!"; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    }
});

export const { clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;


{/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const register = createAsyncThunk("auth/register", async ({ email, password }) => {
    createUserWithEmailAndPassword(authSlice, email, password)
        .then((userCrendential) => {
            const user = userCrendential.user;
            return user;
        })
        .catch((error) => {
            return error;
        });
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,

    }, extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
    }

})
export default authSlice.reducer;*/}
