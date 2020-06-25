const { getRequest } = require("./getRequest");

export const checkSession = async () => {
  let response = await getRequest("/users/session");
  if (response.type === "success") {
    location.href = `/`;
  }
};
