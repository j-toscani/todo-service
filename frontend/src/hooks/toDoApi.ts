import { ApiToDo } from "../types/ToDo.interface";

const BACKEND_URL = import.meta.env.DEV ? '/_api/' : import.meta.env.BASE_URL;

export type ApiResult<T> = { data: T | null; error: Error | null };

function useToDoApi<T = ApiToDo>() {
  return {
    deleteToDo(id: string) {
      return fetchFromApi<T>(`${BACKEND_URL}todo/${id}`, {
        method: "DELETE",
      });
    },
    createToDo(data: Partial<ApiToDo>) {
      return fetchFromApi<T>(`${BACKEND_URL}todo/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    },
    updateToDo(data: ApiToDo, id: string) {
      return fetchFromApi<T>(`${BACKEND_URL}todo/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    },
    getToDos(query?: string) {
      return fetchFromApi<T[]>(
        `${BACKEND_URL}todo${query ? `?query=${query}` : ""}`
      );
    },
    getToDo(id: string) {
      return fetchFromApi<T>(`${BACKEND_URL}todo/${id}`);
    },
  };
}

async function fetchFromApi<T>(
  ...options: Parameters<typeof fetch>
): Promise<ApiResult<T>> {
  const response = await fetch(...options);

  const result = {
    data: null,
    error: null,
  };

  try {
    if (!response.ok) {
      throw new Error(
        `Response was not ok: [${response.status}] ${
          options[1]?.method ?? "GET"
        }: ${options[0]}`
      );
    }

    result.data = await response.json();
  } catch (error: any) {
    result.error = error;
  }

  return result;
}

export default useToDoApi;
