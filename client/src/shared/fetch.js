export async function fetchData(endpoint) {
  return fetch(`http://localhost:3000/${endpoint}`, {
    method: "GET",
  }).then((res) => res.json());
}
