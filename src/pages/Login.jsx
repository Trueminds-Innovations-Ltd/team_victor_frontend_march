import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    if (data.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    mutate(data);
    console.log("Login success:", data);
  };

  return (
    <div className='container'>
      <div className='header'>
        <button type='button' className='return' onClick={() => navigate(-1)}>
          <img src='/images/back.svg' alt='Back' />
        </button>
        <span className='logo'>Logo</span>
        <button type='button' className='cancel' onClick={() => navigate("/landing")}>
          <img src='/images/cancel.svg' alt='Cancel' />
        </button>
      </div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-row'>
          {/* Email */}
          <div className='form-group'>
            <div className='input-wrapper'>
              <input
                type='email'
                disabled={isPending}
                placeholder='Email address*'
                className='form-field'
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              <span className='form-field-icon'>
                <img src='/images/email-icon.svg' alt='email' />
              </span>
            </div>
            {errors.email && <div className='error-text'>{errors.email.message}</div>}
          </div>

          {/* password */}
          <div className='form-group'>
            <div className='input-wrapper'>
              <input
                type='password'
                disabled={isPending}
                placeholder='Password *'
                className='form-field'
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
              />
            </div>
            {errors.password && <div className='error-text'>{errors.password.message}</div>}
          </div>
        </div>

        {/* Forgot password and login button row */}
        <div className='form-actions'>
          <a href='#' className='forgot-password'>
            Forgot Password?
          </a>

          <button type='submit' className='btn-get-started desktop-btn'>
            Get Started
          </button>
        </div>

        {/* mobile button */}
        <div className='mobile-btn-wrapper'>
          <button type='submit' className='btn-get-started mobile-btn'>
            Get Started
          </button>
        </div>
      </form>

      <p className='signup-text'>
        Don't have an account?{" "}
        <span className='signup-link' onClick={() => navigate("/signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
}
