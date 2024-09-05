import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";


export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/login`,
                method:"POST",
                body:data

            }),
        }),
        register: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}`,
              method: "POST",
              body: data,
            }),
          }),
      
          logout: builder.mutation({
            query: () => ({
              url: `${USER_URL}/logout`,
              method: "POST",
            }),
          }),
      
          profile: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/profile`,
              method: "PUT",
              body: data,
            }),
          }),
          delete: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/profile`,
              method: "DELETE",
              body: data,
            }),
          }),
      
          getUsers: builder.query({
            query: () => ({
              url: USER_URL,
            }),
          }),

    })
})
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteMutation
  } = userApiSlice;