import React from 'react'
import { useState, useEffect } from "react"
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
//import { GoogleOAuthProvider, GoogleLogout } from '@react-oauth/google'
//import { GoogleLogout } from 'react-google-login';
import { fetchUser } from '../utils/fetchUser';
import jwt_decode  from "jwt-decode";

import { client } from '../client'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const UserProfile = () => {

  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const {userId} = useParams();
  const connectedUser = fetchUser() ;
  const decode_id= jwt_decode(connectedUser.credential);
  const the_Id= decode_id.sub;

  const randomImage= 'https://source.unsplash.com/1600x900/?nature,photographer,technology'
 
  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
  
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [userId]);

  useEffect(() => {
    if (text === 'Created'){
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }

    
   
  }, [text, userId]);

  const logout =  () => {
    localStorage.clear();
    navigate('/login');
  }

  if (!user){
    return <Spinner message='Loading profile ..!' />
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center '>
      <div className='flex flex-col pb-5' >
        <div className='relative flex flex-col mb-7'>
          <div className="flex flex-col justify-center items-center">
            <img 
              src= {randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img 
              className='rounded-full wh-20 h-20 -mt-10  shadow-xl object-cover'
              src= {user.image}
              alt='user-pic'
            />
            <h1 className='font-bold text-3xl text-center mt-3'> {user.userName} </h1>
            <div className='absolute top-0z-1 right-0 p-2'>
            {userId === the_Id  && (
               <button
               type="button"
               className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
               onClick={logout}
        
             >
               <AiOutlineLogout color="red" fontSize={21} />
             </button>
              
            )}
            </div>
          </div>
          
          <div className='text-center mb-7'>
            <button
            type='butoon'
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
            type='butoon'
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (

          <div className='px-2' >
            <MasonryLayout pins={pins} />
          </div>

          ) : (
            <div className='flex justify-center font bold items-center w-full text-xl mt-2 '>
              No pins Found!
            </div>
          )}

        </div>

      </div> 
    </div>
  )
}

export default UserProfile
