//import React from 'react';
import { IoIosShareAlt } from "react-icons/io"
import { AiOutlineComment, AiFillHeart } from "react-icons/ai"
import { useEffect, useState } from 'react';
import { AxiosInstance } from '../axios';
import { getImage } from "../getImage";
import { getAuth } from '../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import moment from "moment";
import { setAllPosts,getPosts } from "../redux/slice/postSlice";
import { setAddPost } from "../redux/slice/postSlice";
import {AiOutlineHeart} from "react-icons/ai";

type Props = {}

function NewFeed({ }: Props) {
    const [addCommentPost, setAddCommentPost] = useState(false);
    //const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    //select post
    const {user} = useAppSelector(getAuth);
    const {posts} = useAppSelector(getPosts);
    const [comment_post, setCommentPost] = useState("");

    const getAllPosts = async () => {
        try {
            setLoading(true);
            const response = await AxiosInstance.get("post/get-all.post");
            if (response.status == 200) {
                //setPosts(response.data)
                dispatch(setAllPosts(response.data));
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const likePost = async (post_id: String, type: String) => {
        const data = {
            post_id,
            user_id: user._id,
        }

        const newAllPosts = posts.map((post:any) => {
            if (type === "LIKE") return post._id === post_id ? {...post, like: post.like+1, isLiked: true} : post;
            if (type === "UNLIKE") return post._id === post_id ? {...post, like: post.like-1, isLiked: false} : post;
        });
        dispatch(setAllPosts(newAllPosts));

        await AxiosInstance.post("/post/like-un-like",data);
        /*
        if(response.status == 201){
            alert("liked");
        }*/
    }

    const commentPost = async (post_id: String) => {
        try {
            const data = {
                comment_post,
                post_id,
                user_id: user._id,
            }
            const response = await AxiosInstance.post("/post/add-post-comment", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status == 201) {
                //alert("Post add")
                dispatch(setAddPost(response.data));
            }
        }catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <>
            {loading ? (
                <h1>Loading ...</h1>
            ) : (
                posts.map((post: any) => (
                    <div className='bg-white dark:bg-gray-800 p-5 rounded-md pb-5 mb-5 '>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <img src={getImage(post.image_path)} className='h-10 w-10 object-cover rounded-full' />

                                <div className='ml-5 dark:text-gray-200'>
                                    <h2 className='dark:text-gray-200 text-gray-800 '>{post.username}</h2>
                                    <p className='text-xs'>{moment(post.createdAt).fromNow()}</p>
                                </div>
                            </div>
                           
                        </div>

                        <p className='mt-2 dark:text-gray-200'>
                        {post.description}
                        </p>

                        <img src={getImage(post.image_path)} className='mt-2 rounded-lg h-[25rem] w-full object-cover' />

                        <div className='flex mt-5 items-center'>
                            <div className="fles items-center">
                            {
                                post.isLiked ? <AiFillHeart 
                                className="cursor-pointer hover:scale-110 hover:text-red-500 transition-all text-lg text-red-500 dark:text-gray-200" 
                                onClick={() => likePost(post._id, "UNLIKE")}
                                /> :
                                <AiOutlineHeart 
                                className="cursor-pointer hover:scale-110 hover:text-red-500 transition-all text-lg text-red-500 dark:text-gray-200" 
                                onClick={() => likePost(post._id, "LIKE")}
                                />    
                            }
                            {post.like }
                            </div>
                            {addCommentPost && (
                            <div className='w-[30rem] h-[20rem] bg-white fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2'>
                            <input
                            type='text'
                            placeholder='Comentario ...'
                            value={comment_post}
                            onChange={e => setCommentPost(e.target.value)}
                            />
                            <AiOutlineComment 
                            className="cursor-pointer hover:scale-110 transition-all text-lg ml-2 dark:text-gray-200"
                            onClick={commentPost}
                            />
                            <button onClick={() => setAddCommentPost(false)}>Close</button>
                            </div>
                            )}
                            <IoIosShareAlt className="cursor-pointer hover:scale-110 transition-all text-lg ml-2 dark:text-gray-200" />
                        </div>
                    </div>
                ))

            )}
        </>
    )
}

export default NewFeed