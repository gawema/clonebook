export const postRequest = async (path, body) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      body: body,
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
