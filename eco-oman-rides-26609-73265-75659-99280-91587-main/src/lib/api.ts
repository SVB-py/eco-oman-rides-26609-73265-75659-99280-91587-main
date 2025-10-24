type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions extends RequestInit {
  method?: RequestMethod;
  parseJson?: boolean;
}

const api = {
  async request<TResponse = unknown>(url: string, options: ApiRequestOptions = {}) {
    const { parseJson = true, ...init } = options;
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (!parseJson) {
      return response as unknown as TResponse;
    }

    return (await response.json()) as TResponse;
  },
};

export default api;
