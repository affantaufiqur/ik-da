import PropTypes from "prop-types";
import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader } from "lucide-react";

const schemaPage = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(2, "Too short").required("Password minimum is 6 characters"),
});

const LoginPage = () => {
  const [status, setStatus] = useState(null);
  const [submit, isSubmit] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schemaPage),
  });

  const mutate = useMutation({
    mutationKey: ["yolo"],
    mutationFn: async (values) => {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(res);
      if (res.status !== 200) {
        setStatus(data.message);
        isSubmit(false);
        return;
      }
      document.cookie = `token=${data.token}`;
      isSubmit(false);
      return data;
    },
  });
  const fields = Object.keys(schemaPage.fields);

  function handler(values) {
    setStatus(null);
    isSubmit(true);
    return mutate.mutate(values);
  }

  return (
    <div className="flex h-screen items-center justify-center p-4 font-dm-sans">
      <form className="flex w-1/2 flex-col space-y-6 p-12" onSubmit={form.onSubmit((values) => handler(values))}>
        <div className="flex flex-col space-y-1">
          <h1 className="font-dm-display text-4xl font-bold">Login</h1>
          <h5 className="font-dm-sans text-base  font-normal">Enter your credentials to access all of our features</h5>
        </div>
        {fields.map((field) => (
          <FormWrapper key={field}>
            <label className="text-primary" htmlFor={field}>
              {field}
            </label>
            <input
              name={field}
              className={`w-full border-2 border-line/80 px-4 py-2 focus:border-primary focus:outline-none ${form.errors[field] ? "border-red-800" : ""}`}
              type={`${field === "password" ? "password" : "text"}`}
              placeholder={field}
              {...form.getInputProps(field)}
            />
            <p className="text-sm text-red-800">{form.errors[field]}</p>
          </FormWrapper>
        ))}
        <button
          type="submit"
          className="border-2 border-transparent bg-black p-3 font-dm-display text-xl text-white  hover:border-black hover:bg-white hover:text-black"
          disabled={submit}
        >
          {submit ? <Loader className="inline-flex h-5 w-5 animate-spin justify-center" /> : "Login"}
        </button>
        {status ? <p className="text-red-800">{status}</p> : ""}
      </form>
    </div>
  );
};

export default LoginPage;

function FormWrapper({ children }) {
  return <div className="flex flex-col space-y-3">{children}</div>;
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
