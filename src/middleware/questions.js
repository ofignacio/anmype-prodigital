import * as API from "./api";

const URL = "/api";

export const getQuestions = (params) =>
  API.executeAnonymous(`${URL}/questions`, params);

export const getOptions = (params) =>
  API.executeAnonymous(`${URL}/options`, params);

export const getDimensions = (params) =>
  API.executeAnonymous(`${URL}/dimensions`, params);

export const getUserByEmail = (params) =>
  API.executeAnonymous(`${URL}/get`, params);

export const getAllUsers = (params) =>
  API.executeAnonymous(`${URL}/getAll`, params);

export const createUser = (params) =>
  API.executeAnonymous(`${URL}/create`, params);

export const updateQuestion = (params) =>
  API.executeAnonymous(`${URL}/add`, params);

export const setResult = (params) =>
  API.executeAnonymous(`${URL}/result`, params);

export const sendMail = (params) =>
  API.executeAnonymous(`${URL}/sendMail`, params);

export default {
  getUserByEmail,
  getAllUsers,
  createUser,
  updateQuestion,
  setResult,
  sendMail,
};
