import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdPriceCheck,
} from "react-icons/md";
import { category } from "../utils/data";
import Loader from "./loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getitem, saveItem } from "../utils/fireBaseFunction";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";

const CreateItem = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [item, setItem] = useState({
    title: "",
    price: "",
    category: null,
    calories: "",
  });
  const defaultObj = {
    title: "",
    price: "",
    category: null,
    calories: "",
  };
  const [image, setImage] = useState(null);
  const [fields, setFields] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItem({ ...item, [name]: value });
    console.log(item);
  };
  const loadimage = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    console.log(image);
    const storageref = ref(storage, `images/${Date.now()}-${image.name}`);
    const uploadTask = uploadBytesResumable(storageref, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgeess =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("error while uploading image");
        setAlert("danger");
        setTimeout(() => {
          setLoading(false);
          setFields(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImage(downloadUrl);
          setLoading(false);
          setFields(true);
          setMsg("image uploaded successfully");
          setAlert("success");
          setTimeout(() => {
            setFields(false);
            setLoading(false);
          }, 4000);
        });
      }
    );
  };
  const clearData = () => {
    setItem(item);
    setImage(null);
  };

  const fetchData = async() => {
    await getitem().then((data) => {
      dispatch({
        type:actionType. SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }
  const uploadItem = () => {
    setLoading(true);
    try {
      if (!item.title || !item.calories || !item.category || !item.price) {
        setFields(true);
        setLoading(false);
        setMsg("please fill out the fields correctly");
        setAlert("danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: item.title,
          imageUrl: image,
          category: category,
          calories: item.calories,
          qty: 1,
          price: item.price,
        };
        saveItem(data);
        setAlert("success");
        setFields(true);
        setMsg("Item uploaded successfully");
        fetchData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(`this is an error ${error}`);
      setAlert("danger");
      setFields(true);
      setMsg("Item failed to upload");
      setLoading(false);
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
    setItem(defaultObj);
    setLoading(false)
    setImage(null)
    
  };
  const deleteimage = () => {
    setLoading(true);
    const deleteref = ref(storage, image);
    deleteObject(deleteref).then(() => {
      setImage(null);
      setLoading(false);
      setFields(true);
      setMsg("deleted successfully");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const [alertStatus, setAlert] = useState("good");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 gap-3 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            key={fields}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full  p-2 rounded-lg text-lg text-center ${
              alertStatus === "danger"
                ? "text-white bg-red-500"
                : "text-white bg-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2 ">
          <MdFastfood className="text-xl text-gray-500 " />
          <input
            type="text"
            required
            name="title"
            value={item.title}
            placeholder="enter name of food..."
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-300"
            onChange={handleChange}
          />
        </div>

        <div className="w-full ">
          <select
            name="category"
            onChange={handleChange}
            className="outline-none border-none gap-1 bg-slate-300 w-full p-2 rounded-md"
          >
            <option value="other" className="bg-white">
              select category
            </option>
            {category &&
              category.map((cat) => (
                <option
                  key={cat.id}
                  value={item.category}
                  className=" outline-none border-none capitalize bg-white p-2 text-blue-900"
                >
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300  w-full h-225 md:h-420 cursor-pointer rounded-r-lg  ">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!image ? (
                <>
                  <label className="w-full h-full flex flex-col cursor-pointer items-center justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className=" text-gray-500 hover:text-gray-600 text-6xl" />
                      <p className="text-gray-500">click here to upload</p>
                    </div>
                    <input
                      type="file"
                      name="loadimage"
                      accept="image/*"
                      onChange={loadimage}
                      className="w-0 h-0 "
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={image}
                      alt="imageasset"
                      className="w-full h-full object-cover "
                    />
                    <button
                      type="button"
                      className="absolute  bottom-3 right-3 rounded-full bg-red-500 cursor-pointer outline-none hover:shadow-md duration-100 transition-all ease-in-out "
                      onClick={deleteimage}
                    >
                      <MdDelete className="text-white text-3xl" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-2">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-3xl" />
            <input
              type=" text"
              required
              name="calories"
              onChange={handleChange}
              value={item.calories}
              placeholder="enter calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdPriceCheck className="text-gray-700 text-3xl " />
            <input
              type="text"
              required
              name="price"
              value={item.price}
              onChange={handleChange}
              placeholder="enter price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline bg-emerald-500 px-32 py-2 rounded-lg text-lg text-white font-semibold justify-center items-center"
            type="button"
            onClick={uploadItem}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
