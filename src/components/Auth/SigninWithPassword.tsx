"use client";
import { EmailIcon, CallIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import axios from 'axios';
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);

    // API call to send OTP
    // Endpoint - /api/otp
    const api = async () => {
      
      //post request using axios to send OTP to the user registered mobile number.
      // try {
        const response = await axios.post('/api/otp', {
          phoneNumber: phoneNumber, 
          otp: otp,
        });
        
        // if OTP is sent successfully, give a alert message to the user.
        alert(response.data.message);
  
      // } catch (error) {  // catch error if any error occurs during the API call.
        // console.error('Error during POST request:', error);
        // alert("Error during OTP verification");
      // }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can remove this code block
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
    // Function to verify OTP
    const verifyOtp = () => {

      // if OTP entered by the user is same as the OTP generated, give a alert message to the user.
      if (otp == userOtp) {
        alert("OTP Verified");
      } else {
        alert("OTP Not Verified");
      }
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="tel"
        label="موبایل"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="موبایل خود را وارد نمایید"
        name="tel"
        // onChange={(e) => handleUserPhoneNumber(e)} 
        handleChange={handleChange}
        value={data.email}
        icon={<CallIcon/>}
      />

      {/* <InputGroup
        type="password"
        label="رمز"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="رمز عبور خود را وارنمایید"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      /> */}

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="مرا به خاطر بسپار"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          رمز خود را فراموش کردی؟
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          onClick={verifyOtp}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          فرستادن کد
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
