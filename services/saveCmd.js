const saveCmd = async (time, user, text) => {
  try {
    let response = await fetch("/api/saveCmd", {
      method: "POST",
      body: JSON.stringify({
        time,
        user,
        text,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export default saveCmd;
