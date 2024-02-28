import FormWrapper from "../components/ui/FormWrapper";
import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader } from "lucide-react";
import { registerSchema } from "../schema/auth.js";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [status, setStatus] = useState(null);
  const [submit, isSubmit] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: yupResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (values) => {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status !== 200) {
        setStatus(data.message);
        isSubmit(false);
        return;
      }
      const oneMonth = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
      document.cookie = `token=${data.token};expires=${oneMonth};path=/;`;
      isSubmit(false);
      return navigate("/");
    },
  });

  const fields = Object.keys(registerSchema.fields);

  function handler(values) {
    setStatus(null);
    isSubmit(true);
    return mutation.mutate(values);
  }

  return (
    <div className="flex h-screen items-center justify-center p-1 font-dm-sans lg:p-4">
      <section className="flex w-full flex-col space-y-8 px-4 lg:w-1/2">
        <Link to="/" className="text-primary hover:underline">
          Back to home
        </Link>
        <form className="flex w-full flex-col space-y-6" onSubmit={form.onSubmit((values) => handler(values))}>
          <div className="flex flex-col space-y-1">
            <h1 className="font-dm-display text-4xl font-bold">Register</h1>
            <h5 className="font-dm-sans text-base  font-normal">Create your account to enjoy all of our stuff</h5>
          </div>
          {fields.map((field) => (
            <FormWrapper key={field}>
              <label className="text-primary" htmlFor={field}>
                {field}
              </label>
              <input
                name={field}
                className={`form-input-normal ${form.errors[field] ? "border-red-800" : ""}`}
                type={`${field === "password" ? "password" : "text"}`}
                placeholder={field}
                {...form.getInputProps(field)}
              />
              <p className="text-sm text-red-800">{form.errors[field]}</p>
            </FormWrapper>
          ))}
          <button type="submit" className="btn-primary" disabled={submit}>
            {submit ? <Loader className="inline-flex h-5 w-5 animate-spin justify-center" /> : "Signup"}
          </button>
          {status ? <p className="text-red-800">{status}</p> : ""}
        </form>
        <Link to="/login" className="font-dm-sans text-primary hover:underline">
          {`already have an account? Just tap here`}
        </Link>
      </section>
    </div>
  );
}
