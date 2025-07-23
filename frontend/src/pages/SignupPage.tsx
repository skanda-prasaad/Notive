import { useNavigate } from "react-router";
import axios from "../services/axios";
import { useState } from "react";
type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/signup", form);
      if (res.status === 201) {
        alert("Signeup succesfull");
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        alert("User already exists.");
      } else if (err.response?.status === 411) {
        alert("Invalid input. Check your details.");
      } else {
        alert("Something went wrong. Try again.");
      }
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
