import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com/"
	}),
	endpoints: (builder) => ({
		getUsers: builder.query<User[], null>({
			query: () => "users"
		}),
		getUserById: builder.query<User, {id: string}>({
			query: ({id}) => `users/${id}`
		})
	}),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;