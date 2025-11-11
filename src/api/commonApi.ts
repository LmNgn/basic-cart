import axios from "axios";

const URL = `https://dummyjson.com/products`;
export const getProducts = async () => {
  const data = await axios.get(`${URL}`);
  console.log(data);
  return data;
};
