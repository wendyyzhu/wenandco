import sendRequest from "./send-request";
const BASE_URL = '/api/items';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(_id) {
  return sendRequest(`${BASE_URL}/${_id}`);
}
