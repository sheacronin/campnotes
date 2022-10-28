import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface SignUpError {
  msg: string;
}

function SignUp() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);

    const { username, password, confirmPassword } = (
      e.target as HTMLFormElement
    ).elements as SignUpFormElements;

    if (password.value !== confirmPassword.value) {
      setErrors((prevErrors) => [...prevErrors, 'Your passwords do not match']);
      return;
    }

    const res = await fetch('http://localhost:5000/users/', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status === 200) {
      navigate('/login');
    } else {
      const data = await res.json();
      if (data.errors) {
        const errorMessages = data.errors.errors.map(
          (error: SignUpError) => error.msg
        );
        setErrors((prevErrors) => [...prevErrors, ...errorMessages]);
      } else {
        setErrors((prevErrors) => [...prevErrors, data.message]);
      }
    }
  }

  return (
    <article>
      <form className="auth-form" onSubmit={handleSubmission}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <section className="errors">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </section>
      )}
    </article>
  );
}

export default SignUp;
