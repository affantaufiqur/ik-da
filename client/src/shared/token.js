export const getTokenFromCookies = () => {
  const checkCookie = document.cookie;
  if (!checkCookie) return null;
  const getArr = document.cookie.split(";");
  const findToken = getArr.find((item) => item.includes("token"));
  return findToken.split("=")[1];
};
