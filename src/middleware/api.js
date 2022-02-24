import { PORT, IP, PROTOCOL } from "./constants";

const anonymousHeaders = (params) => {
  let form = new FormData();
  for (let key in params) {
    form.append(key, params[key]);
  }
  return {
    method: "POST",
    body: form,
    redirect: "follow",
  };
};

export const executeAnonymous = async (route, params) => {
  return fetch(
    `${PROTOCOL}://${IP}:${PORT}${route}`,
    anonymousHeaders(params)
  ).then(async (response) => {
    const json = await response.json();
    return json;
  });
};
