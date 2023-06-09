import { ReactElement } from "react";
import { useEffect, useState } from "react";
import { base_url } from "../base_url";
import { useAppSelector } from "../redux/hook/hook";
import { getAuth } from "../redux/slice/authSlice";
import { AxiosInstance } from "../axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";

interface Props {}
interface Friend {
  username: String;
  _id: String;
  profile_picture_path: String;
}

function FriendList({}: Props): ReactElement {
  const { user } = useAppSelector(getAuth);

  const [firends, setFriends] = useState<any>([]);
  const [notFirends, setNotFriends] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getFriendAndNot = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(
        "/friend/get-friend-not-friend/" + user._id
      );
      if (response.status == 200) {
        setFriends(response.data.friends);
        setNotFriends(response.data.not_friends);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFriendAndNot();
  }, []);

  const addUnFriend = async (
    current_user_id: String,
    friend_id: String,
    type: String
  ) => {
    if (type === "UNFRIEND") {
      const friend = firends.find((single: any) => single._id === friend_id);
      setFriends(firends.filter((single: any) => single._id !== friend_id));
      setNotFriends((old: any) => [...old, friend]);
    } else {
      const friend = notFirends.find((single: any) => single._id === friend_id);
      setNotFriends(
        notFirends.filter((single: any) => single._id !== friend_id)
      );
      setFriends((old: any) => [...old, friend]);
    }

    const data = {
      current_user_id,
      friend_id,
    };
    try {
      await AxiosInstance.post("/friend/add-un-friend", data);
    } catch (error) {}
  };

  return loading ? (
    <h1>Loading ...</h1>
  ) : (
    <div className="bg-white dark:bg-gray-800 p-5 mt-5 rounded-lg">
      <h2>Lista de amigos</h2>

      {firends.map((friend: Friend, index: number) => (
        <div className="mt-2 " key={index}>
          <div className="flex items-center cursor-pointer rounded-lg px-2 py-1 justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={base_url + "/" + friend.profile_picture_path}
                  className=" h-10 w-10 object-cover rounded-full"
                />
                <div className="bg-green-500 h-3 w-3 absolute bottom-0 rounded-full right-0"></div>
              </div>

              <div className="ml-5">
                <p className="dark:text-gray-200 text-gray-800 font-bold">
                  {friend.username}
                </p>
              </div>
            </div>
            <HiUserRemove
              className="text-3xl text-cyan-800 bg-cyan-200 p-2 rounded-full cursor-pointer"
              onClick={() => addUnFriend(user._id, friend._id, "UNFRIEND")}
            />
          </div>
        </div>
      ))}

      <h2 className="mt-5">Encuentra amigos</h2>

      {notFirends.map((friend: Friend, index: number) => (
        <div className="mt-2 " key={index}>
          <div className="flex items-center cursor-pointer rounded-lg px-2 py-1 justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={base_url + "/" + friend.profile_picture_path}
                  className=" h-10 w-10 object-cover rounded-full"
                />
              </div>

              <div className="ml-5">
                <p className="dark:text-gray-200 text-gray-800 font-bold">
                  {friend.username}
                </p>
              </div>
            </div>
            <AiOutlineUserAdd
              className="text-3xl text-cyan-800 bg-cyan-200 p-2 rounded-full cursor-pointer"
              onClick={() => addUnFriend(user._id, friend._id, "ADD")}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendList;