import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://simple-todo-sj.onrender.com/api',
  }),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    getTodo: builder.query<Array<any>, void>({
      query: () => '/getAll',
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation<{name: String}, {age: String}>({
      query: data => ({
        url: '/post',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    removeTodo: builder.mutation<{id: Number}>({
      query: id => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {useGetTodoQuery, useAddTodoMutation, useRemoveTodoMutation} = api;
