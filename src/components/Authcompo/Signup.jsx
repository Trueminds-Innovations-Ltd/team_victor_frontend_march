import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  X,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Info,
  ChevronDown,
} from "lucide-react";
import { useSignup } from "../../hooks/useSignup";
import Logo from "../Global/Logo";

const input = (hasError) =>
  `w-full bg-[#f4e6ff] rounded-[0.3rem] px-5 py-3 pr-12 text-[15px] font-medium text-[#0F172A] placeholder:text-[#BCA6E2] outline-none border-2 transition-colors ${hasError ? "border-red-400" : "border-transparent focus:border-purple-400"
  }`;

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
      track: "",
    },
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const selectedTrack = watch("track");

  const options = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Design", value: "design" },
  ];

  const selectedOption = options.find((item) => item.value === selectedTrack);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelectTrack = async (value) => {
    setValue("track", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setOpen(false);
    await trigger("track");
  };

  const onSubmit = (data) => {
    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters",
      });
      resetField("password");
      return;
    }

    if (data.confirmPassword !== data.password) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match",
      });
      resetField("password");
      resetField("confirmPassword");
      return;
    }

    const payload = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      track: data.track,
      phone: data.tel,
    };

    mutate(payload);
    console.log("Signup success:", payload);
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-white px-8 py-7 md:px-14">
      {isPending && <Spinner />}
      <div className="mb-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer rounded-full p-2 text-gray-700 hover:bg-purple-50"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <span className="text-xl font-bold text-gray-900">
          {/* <Logo /> */}
          <img src="/images/lg2.png" alt="logo" className="w-20 h-20 object-cover" />
        </span>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer rounded-full p-2 text-gray-700 hover:bg-purple-50"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      <h1 className="mb-10 text-xl font-bold leading-tight tracking-tight text-[#5B21B6] md:text-2xl">
        Start your learning journey
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <input
              type="text"
              disabled={isPending}
              placeholder="First name *"
              className={input(errors.firstname)}
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              disabled={isPending}
              placeholder="Last name *"
              className={input(errors.lastname)}
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="relative">
              <input
                type="email"
                disabled={isPending}
                placeholder="Email address *"
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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type="tel"
                disabled={isPending}
                placeholder="Phone number *"
                className={input(errors.tel)}
                {...register("tel", { required: "Phone number is required" })}
              />
              <Phone
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
              />
            </div>
            {errors.tel && (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.tel.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                disabled={isPending}
                placeholder="Password *"
                className={input(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password ? (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            ) : (
              <p className="mt-1 flex items-center gap-1 px-1 text-xs text-[#0F172A]">
                <Info size={13} className="text-[#6813B3]" />
                At least 8 characters
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                disabled={isPending}
                placeholder="Confirm password *"
                className={input(errors.confirmPassword)}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) =>
                    v === getValues("password") || "Passwords don't match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 px-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <input
            type="hidden"
            {...register("track", {
              required: "Please select a learning track",
            })}
          />

          <button
            type="button"
            disabled={isPending}
            onClick={() => setOpen((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-[0.3rem] border-2 px-5 py-3 text-left text-[15px] font-medium transition-colors ${errors.track
                ? "border-red-400 bg-[#f4e6ff] text-[#0F172A]"
                : "border-transparent bg-[#f4e6ff] text-[#0F172A] hover:bg-[#ead8ff]"
              }`}
          >
            <span
              className={selectedOption ? "text-[#0F172A]" : "text-[#0F172A]"}
            >
              {selectedOption ? selectedOption.label : "Select Learning Track"}
            </span>

            <ChevronDown
              size={18}
              className={`text-purple-400 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-[0.3rem] border border-purple-200 bg-white shadow-md">
              {options.map((option) => {
                const isSelected = selectedTrack === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSelectTrack(option.value)}
                    className={`block w-full px-5 py-3 text-left text-sm transition-colors ${isSelected
                        ? "bg-purple-100 font-medium text-purple-700"
                        : "text-[#0F172A] hover:bg-purple-50"
                      }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {errors.track && (
            <p className="mt-1 px-1 text-xs text-red-500">
              {errors.track.message}
            </p>
          )}
        </div>

        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full px-12 py-3 text-lg font-bold tracking-wide text-white shadow-[0_4px_20px_rgba(109,40,217,0.25)] md:min-w-[320px] md:w-auto
  rounded-lg transition-all
  ${!isPending && "bg-[#8533cd] hover:bg-[#5B21B6] hover:rounded-tr-2xl hover:rounded-bl-2xl cursor-pointer"}
  ${isPending && "bg-[#8533cd] opacity-70 cursor-not-allowed"}
`}
          >
            {isPending ? "Signing Up..." : "Get Started"}
          </button>
        </div>
      </form>
    </div>
  );
}
