import { JWTTokenService } from "./token";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://rh-server.herokuapp.com"
    : "http://localhost:4001";

function callApi(url: string, method: string = "GET", data?: any) {
  const token = JWTTokenService.get();
  const headers = {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
  return fetch(API_URL + "/api" + url, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json);
}

const api = {
  auth: {
    login: (user: any) => callApi("/auth/login", "POST", user),
    me: () => callApi("/auth/me"),
  },
  users: {
    get: () => callApi("/users"),
    add: (user: any) => callApi("/users", "POST", user),
    delete: (id: string) => callApi(`/users/${id}`, "DELETE"),
    changePassword: (data: any) =>
      callApi(`/users/changePassword`, "PUT", data),
    permission: (data: any) => callApi(`/users/permission`, "PUT", data),
  },
  plata: {
    get: () => callApi("/plata"),
    add: (plata: any) => callApi("/plata", "POST", plata),
    delete: (data: any) => callApi("/plata/delete", "POST", data),
  },
  suppliers: {
    get: () => callApi("/supplier"),
    add: (supplier: any) => callApi("/supplier", "POST", supplier),
  },
  greenInvoice: {
    companies: () => callApi("/greenInvoice/companies"),
    invoice: (order: any) => callApi("/greenInvoice/invoice", "POST", order),
    priceQuote: (order: any) =>
      callApi("/greenInvoice/priceQuote", "POST", order),
  },
  orders: {
    get: () => callApi(`/order`),
    create: (order: any) => callApi("/order", "POST", order),
    delete: (id: string) => callApi(`/order/${id}`, "DELETE"),
  },
  misc: {
    sendDocumentEmail: (data: any) => callApi("/email/document", "POST", data),
    sendDocumentSms: (data: any) => callApi("/email/sms", "POST", data),
    exchangeProducts: (data: any) => callApi("/exchange", "POST", data),
    getProductsReport: () => callApi("/exchange"),
  },
};

export default api;
