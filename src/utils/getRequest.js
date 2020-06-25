export const getRequest = async (path, params = {}) => {
  path = path.concat("?");
  Object.keys(params).forEach(
    (key) => (path = path.concat(key + "=" + params[key] + "&"))
  );
  path = path.substring(0, path.length - 1);
  // console.log(path);
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : "",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
