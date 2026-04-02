import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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

    console.log("Signup success:", data);
  };

  return (
    <div className='container'>
      <div className='header'>
        <button type='button' className='return' onClick={() => navigate(-1)}>
          <img src='/images/back.svg' alt='Go back' />
        </button>
        <div className='logo'>Logo</div>
        <button type='button' className='cancel' onClick={() => navigate("/landing")}>
          <img src='/images/cancel.svg' alt='Cancel' />
        </button>
      </div>

      <div className='hero-text'>
        <h1>Start your learning journey</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/*1 First name and Last name*/}
          <div className='form-row'>
            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='text'
                  placeholder='First name*'
                  className='form-field'
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                />
              </div>
              {errors.firstname && <p className='error-text'>{errors.firstname.message}</p>}
            </div>

            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='text'
                  placeholder='Last name*'
                  className='form-field'
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                />
              </div>
              {errors.lastname && <p className='error-text'>{errors.lastname.message}</p>}
            </div>
          </div>

          {/*2 Email + phone number*/}
          <div className='form-row'>
            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='email'
                  placeholder='Email Address*'
                  className='form-field'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                <span className='form-field-icon'>✉</span>
              </div>
              {errors.email && <p className='error-text'>{errors.email.message}</p>}
            </div>

            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='tel'
                  placeholder='Phone number*'
                  className='form-field'
                  {...register("tel", {
                    required: "Phone number is required",
                  })}
                />
                <span className='form-field-icon'>
                  <img src='/images/phone-icon.svg' alt='' />
                </span>
              </div>
              {errors.tel && <p className='error-text'>{errors.tel.message}</p>}
            </div>
          </div>

          {/*3 password and confirm password*/}
          <div className='form-row'>
            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='password'
                  placeholder='Password*'
                  className='form-field'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              {errors.password && <p className='error-text'>{errors.password.message}</p>}
              {!errors.password && <p className='field-hint'>At least 8 characters</p>}
            </div>

            <div className='form-group'>
              <div className='input-wrapper'>
                <input
                  type='password'
                  placeholder='Confirm password*'
                  className='form-field'
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === getValues("password") || "Passwords don't match",
                  })}
                />
              </div>
              {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* 4 Learning Track */}
          <div className='form-row'>
            <div className='form-group form-group--full'>
              <div className='input-wrapper'>
                <select
                  className='form-field select-field'
                  defaultValue=''
                  {...register("track", {
                    required: "Please select a learning track",
                  })}
                >
                  <option value='' disabled hidden>
                    Select a learning track
                  </option>
                  <option value='frontend'>Frontend</option>
                  <option value='backend'>Backend</option>
                  <option value='design'>Design</option>
                </select>
              </div>
              {errors.track && <p className='error-text'>{errors.track.message}</p>}
            </div>
          </div>

          <div className='form-row submit-row'>
            <button type='submit' className='btn-get-started btn-full'>
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
