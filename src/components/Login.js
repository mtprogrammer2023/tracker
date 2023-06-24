import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { setUserSession } from './session';

const URL = (username, password) => 'https://exam.pishgamanasia.com/webapi/Account/Login';



function Login(props) {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = async (username, password) => {
    
    const response = await fetch(URL(username, password), {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
     }),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
    });


    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleLogin = data => {
    setError(null);
    setLoading(true);
    const result = getToken(data.username, data.password);
    
    result.then(res => {
      
      if (res.data) {
        setUserSession(res.data.userToken, data.username);
        setLoading(false);
        navigate('/dashboard');
      } else {
        setLoading(false);
        setError(res.message);
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
     
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[20%]"
      onSubmit={handleSubmit(handleLogin)}
    >
       {error && (
        <>
        <div role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-end">
          {error}
          </div>
        </div>
          <br />
        </>
      )}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-end"
          htmlFor="username"
        >
          نام کاربری
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="نام کاربری"
          {...register("username", {
            required: "Required",
          })}
        />
        {errors.username && (
          <span className="text-red-500 text-xs italic">
            این فیلد ضروری می باشد
          </span>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-end"
          htmlFor="password"
        >
          رمز عبور
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          {...register("password", {
            required: "Required",
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs italic">
            این فیلد ضروری می باشد
          </span>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? 'در حال بارگزاری ...' : 'ورود سامانه'}
        </button>
      </div>
      
      <br />
    </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
