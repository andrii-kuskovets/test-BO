import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  };
  useEffect(fetchData, [url]);

  return [data, loading, error, fetchData];
}
