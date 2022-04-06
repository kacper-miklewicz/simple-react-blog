import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = postData => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...postData, id: nanoid() }),
    });
  };

  const deleteData = () => {
    setOptions({
      method: "DELETE",
    });
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async fetchOptions => {
      try {
        setIsPending(true);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = await response.json();

        setIsPending(false);
        setData(jsonData);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError("Couldn't fetch data.");
        console.log(err.message);
      }
    };

    if (method === "GET") {
      fetchData();
    }

    if (method === "POST" && options) {
      fetchData(options);
    }

    if (method === "DELETE" && options) {
      fetchData(options);
    }

    return () => {
      abortController.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData, deleteData };
};
