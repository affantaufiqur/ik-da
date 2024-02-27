import { useForm } from "@mantine/form";
import { getTokenFromCookies } from "../shared/token";
import { yupResolver } from "@mantine/form";
import { Loader } from "lucide-react";
import FormWrapper from "../components/ui/FormWrapper";
import { insertStorySchema, MAX_FILE_SIZE } from "../schema/story.schema";
import { useFetch } from "../hooks/fetch-hooks";
import { useLoaderData, useNavigate } from "react-router-dom";
import { base, info } from "@uploadcare/upload-client";
import { useState } from "react";
import { fetchData } from "../shared/fetch";

export default function AddStory() {
  const [imageStatus, setImageStatus] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [isLoading, data, error] = useFetch("fetchGenres", "genres");
  const userData = useLoaderData();
  const navigate = useNavigate();
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

  async function formHandler(value) {
    try {
      const token = getTokenFromCookies();
      setUploadStatus(true);
      setImageStatus(false);
      const imageInfo = document.getElementById("image-selector").files[0];
      if (imageInfo?.type !== "image/jpeg" && imageInfo?.type !== "image/png") {
        setImageStatus("File must be jpeg or png");
        setUploadStatus(false);
        return;
      }
      if (imageInfo?.size > MAX_FILE_SIZE) {
        setImageStatus("File size too large, max is 5MB");
        setUploadStatus(false);
        return;
      }

      const imageUpload = await base(imageInfo, {
        publicKey: "9d94afc0473103c9df45",
        store: "auto",
        metadata: {
          user_Id: userData.user.id,
          story_id: "helllo",
        },
      });

      const uploadRes = await info(imageUpload.file, {
        publicKey: "9d94afc0473103c9df45",
      });

      const imageUrl = `https://ucarecdn.com/${uploadRes.fileId}/${uploadRes.filename}`;

      const finalData = { ...value, authorId: userData.user.id, status: "ongoing", image: imageUrl };
      const insertToDb = await fetchData("stories", {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (insertToDb.message === "Error") {
        setUploadStatus(false);
        return;
      }

      setUploadStatus(false);
      return navigate(`/story/${insertToDb.story.id}`);
    } catch (err) {
      console.log(err);
      setImageStatus(err);
      setUploadStatus(false);
      return;
    }
  }

  return (
    <main className="mx-4 lg:mx-24">
      <section className="flex flex-col space-y-8">
        <h1 className="font-dm-display text-2xl">Add new story</h1>
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
                  <option key={item.id} value={item.id} defaultValue={item.id === data[0].id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <p className="text-sm text-red-800">{form.errors.genreId}</p>
          </FormWrapper>
          <FormWrapper>
            <label htmlFor="image">image</label>
            <input
              type="file"
              id="image-selector"
              accept="image/png, image/jpg"
              placeholder="image"
              className="form-input-normal"
              {...form.getInputProps("image")}
            />
            <p className="text-sm text-red-800">{form.errors.image}</p>
            <div className="mt-4">
              {imageStatus ? <pre className="text-red-800">{imageStatus?.response?.error?.content}</pre> : null}
            </div>
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

      <div className="mt-4">{imageStatus ? <p className="text-red-800">Error when inserting</p> : null}</div>
    </main>
  );
}
