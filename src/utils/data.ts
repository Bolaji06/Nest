export async function getSearch(query: {}) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const params = new URLSearchParams(query).toString();
  const API_ENDPOINT = `http://localhost:7000/api/post?${params}`;


  try {
    const response = await fetch(API_ENDPOINT, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
