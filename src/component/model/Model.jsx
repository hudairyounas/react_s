import React, { useEffect, useState } from "react";
import { updatePost } from "../../store/slices/post.slice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customsStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    width: "600px",
    maxWidth: "95vw",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

const Model = ({ modelIsOpen, setIsOpen, post }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
    }
  }, [post]);

  const handleSubmit = () => {
    let data = {
      ...post,
      title,
      description,
      timestamp: new Date().toLocaleDateString(),
    };
    dispatch(updatePost(data));
    closeModel();
  };

  const closeModel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modelIsOpen}
      onAfterOpen={afterOpenModel}
      onRequestClose={closeModel}
      style={customsStyles}
      contentLabel="Example Model"
    >
      <h2 className="text-xl font-bold mb-4 text-black-500">Update Post</h2>
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded-md outline-none w-full"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded-md outline-none w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Update
        </button>
      </div>
    </Modal>
  );
};

export default Model;
