import { useForm } from "@mantine/form";
import { getTokenFromCookies } from "../shared/token";
import { yupResolver } from "@mantine/form";
import { Loader } from "lucide-react";
import FormWrapper from "../components/ui/FormWrapper";
import { updateStorySchema } from "../schema/story.schema";
import { useFetch } from "../hooks/fetch-hooks";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { fetchData } from "../shared/fetch";

export default function EditStory() {
  const pageData = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, data, error] = useFetch("fetchGenres", "genres");
  const { title, synopsis, genre_id, status } = pageData.storyData;
  const form = useForm({
    initialValues: {
      title,
      synopsis,
      genre_id,
      status,
    },
    validate: yupResolver(updateStorySchema),
  });

  if (error) return <p>error</p>;

  async function formHandler(value) {
    try {
      setErrorMessage(null);
      setUploadStatus(true);
      const token = getTokenFromCookies();
      const finalData = { ...value, status: pageData.storyData.status };
      const insertToDb = await fetchData(`stories/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(finalData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("insertToDb", insertToDb);

      if (insertToDb.message === "Error") {
        setUploadStatus(false);
        return;
      }

      return navigate(`/story/${insertToDb.story.id}`);
    } catch (err) {
      console.log("cathed", err);
      setErrorMessage("Failed on editing story");
      setUploadStatus(false);
      return;
    }
  }

  const genreIndex = data?.findIndex((item) => item.id === pageData.storyData.genre_id);
  return (
    <main className="mx-24">
      <section className="flex flex-col space-y-8">
        <h1 className="font-dm-display text-2xl">Edit story</h1>
        <form
          onSubmit={form.onSubmit((values) => formHandler(values))}
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
              value={pageData.user.name}
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
                defaultValue={data[genreIndex]?.id}
                {...form.getInputProps("genreId", { type: "select" })}
              >
                {data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <p className="text-sm text-red-800">{form.errors.genreId}</p>
          </FormWrapper>
          <button
            type="submit"
            className="btn-primary disabled:bg-black disabled:hover:bg-black"
            disabled={uploadStatus}
          >
            {uploadStatus ? (
              <Loader className="inline-flex h-5 w-5 animate-spin items-center justify-center text-white" />
            ) : (
              "Submit"
            )}{" "}
          </button>
        </form>
      </section>
      {errorMessage && <p className="text-red-800">{errorMessage}</p>}
    </main>
  );
}
