import axios from "axios";
import { useState } from "react";
import { base_url } from "../base_url";
import { useAppDispatch } from "../redux/hook/hook";
import { setUser } from "../redux/slice/authSlice";
import icono_login from "../assets/login.png";

interface Props {}

const Login = ({}: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      return alert("Please Input All");
    }

    setLoading(true);

    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(base_url + "/auth/login", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        if (localStorage.getItem("token")) {
          dispatch(setUser(response.data.user));
        }
      }
    } catch (error: any) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#283d74] h-[100vh]">
      <div className="bg-gradient-to-tr from-[#19141a] via-[#283d73]  to-[#e6b1c7] h-[40%] w-[80%] md:w-[60%] lg:w-[30%] border p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center">
        <div className=" object-center">
          <img src={icono_login} className='h-20 object-cover rounded-lg mx-auto' />      
        </div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email ..."
          className="border rounded-lg px-5 py-1 mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password ..."
          value={password}
          className="border rounded-lg px-5 py-1 mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} className="bg-[#cf2638] mt-2" disabled={loading}>
          {
            loading ? "Loading ..." : "Sign In"
          }
        </button>
      </div>
    </div>
  );
};

export default Login;