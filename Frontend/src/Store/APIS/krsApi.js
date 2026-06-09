import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const krsApi = createApi({
  reducerPath: "krsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api" || import.meta.env.VITE_API_URL,
    credentials: "include",
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({

    /* =========================
       AUTH APIs
    ========================= */

    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),


    /* =========================
       PRODUCT APIs
    ========================= */

    // GET ALL PRODUCTS
    getProducts: builder.query({
      query: () => "/product",
      providesTags: ["Product"],
    }),

    // GET SINGLE PRODUCT
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"],
    }),

    // CREATE PRODUCT (with images)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

/* =========================
   AUTO-GENERATED HOOKS
========================= */

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetProductsQuery,

  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = krsApi;