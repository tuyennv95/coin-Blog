
  import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

  const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'eb04958d07msh6dc382dd27b8cfbp121c5djsn8840e35c2b67'
  }
  const baseUrl = "https://coinranking1.p.rapidapi.com";

  const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

  export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
      getCryptoDetails: builder.query({
        query:(coinId) => createRequest(`/coin/${coinId}`),
      }),
      getCryptoHistory: builder.query({
        query:({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
      })
    })
  })
 

  export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;