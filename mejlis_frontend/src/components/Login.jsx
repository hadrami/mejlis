import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4' ;
import logo from '../assets/mejlis-logo.png' ;
import {client} from '../client';
import jwt_decode  from "jwt-decode";
//import JWT from 'google-auth-library';
const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async(response) => {
    localStorage.setItem('user', JSON.stringify(response));
    console.log(response);
    const decoded = jwt_decode(response.credential)
    const { sub, name, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relativr w-full h-full'>
        <video src ={shareVideo} type ='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover' />
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 right- left-0 bottom-0 bg-blackOverlay'>
        <div className='p=5'>
          <img  src={logo} width="130px" alt='logo'/>
        </div>
        <div className='shadow-2x1'>
          <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy = 'single_host_origin' />
          </GoogleOAuthProvider>

        </div>
      </div>
    </div>
  )
}
export default Login
