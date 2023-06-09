//import React from 'react';
import { BsFillImageFill, BsCameraVideoFill } from "react-icons/bs";
import { AxiosInstance } from '../axios';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { getAuth } from '../redux/slice/authSlice';
import { setAddPost } from "../redux/slice/postSlice";
import { getImage } from "../getImage";


type Props = {}

function OnYourMind({ }: Props) {

    const [addPostImage, setAddPostImage] = useState(false);
    const [addPostVideo, setAddPostVideo] = useState(false);
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();


    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File>();
    const [video, setVideo] = useState<File>();

    const addPost = async () => {
        try {
            const data = {
                description,
                image,
                user_id: user._id,
                username: user.username,
                profile_picture_path: user.profile_picture_path,
            }
            const response = await AxiosInstance.post("/post/add-post-image-description", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status == 201) {
                //alert("Post add")
                dispatch(setAddPost(response.data));
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    const addPost2 = async () => {
        try {
            const data = {
                description,
                video,
                user_id: user._id,
            }
            const response = await AxiosInstance.post("/post/add-post-video-description", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status == 201) {
                //alert("Post add")
                dispatch(setAddPost(response.data));
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <>
            {addPostImage && (
                <>
                <div className="z-[100] bg-black w-full h-screen fixed top-0 left-0 opacity-50" onClick={() => setAddPostImage(false)}></div>
                <div className="z-[200] p-5 w-[80%] md:w-[60%] lg:w-[40%] border  bg-white dark:bg-gray-800 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2  -translate-y-1/2">
                <textarea
                    placeholder="Say Something ..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-lg bg-transparent border w-full h-[8rem] p-2"
                />
                <div className="flex items-center justify-between mt-2">
                    <input type="file" onChange={(e) => setImage(e.target.files![0])} />
                    <button onClick={addPost}>Post</button>
                </div>
                </div>
                </>
            )}

            {addPostVideo && (
                <>
                <div className="z-[100] bg-black w-full h-screen fixed top-0 left-0 opacity-50" onClick={() => setAddPostVideo(false)}></div>
                <div className="z-[200] p-5 w-[80%] md:w-[60%] lg:w-[40%] border  bg-white dark:bg-gray-800 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2  -translate-y-1/2">
                    <textarea
                        placeholder="Say Something ..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="rounded-lg bg-transparent border w-full h-[8rem] p-2"
                    />
                    <div className="flex items-center justify-between mt-2">
                        <input type="file" onChange={(e) => setVideo(e.target.files![0])} />
                        <button onClick={addPost2}>Post</button>
                    </div>
                </div>
                </>
            )}
            <div className='bg-white dark:bg-gray-800 p-5 rounded-lg '>
                <div className='flex items-center'>
                    <img src={getImage(user?.profile_picture_path)} className='h-10 w-10 rounded-full object-cover' />
                    <input type="text" placeholder='¿Qué estás pensando?'
                        className='bg-gray-200 ml-5 rounded-full px-4 py-2 w-full text-sm'
                    />
                </div>

                <hr className='my-5' />

                <div className='flex justify-between '>
                    <div className='flex'>
                        <div
                        className='flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all dark:text-gray-200'
                        onClick={() => setAddPostImage(true)}
                        >
                        <BsFillImageFill />
                        <p className='ml:1 lg:ml-2'>Imagen</p>
                        </div>

                        <div 
                        className='flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all dark:text-gray-200'
                        onClick={() => setAddPostVideo(true)}
                        >
                        <BsCameraVideoFill />
                        <p className='ml:1 lg:ml-2'>Video</p>
                        </div>
                        
                        <div className='flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-2 transition-all dark:text-gray-200'>

                        </div>

                    </div>

                    <div className=' bg-cyan-500  dark:bg-[#cf2638] rounded-lg'>

                    </div>

                </div>
            </div>
        </>
    )
}

export default OnYourMind