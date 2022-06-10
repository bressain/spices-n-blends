import { useMemo } from 'react';
import { useGetBlends } from '../api';

export function useGetParentAndChildSpiceIds(blend) {
  const childBlends = useGetBlends(blend ? blend.blends : []);

  return useMemo(
    () => getUniqueSpiceIds(blend, childBlends),
    [blend, childBlends]
  );
}

function getUniqueSpiceIds(parentBlend, childBlendQueries) {
  if (!parentBlend) return [];
  if (!parentBlend.blends.length) return parentBlend.spices;
  if (childBlendQueries.some((cb) => cb.isLoading)) return [];

  const parentAndChildSpiceIds = [
    ...parentBlend.spices,
    ...childBlendQueries.reduce(
      (childSpices, cb) => childSpices.concat(cb.data.spices),
      []
    ),
  ];
  const uniqueSpiceIdsMap = parentAndChildSpiceIds.reduce(
    (uniqueSpices, spice) => {
      if (!uniqueSpices[spice]) {
        uniqueSpices[spice] = spice;
      }
      return uniqueSpices;
    },
    {}
  );
  return Object.keys(uniqueSpiceIdsMap);
}
