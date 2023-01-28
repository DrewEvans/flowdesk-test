import { useEffect, useState } from 'react';
import axios from 'axios';

async function useFetch<TResponse>(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //call function to update the data on first render from the API
  useEffect(() => {
    //setloading to true
    setLoading(true);
    //make call to the URL to get the data
    axios
      .get(url)
      //if response received return set state with the response
      .then((response) => {
        setData(response.data);
      })
      //if error return error message
      .catch((err) => {
        setError(err);
      })
      //once one of the two req are meet, set loading to false
      .finally(() => {
        setLoading(false);
      });
    //re-render if URL is change after load
  }, [url]);

  //call function to update the data from the API
  const refetch = () => {
    //data is being loaded
    setLoading(true);
    //make call to the URL to get the data
    axios
      .get(url)
      //if response received return set state with the response
      .then((response) => {
        setData(response.data);
      })
      //if error return error message
      .catch((err) => {
        setError(err);
      })
      //once one of the two req are meet, set loading to false
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default useFetch;