import { yupResolver } from "mantine-form-yup-resolver";
import { useForm } from "@mantine/form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

const schemaPage = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(2, "Too short").required("Required"),
});

const LoginPage = () => {
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
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  const fields = Object.keys(schemaPage.fields);

  function handler(values) {
    mutate.mutate(values);
    console.log(values);
  }

  return (
    <div className="fixed left-0  right-0 top-0  p-4 font-dm-sans">
      <form
        className="flex flex-col space-y-6 border-2 border-line/50 p-12"
        onSubmit={form.onSubmit((values) => handler(values))}
      >
        {fields.map((field) => (
          <FormWrapper key={field}>
            <label className="text-primary" htmlFor={field}>
              {field}
            </label>
            <input
              name={field}
              className="w-full border-2 border-line/80 px-4 py-2 focus:border-primary focus:outline-none"
              type={`${field === "password" ? "password" : "text"}`}
              placeholder={field}
              {...form.getInputProps(field)}
            />
          </FormWrapper>
        ))}
        <button type="submit" className="bg-black p-3 font-dm-display text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

function FormWrapper({ children }) {
  return <div className="flex flex-col space-y-3">{children}</div>;
}
