"use client";
import { CallIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';

export default function SigninWithPassword() {
  const router = useRouter();

  const [data, setData] = useState({
    phoneNumber: process.env.NEXT_PUBLIC_DEMO_USER_PHONE || "",
    remember: false,
  });
  const [userOtp, setUserOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // مرحله 1: شماره موبایل، مرحله 2: کد تأیید

  const showToast = (variant: string, title: string, description: string) => {
    let toastFunction: any;
    switch (variant) {
      case 'success':
        toastFunction = toast.success;
        break;
      case 'warning':
        toastFunction = toast.warn;
        break;
      case 'destructive':
        toastFunction = toast.error;
        break;
      default:
        console.error(`Invalid variant: ${variant}`);
        return;
    }
  
    toastFunction(
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    );
  };
  // تابع ارسال OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: data.phoneNumber }),
      });

      const result = await response.json();
      if (response.ok) {
        setGeneratedOtp(result.otp);
        setStep(2); // تغییر به مرحله کد تأیید
      } else {
        throw new Error(result.message || "خطا در ارسال OTP");
      }
    } catch (error: any) {
      console.error("خطا:", error);
      showToast('destructive', "خطا در ارسال OTP", error.message || "سرور پاسخگو نیست.");
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // تابع تأیید OTP
  const verifyOtp = () => {
    if (userOtp === generatedOtp && userOtp !== "") {
      showToast('success', "کد OTP درست است.", "شما با موفقیت وارد شدید.");
      router.push("/");
    } else {
      console.error("کد OTP اشتباه است");
      showToast('destructive', "کد OTP اشتباه است", "لطفاً کد OTP صحیح را وارد نمائید.");
    }
  };

  // مدیریت تغییرات ورودی‌ها
  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // مدیریت ارسال فرم
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step === 1) {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  // تنظیمات انیمیشن
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <InputGroup
                type="tel"
                label="موبایل"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="موبایل خود را وارد نمایید"
                name="phoneNumber"
                handleChange={handleChange}
                value={data.phoneNumber}
                icon={<CallIcon />}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <InputGroup
                type="text"
                label="کد تأیید"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="کد OTP را وارد کنید"
                name="otp"
                handleChange={(e: any) => setUserOtp(e.target.value)}
                value={userOtp}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <button
            type="submit"
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition hover:bg-opacity-90 ${
              step === 1 ? "bg-primary" : "bg-green-500"
            }`}
            disabled={loading}
          >
            {step === 1 ? "فرستادن کد" : "تأیید کد"}
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
            )}
          </button>
        </motion.div>
      </form>
     
      </>
  );
}
