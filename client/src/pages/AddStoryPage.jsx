import { useForm } from "@mantine/form";
import { yupResolver } from "@mantine/form";
import FormWrapper from "../components/ui/FormWrapper";
import { insertStorySchema } from "../schema/story.schema";
import { useFetch } from "../hooks/fetch-hooks";
import { useLoaderData } from "react-router-dom";

export default function AddStory() {
  const [isLoading, data, error] = useFetch("fetchGenres", "genres");
  const userData = useLoaderData();
  const form = useForm({
    initialValues: {
      title: "",
      synopsis: "",
      genreId: data ? data[0].id : "",
      status: "",
      image: "",
    },
    validate: yupResolver(insertStorySchema),
  });

  if (error) return <p>error</p>;

  return (
    <main className="mx-24">
      <section className="flex flex-col space-y-8">
        <h1 className="font-dm-display text-2xl">Add new story</h1>
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          className="flex flex-col space-y-6 [&_label]:text-primary"
        >
          <FormWrapper>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title" className="form-input-normal" {...form.getInputProps("title")} />
            <p className="text-sm text-red-800">{form.errors.title}</p>
          </FormWrapper>
          <FormWrapper>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              placeholder="Author"
              className="form-input-normal text-line/50"
              disabled
              value={userData.user.name}
            />
          </FormWrapper>
          <FormWrapper>
            <label htmlFor="synopsis">synopsis</label>
            <textarea placeholder="Synopsis" className="form-input-normal" {...form.getInputProps("synopsis")} />
            <p className="text-sm text-red-800">{form.errors.synopsis}</p>
          </FormWrapper>
          <FormWrapper>
            <label htmlFor="genre">genre</label>
            {isLoading ? (
              <p>loading</p>
            ) : (
              <select
                placeholder="Action"
                className="form-input-normal placehoder:text-line/50 bg-transparent"
                {...form.getInputProps("genreId", { type: "select" })}
              >
                {data.map((item) => (
                  <option key={item.id} value={item.id} selected={item.id === data[0].id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <p className="text-sm text-red-800">{form.errors.genreId}</p>
          </FormWrapper>
          <FormWrapper>
            <label htmlFor="image">image</label>
            <input type="file" placeholder="image" className="form-input-normal" {...form.getInputProps("image")} />
            <p className="text-sm text-red-800">{form.errors.image}</p>
          </FormWrapper>
          <button type="submit" className="btn-primary">
            Submit new story
          </button>
        </form>
      </section>
    </main>
  );
}
