import axios from 'axios';
import { useQuery } from 'react-query';

const FIVE_MIN = 1000 * 60 * 5;

async function getAllSpices() {
  const { data } = await axios.get('/api/v1/spices');
  return data;
}
export function useGetAllSpices() {
  return useQuery('spices', getAllSpices, { staleTime: FIVE_MIN });
}

async function getSpice(spiceId) {
  const { data } = await axios.get(`/api/v1/spices/${spiceId}`);
  return data;
}
export function useGetSpice(spiceId) {
  return useQuery(['spices', spiceId], () => getSpice(spiceId), {
    staleTime: FIVE_MIN,
  });
}

async function getAllBlends() {
  const { data } = await axios.get('/api/v1/blends');
  return data;
}
export function useGetAllBlends() {
  return useQuery('blends', getAllBlends, { staleTime: FIVE_MIN });
}
