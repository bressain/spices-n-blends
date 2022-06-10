import axios from 'axios';
import { QueryClient, useMutation, useQueries, useQuery } from 'react-query';

const FIVE_MIN = 1000 * 60 * 5;
const SPICES_KEY = 'spices';
const BLENDS_KEY = 'blends';

export const queryClient = new QueryClient();

async function getAllSpices() {
  const { data } = await axios.get('/api/v1/spices');
  return data;
}
export function useGetAllSpices() {
  return useQuery(SPICES_KEY, getAllSpices, {
    staleTime: FIVE_MIN,
    onSuccess: (data) => {
      // load already fetched data into cache
      data.forEach((d) => {
        queryClient.setQueryData([SPICES_KEY, d.id], d);
      });
    },
  });
}

async function getSpice(spiceId) {
  const { data } = await axios.get(`/api/v1/spices/${spiceId}`);
  return data;
}
export function useGetSpice(spiceId) {
  // need to coerce ID to string since the key is [string, string]
  return useQuery([SPICES_KEY, spiceId.toString()], () => getSpice(spiceId), {
    staleTime: FIVE_MIN,
  });
}

async function getAllBlends() {
  const { data } = await axios.get('/api/v1/blends');
  return data;
}
export function useGetAllBlends() {
  return useQuery(BLENDS_KEY, getAllBlends, {
    staleTime: FIVE_MIN,
    onSuccess: (data) => {
      // load already fetched data into cache
      data.forEach((d) => {
        queryClient.setQueryData([BLENDS_KEY, d.id], d);
      });
    },
  });
}

async function getBlend(blendId) {
  const { data } = await axios.get(`/api/v1/blends/${blendId}`);
  return data;
}
export function useGetBlend(blendId) {
  // need to coerce ID to string since the key is [string, string]
  return useQuery([BLENDS_KEY, blendId.toString()], () => getBlend(blendId), {
    staleTime: FIVE_MIN,
  });
}
export function useGetBlends(blendIds) {
  return useQueries(
    blendIds.map((blendId) => ({
      queryKey: [BLENDS_KEY, blendId],
      queryFn: () => getBlend(blendId),
    }))
  );
}

async function saveBlend(blend) {
  return axios.post('/api/v1/blends', blend);
}
export function useSaveBlend() {
  return useMutation(saveBlend, {
    onSuccess: (res) => {
      // get all blends and add new one to caches (list & single)
      queryClient.setQueryData([BLENDS_KEY, res.data.id], res.data);

      const allBlends = queryClient.getQueryData(BLENDS_KEY);
      allBlends.push(res.data);
      queryClient.setQueryData(BLENDS_KEY, allBlends);
    },
  });
}
