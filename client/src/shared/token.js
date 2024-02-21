import { fetchData } from "./fetch";

export const getTokenFromCookies = () => {
  const checkCookie = document.cookie;
  if (!checkCookie) return null;
  const getArr = document.cookie.split(";");
  const findToken = getArr.find((item) => item.includes("token"));
  return findToken.split("=")[1];
};

export async function getCurrentUser() {
  const token = getTokenFromCookies();
  if (!token) return null;
  const getCurrentUser = await fetchData("current-user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (getCurrentUser.message) {
    return null;
  }
  return getCurrentUser;
}
