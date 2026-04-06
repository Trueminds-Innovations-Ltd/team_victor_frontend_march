// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     setError,
//     resetField,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     if (data.password.length < 8) {
//       setError("password", {
//         type: "manual",
//         message: "Password must be at least 8 characters",
//       });
//       resetField("password");
//       return;
//     }

//     if (data.confirmPassword !== data.password) {
//       setError("confirmPassword", {
//         type: "manual",
//         message: "Passwords don't match",
//       });
//       resetField("password");
//       resetField("confirmPassword");
//       return;
//     }

//     console.log("Signup success:", data);
//   };

//   return (
//     <div className='container'>
//       <div className='header'>
//         <button type='button' className='return' onClick={() => navigate(-1)}>
//           <img src='/images/back.svg' alt='Go back' />
//         </button>
//         <div className='logo'>Logo</div>
//         <button type='button' className='cancel' onClick={() => navigate("/landing")}>
//           <img src='/images/cancel.svg' alt='Cancel' />
//         </button>
//       </div>

//       <div className='hero-text'>
//         <h1>Start your learning journey</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/*1 First name and Last name*/}
//           <div className='form-row'>
//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='text'
//                   placeholder='First name*'
//                   className='form-field'
//                   {...register("firstname", {
//                     required: "First name is required",
//                   })}
//                 />
//               </div>
//               {errors.firstname && <p className='error-text'>{errors.firstname.message}</p>}
//             </div>

//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='text'
//                   placeholder='Last name*'
//                   className='form-field'
//                   {...register("lastname", {
//                     required: "Last name is required",
//                   })}
//                 />
//               </div>
//               {errors.lastname && <p className='error-text'>{errors.lastname.message}</p>}
//             </div>
//           </div>

//           {/*2 Email + phone number*/}
//           <div className='form-row'>
//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='email'
//                   placeholder='Email Address*'
//                   className='form-field'
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Please enter a valid email address.",
//                     },
//                   })}
//                 />
//                 <span className='form-field-icon'>✉</span>
//               </div>
//               {errors.email && <p className='error-text'>{errors.email.message}</p>}
//             </div>

//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='tel'
//                   placeholder='Phone number*'
//                   className='form-field'
//                   {...register("tel", {
//                     required: "Phone number is required",
//                   })}
//                 />
//                 <span className='form-field-icon'>
//                   <img src='/images/phone-icon.svg' alt='' />
//                 </span>
//               </div>
//               {errors.tel && <p className='error-text'>{errors.tel.message}</p>}
//             </div>
//           </div>

//           {/*3 password and confirm password*/}
//           <div className='form-row'>
//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='password'
//                   placeholder='Password*'
//                   className='form-field'
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                   })}
//                 />
//               </div>
//               {errors.password && <p className='error-text'>{errors.password.message}</p>}
//               {!errors.password && <p className='field-hint'>At least 8 characters</p>}
//             </div>

//             <div className='form-group'>
//               <div className='input-wrapper'>
//                 <input
//                   type='password'
//                   placeholder='Confirm password*'
//                   className='form-field'
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) => value === getValues("password") || "Passwords don't match",
//                   })}
//                 />
//               </div>
//               {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword.message}</p>}
//             </div>
//           </div>

//           {/* 4 Learning Track */}
//           <div className='form-row'>
//             <div className='form-group form-group--full'>
//               <div className='input-wrapper'>
//                 <select
//                   className='form-field select-field'
//                   defaultValue=''
//                   {...register("track", {
//                     required: "Please select a learning track",
//                   })}
//                 >
//                   <option value='' disabled hidden>
//                     Select a learning track
//                   </option>
//                   <option value='frontend'>Frontend</option>
//                   <option value='backend'>Backend</option>
//                   <option value='design'>Design</option>
//                 </select>
//               </div>
//               {errors.track && <p className='error-text'>{errors.track.message}</p>}
//             </div>
//           </div>

//           <div className='form-row submit-row'>
//             <button type='submit' className='btn-get-started btn-full'>
//               Get Started
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Mail, Phone, Eye, EyeOff, Info, ChevronDown } from "lucide-react";

const input = (hasError) =>
  `w-full bg-[#F4E6FF] rounded-[0.3rem] px-5 py-3 pr-12 text-[15px] font-medium text-[#BCA6E2] placeholder:text-purple-300 outline-none border-2 ${
    hasError ? "border-red-400" : "border-transparent focus:border-purple-400"
  }`;

export default function Signup() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Signup success:", data);
    setSubmitted(true);
  };

  const navigate = useNavigate();

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl">🎉</div>
        <h2 className="text-2xl font-bold text-purple-700">You're all set!</h2>
        <p className="text-gray-500 text-sm">Your account has been created. Let's start learning.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 md:px-14 py-7 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button type="button" onClick={() => navigate("/")} className="p-2 rounded-full cursor-pointer hover:bg-purple-50 text-gray-700">
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <span className="text-xl font-bold text-gray-900">Logo</span>
        <button type="button" onClick={() => navigate("/")} className="p-2 rounded-full hover:bg-purple-50 cursor-pointer text-gray-700">
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-[#5B21B6] leading-tight mb-10 tracking-tight">
        Start your learning journey
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <input type="text" placeholder="First name *" className={input(errors.firstname)}
              {...register("firstname", { required: "First name is required" })} />
            {errors.firstname && <p className="text-red-500 text-xs mt-1 px-1">{errors.firstname.message}</p>}
          </div>
          <div>
            <input type="text" placeholder="Last name *" className={input(errors.lastname)}
              {...register("lastname", { required: "Last name is required" })} />
            {errors.lastname && <p className="text-red-500 text-xs mt-1 px-1">{errors.lastname.message}</p>}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative">
              <input type="email" placeholder="Email address *" className={input(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })} />
              <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email.message}</p>}
          </div>
          <div>
            <div className="relative">
              <input type="tel" placeholder="Phone number *" className={input(errors.tel)}
                {...register("tel", { required: "Phone number is required" })} />
              <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
            </div>
            {errors.tel && <p className="text-red-500 text-xs mt-1 px-1">{errors.tel.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="Password *" className={input(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })} />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password
              ? <p className="text-red-500 text-xs mt-1 px-1">{errors.password.message}</p>
              : <p className="flex items-center gap-1 text-purple-400 text-xs mt-1 px-1"><Info size={13} /> At least 8 characters</p>
            }
          </div>
          <div>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} placeholder="Confirm password *" className={input(errors.confirmPassword)}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) => v === getValues("password") || "Passwords don't match",
                })} />
              <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="relative">
          <select defaultValue="" className={input(errors.track) + " appearance-none cursor-pointer"}
            {...register("track", { required: "Please select a learning track" })}>
            <option value="" disabled hidden>Select Learning Track</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
          {errors.track && <p className="text-red-500 text-xs mt-1 px-1">{errors.track.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-2">
          <button type="submit"
            className="bg-[#8533cd] hover:bg-[#5B21B6] text-white font-bold text-lg px-12 py-3 cursor-pointer rounded-2xl w-full md:w-auto md:min-w-[320px] tracking-wide shadow-[0_4px_20px_rgba(109,40,217,0.25)] transition-colors">
            Get Started
          </button>
        </div>

      </form>
    </div>
  );
}