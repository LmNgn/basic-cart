import api from ".";

export const getCart = async () => {
  const data = await api.get("/carts");
  return data;
};
export const addItem = async (body: any) => {
  const data = await api.post("/carts", body);
  return data;
};
export const updateItem = async (id: number | string, body: any) => {
  const data = await api.patch(`/carts/${id}`, body);
  return data;
};
export const removeItem = async (id: number | string) => {
  const data = await api.delete(`/carts/${id}`);
  return data;
};
export const clearCart = async () => {
  const data = await api.delete(`/carts`);
  return data;
};
