// "use server";
"use client";
import Axios, { AxiosResponse, AxiosRequestConfig, ResponseType } from "axios";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

const API_URL: string = "";

// Request
// Access Token + URL
export const createRequest = async (url: string): Promise<AxiosResponse> => {
  const access_token = Cookies.get("access_token");
  // const access_token = cookies().get("access_token")?.value ?? "";
  if (!access_token) {
    throw new Error("Access token not found");
  }
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.get(`${API_URL}${url}`, config);
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      // Error dari server (status 4xx atau 5xx)
      throw {
        message: `API Request for ${url} failed with status ${err.response.status}`,
        status: err.response.status,
        data: err.response.data.meta,
      };
    } else if (err.request) {
      // Tidak ada respons dari server
      throw {
        message: `No response received for API Request to ${url}`,
        request: err.request,
      };
    } else {
      // Error saat mengatur request
      throw {
        message: `Error setting up API Request to ${url}: ${err.message}`,
      };
    }
  }
};

// post request
export const createPostRequest = async (
  url: string,
  data?: Record<string, any> | FormData
): Promise<AxiosResponse> => {
  try {
    const access_token = Cookies.get("access_token");
    // const access_token = cookies().get("access_token")?.value ?? "";

    if (!access_token) {
      throw new Error("Access token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...(data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : {}),
      },
    };
    const response: AxiosResponse = await Axios.post(
      `${API_URL}${url}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      // Error dari server (status 4xx atau 5xx)
      throw {
        message: `API Request for ${url} failed with status ${err.response.status}`,
        status: err.response.status,
        data: err.response.data.meta,
      };
    } else if (err.request) {
      // Tidak ada respons dari server
      throw {
        message: `No response received for API Request to ${url}`,
        request: err.request,
      };
    } else {
      // Error saat mengatur request
      throw {
        message: `Error setting up API Request to ${url}: ${err.message}`,
      };
    }
  }
};

// Update - put
export const createPutRequest = async (
  url: string,
  data: any,
  access_token?: string
): Promise<AxiosResponse> => {
  try {
    const access_token = Cookies.get("access_token");
    // const access_token = cookies().get("access_token")?.value ?? "";
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.put(
      `${API_URL}${url}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(`API POST Request for ${url} failed: ${err.message}`);
  }
};

// Update - patch
export const createPatchRequest = async (
  url: string,
  data: any,
  access_token?: string
): Promise<AxiosResponse> => {
  try {
    const access_token = Cookies.get("access_token");
    // const access_token = cookies().get("access_token")?.value ?? "";
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.patch(
      `${API_URL}${url}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      // Error dari server (status 4xx atau 5xx)
      throw {
        message: `API Request for ${url} failed with status ${err.response.status}`,
        status: err.response.status,
        data: err.response.data.meta,
      };
    } else if (err.request) {
      // Tidak ada respons dari server
      throw {
        message: `No response received for API Request to ${url}`,
        request: err.request,
      };
    } else {
      // Error saat mengatur request
      throw {
        message: `Error setting up API Request to ${url}: ${err.message}`,
      };
    }
  }
};

// Delete
export const deleteRequest = async (url: string): Promise<AxiosResponse> => {
  try {
    const access_token = Cookies.get("access_token");
    // const access_token = cookies().get("access_token")?.value ?? "";
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };
    const response: AxiosResponse = await Axios.delete(
      `${API_URL}${url}`,
      config
    );
    return response.data;
  } catch (error) {
    const err = error as any;
    throw new Error(`API POST Request for ${url} failed: ${err.message}`);
  }
};

// No Auth
export const createRequestNoAuth = async (
  url: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await Axios.get(`${API_URL}${url}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      // Error dari server (status 4xx atau 5xx)
      throw {
        message: `API Request for ${url} failed with status ${err.response.status}`,
        status: err.response.status,
        data: err.response.data.meta,
      };
    } else if (err.request) {
      // Tidak ada respons dari server
      throw {
        message: `No response received for API Request to ${url}`,
        request: err.request,
      };
    } else {
      // Error saat mengatur request
      throw {
        message: `Error setting up API Request to ${url}: ${err.message}`,
      };
    }
  }
};

// Post No Auth
export const createPostRequestNoAuth = async (
  url: string,
  data?: Record<string, any> | FormData
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await Axios.post(`${API_URL}${url}`, data);
    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      // Error dari server (status 4xx atau 5xx)
      throw {
        message: `API Request for ${url} failed with status ${err.response.status}`,
        status: err.response.status,
        data: err.response.data.meta,
      };
    } else if (err.request) {
      // Tidak ada respons dari server
      throw {
        message: `No response received for API Request to ${url}`,
        request: err.request,
      };
    } else {
      // Error saat mengatur request
      throw {
        message: `Error setting up API Request to ${url}: ${err.message}`,
      };
    }
  }
};