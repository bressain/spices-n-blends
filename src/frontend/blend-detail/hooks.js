import { useMemo } from 'react';
import { useGetParentAndChildBlends } from '../api';

export function useGetParentAndChildSpiceIds(blend) {
  const allBlends = useGetParentAndChildBlends(blend ? blend.id : undefined);

  return useMemo(() => getUniqueSpiceIds(allBlends), [allBlends]);
}

function getUniqueSpiceIds(blends) {
  const allSpiceIds = blends.reduce(
    (spices, cb) => spices.concat(cb.spices),
    []
  );
  const uniqueSpiceIdsMap = allSpiceIds.reduce((uniqueSpices, spice) => {
    if (!uniqueSpices[spice]) {
      uniqueSpices[spice] = spice;
    }
    return uniqueSpices;
  }, {});
  return Object.keys(uniqueSpiceIdsMap);
}
