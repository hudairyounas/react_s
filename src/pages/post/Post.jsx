

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, getPost, updatePost, deletePost } from '../../store/slices/post.slice';
import Model from "../../component/model/Model";
import axios from "axios";


const Post = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [modelIsOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState(null);


    const dispatch = useDispatch();
    const posts = useSelector((store) => store.postSlice.post);
    const loading = useSelector((store) => store.postSlice.isLoading);

    function openModel(post) {
        setPost(post);
        setIsOpen(true);
    }

    const handleSubmit = () => {
        let data = {
            title,
            description,
            image,
            timestamp: new Date().toLocaleDateString(),
        }
        dispatch(addPosts(data));
    };


    const onImageHandler = async (e) => {
        let file = e.target.files[0]
        if (file) {
            try {
                const data = new FormData()
                data.append("file", file)
                data.append("upload_preset", "image-post")
                let res = await axios.post(
                    "https://api.cloudinary.com/v1_1/txcslqnj/image/upload",
                    data,
                );
                const secureUrl = res.data.secure_url;
                setImage(secureUrl);
                console.log(secureUrl)
            } catch (err) {
                console.log(err.message);
            }
        }
    };




    useEffect(() => {
        dispatch(getPost());
    }, []);


    return (
        <>
            <label className='block text-black-100 font-semibold mb-2' htmlFor="title">Title:</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} className='border-2 border-gray-200 px-3 py-2 rounded-md outline-none ' type="text" id="title" placeholder='Enter title' />
            <br />
            <br />
            <label className='block text-black-100 font-semibold mb-2' htmlFor='description'>Description</label>
            <input onChange={(e) => setDescription(e.target.value)} value={description} className='border-2 border-gray-200 px-3 py-2 rounded-md outline-none' type="text" id="description" placeholder='Enter description' />
            <br />
            <br />
            <input type="file" onChange={onImageHandler} />
            {image && <img src={image} alt="post" className="w-24 h-24" />}
            <br />
            <br />
            <button onClick={handleSubmit} className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">submit</button>


            <div>
                {loading ? (
                    <div className="flex justify-center items-center py-6">
                        <span className="visually-hidden font-bold">Loading...</span>
                    </div>
                ) : (
                    posts?.map((post) => (
                        <div key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                            <button onClick={() => dispatch(deletePost(post.id))} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium'>Del</button>
                            <button onClick={() => openModel(post)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium'>update</button>
                        </div>
                    )))}
            </div>
            <Model modelIsOpen={modelIsOpen} setIsOpen={setIsOpen} post={post} />
        </>
    )
}

export default Post;