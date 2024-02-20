export const getTokenFromCookies = () => {
  const getArr = document.cookie.split(";");
  const findToken = getArr.find((item) => item.includes("token"));
  return findToken.split("=")[1];
};
