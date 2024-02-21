/**
 * @param {string} endpoint
 * @param {RequestInfo} options
 *
 */
export async function fetchData(endpoint, options = {}) {
  return fetch(`http://localhost:3000/${endpoint}`, options).then((res) => res.json());
}
