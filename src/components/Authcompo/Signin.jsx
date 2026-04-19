import { ArrowLeft, Eye, EyeOff, Mail, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Logo from "../Global/Logo";
import Spinner from "../Global/Spinner";

const input = (hasError) =>
  `w-full bg-[#f4e6ff]  rounded-[0.3rem] px-5 py-3 pr-12 text-[15px] font-medium text-[#0F172A] placeholder:text-[#BCA6E2] focus:bg-white outline-none border-2 ${
    hasError ? "border-red-400" : "border-transparent focus:border-purple-400"
  }`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useLogin();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (isPending) return <Spinner />;
    if (data.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    mutate(data);
  };

  return (
    <div className='min-h-screen bg-white px-8 md:px-14 py-7 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='flex items-center justify-between mb-10'>
        <button
          type='button'
          disabled={isPending}
          onClick={() => navigate("/")}
          className='p-2 rounded-full cursor-pointer hover:bg-purple-50 text-gray-700'
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>

        <span className='text-xl font-bold text-gray-900'>
          <Logo />
        </span>

        <button
          type='button'
          disabled={isPending}
          onClick={() => navigate("/")}
          className='p-2 rounded-full hover:bg-purple-50 cursor-pointer text-gray-700'
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      <h1 className='text-xl md:text-2xl font-bold text-[#5B21B6] mb-10'>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Email */}
          <div>
            <div className='relative'>
              <input
                type='email'
                placeholder='Email address *'
                className={input(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              <Mail
                size={18}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none'
              />
            </div>
            {errors.email && <p className='text-red-500 text-xs mt-1 px-1'>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className='relative'>
              <input
                type={showPass ? "text" : "password"}
                placeholder='Password *'
                className={input(errors.password)}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type='button'
                onClick={() => setShowPass((p) => !p)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-purple-400'
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-xs mt-1 px-1'>{errors.password.message}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className='flex justify-end mt-2'>
          <button
            type='submit'
            disabled={isPending}
            className='bg-[#8533cd] hover:bg-[#5B21B6] text-white font-bold text-lg px-12 py-3 cursor-pointer rounded-2xl w-full md:w-auto md:min-w-[320px] tracking-wide shadow-[0_4px_20px_rgba(109,40,217,0.25)] transition-colors'
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
