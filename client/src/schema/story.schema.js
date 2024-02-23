import * as yup from "yup";

export const MAX_FILE_SIZE = 2048 * 1024;
export const VALID_EXTENSION = ["png", "jpg", "jpeg"];

export const insertStorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  synopsis: yup.string().required("Content is required"),
  genreId: yup.string().required("Genre is required"),
  image: yup.string(),
});
