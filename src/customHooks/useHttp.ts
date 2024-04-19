import { useCallback, useEffect, useState } from "react";

interface FetchConfig {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

const sendHttpRequest = async (url: string, config: any) => {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "something went wrong");
  }

  return resData;
};

const useHttp = (url: string, config: FetchConfig, initialData?) => {
  const [error, setError] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const sendRequest = useCallback(
    async (data?) => {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    error,
    isLoading,
    data,
    sendRequest,
  };
};
export default useHttp;
