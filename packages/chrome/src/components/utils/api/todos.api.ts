import api from "./api";

export type Todo = {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">;
export type UpdateTodo = Omit<Todo, "createdAt" | "updatedAt">;

const getTodos = async (completed?: boolean | undefined) => {
  const response = await api.get("/todos", {
    params: {
      completed,
    },
  });
  return response.data;
};

const getTodoById = async (id: string) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

const createTodo = async (todo: Todo) => {
  const response = await api.post("/todos", { title: todo.title });
  return response.data;
};

const updateTodo = async (todo: Todo) => {
  const response = await api.put(`/todos/${todo.id}`, { title: todo.title });
  return response.data;
};

const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

const toggleTodo = async (id: string, completed: boolean) => {
  const response = await api.put(`/todos/${id}`, { completed });
  return response.data;
};

const searchTodos = async (query: string) => {
  const response = await api.get(`/todos/search?q=${query}`);
  return response.data;
};

export {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  searchTodos,
  getTodoById,
};
