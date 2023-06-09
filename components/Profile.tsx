
import { AiOutlineUserAdd} from "react-icons/ai";
import { MdLocationPin, MdWork } from "react-icons/md";
import { useAppSelector } from '../redux/hook/hook';
import { getAuth } from '../redux/slice/authSlice';
import { base_url } from '../base_url';

type Props = {}

function Profile({ }: Props) {

    const {user} =useAppSelector(getAuth);

    return (
        <div className='bg-white dark:bg-gray-800 rounded-lg p-5'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <img src={base_url +'/' +user?.profile_picture_path} className='h-10 w-10 rounded-full object-cover' />

                    <div className='ml-5'>
                        <h1 className='dark:text-gray-200'>{user?.username}</h1>
                        <p className='dark:text-gray-200 text-sm'>{user?.friends?.length} friends</p>
                    </div>
                </div>

                <AiOutlineUserAdd className="text-lg dark:text-gray-200" />
            </div>

            <hr className='my-5' />


            <div className='flex items-center dark:text-gray-200'>
                <MdLocationPin className="text-lg" />
                <p className='ml-5'>{user?.address}</p>
            </div>

            <div className='flex items-center mt-2 dark:text-gray-200'>
                <MdWork className="text-lg" />
                <p className='ml-5'>{user?.work}</p>
            </div>

            <div className='flex justify-between items-center'>
                <p>Who view your profile ?</p>
                <h2>{user?.profile_view}</h2>
            </div>

            <div className='flex justify-between items-center'>
                <p>Impress from your friend</p>
                <h2>{user?.impress}</h2>
            </div>


        </div>

    )
}

export default Profile