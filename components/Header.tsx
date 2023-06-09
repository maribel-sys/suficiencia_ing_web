import { ReactElement, useEffect, useState } from 'react';

import { BiSearchAlt } from "react-icons/bi";
import {BsFillMoonStarsFill, BsFillQuestionCircleFill, BsSun } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { logOut } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hook/hook';
import { getAuth } from '../redux/slice/authSlice';
import { IoMdNotifications } from 'react-icons/io';

interface Props {
    
}

function Header({}: Props): ReactElement {

    const [currentTheme, setCurrentTheme] = useState("");
    const dispatch = useDispatch();

    const {user} = useAppSelector(getAuth);

    useEffect(() => {

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setCurrentTheme("dark");
        } else {
            document.documentElement.classList.remove('dark');
            setCurrentTheme("light");
        }

    }, []);

    const signOut = () => {
        dispatch(logOut());
    }

    return (
        <div className="bg-[#1c202e] dark:bg-gray-800 fixed lef-0 top-0 w-full">
            <div className="container mx-auto h-[10vh] flex justify-between px-8">
                <div className="flex items-center">
                    <h1 className="text-md font-bold lg:text-2xl text-cyan-400 dark:text-[#cf2638]">DeLorean's</h1>
                    <div className='flex items-center'>
                        <input
                            type="text"
                            placeholder='Search...'
                            className='bg-gray-200 ml-5 rounded-lg px-4 py-1 hidden md:block'
                        />
                        <BiSearchAlt className='ml-5 md:-ml-7 text-sm' />
                    </div>
                </div>

                <ul className='flex items-center'>
                    <li className='ml-2 md:ml-5'>
                        {
                            currentTheme === "dark" ? (
                                <BsSun className='text-lg hover:text-cyan-500 
                                hover:scale-110 transition-all text-gray-200 dark:hover:text-[#cf2638]'
                                
                                />
                            ) : (
                                <BsFillMoonStarsFill className='text-lg hover:text-black 
                                hover:scale-110 transition-all text-gray-200 dark:hover:text-[#cf2638]'
                        
                                />
                            )
                        }

                    </li>

                    <li className='ml-2 md:ml-5'>
                        <AiFillMessage className='cursor-pointer text-lg text-gray-200 hover:text-cyan-500 
                            hover:scale-110 transition-all dark:hover:text-[#cf2638]'/>
                    </li>

                    <li className='ml-2 md:ml-5'>
                        <IoMdNotifications className='cursor-pointer text-lg hover:text-cyan-500
                            hover:scale-110 transition-all text-gray-200 dark:hover:text-[#cf2638]'/>
                    </li>

                    <li className='ml-2 md:ml-5'>
                        <BsFillQuestionCircleFill className='cursor-pointer text-lg hover:text-cyan-500 
                            hover:scale-110 transition-all text-gray-200 dark:hover:text-[#cf2638]'/>
                    </li>

                    <li className='ml-2 md:ml-5 bg-cyan-500  dark:bg-[#cf2638] rounded-lg'>
                        <button>{user?.username}</button>
                    </li>
                    
                    <li className='ml-2 md:ml-5 hidden lg:block'>
                        <button onClick={signOut}>Log Out</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default Header