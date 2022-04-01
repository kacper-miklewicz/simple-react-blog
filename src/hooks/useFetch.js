import { useState, useEffect } from "react";

export const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsPending(true);

        const response = await fetch(url, { signal: abortController.signal });
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

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
