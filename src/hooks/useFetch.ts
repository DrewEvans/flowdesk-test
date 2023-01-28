
import  axios from 'axios'
import { useEffect, useState } from 'react';

export const  useFetch = (url: string, symbol: string|undefined) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const config = {
        method: 'get',
        url: `https://data.binance.com${url}?symbol=${symbol}`,
        // headers: { }
      };

      useEffect(() => {
        //setloading to true
        setLoading(true);
        //make call to the URL to get the data
            axios(config)
          //if response received return set state with the response
          .then((response :any) => {
            setData(response.data);
          })
          //if error return error message
          .catch((err: any) => {
            setError(err);
          })
          //once one of the two request are met, set loading to false
          .finally(() => {
            setLoading(false);
          });
        //re-render if URL is change after load
      }, [url]);

    return data;
}