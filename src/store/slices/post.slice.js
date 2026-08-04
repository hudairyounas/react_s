
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";

const addPosts = createAsyncThunk("post/addPosts", async (postData) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), postData);
        return { id: docRef.id, ...postData };
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

const getPost = createAsyncThunk("posts/getPost", async () => {
    try {
        const querySnap = await getDocs(collection(db, "posts"));
        return querySnap.docs.map((post) => ({ id: post.id, ...post.data() }));
    } catch (err) {
        console.log(err.message)
    }
})
const updatePost = createAsyncThunk("post/updatePost", async (postData) => {
    try {
        const postRef = doc(db, "posts", postData.id);
        await updateDoc(postRef, {
            title: postData.title,
            description: postData.description,
        });
        return postData;
    } catch (e) {
        console.error("Error updating document: ", e);
    }
})
const deletePost = createAsyncThunk("post/deletePost", async (postID) => {
    try {
        await deleteDoc(doc(db, "posts", postID));
        return postID;
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
})



const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        isLoading: false,
        error: "",
    },

    extraReducers: (builder) => {
        builder
            .addCase(addPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = [action.payload, ...state.post];
            })
            .addCase(addPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = state.post.map((post) => post.id === action.payload.id ? action.payload : post);
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = state.post.filter((post) => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
});

export { addPosts, getPost, updatePost, deletePost };
export default postSlice.reducer;