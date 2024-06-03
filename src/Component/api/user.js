import request from "./request";

export const getImages = async (userCode) => {
  const res = await request.get(`user/images/${userCode}`);
  return res;
};

export const login = async (data) => {
  const res = await request.post("api/auth/login", data);
  return res;
};
export const createImages = (data) => {
  const res = request.post("user/createImages", data);
  return res;
};

export const replaceImage = async (data) => {
  const res = await request.post("user/update-image", data);
  return res;
};
