import { Link } from 'react-router-dom';
import { useGetSpice } from '../api';

function SpiceItem({ id }) {
  const spiceQuery = useGetSpice(id);

  if (spiceQuery.isLoading) {
    return <li>Loading...</li>;
  }
  if (spiceQuery.isError) {
    return <li>Error loading spice 😕</li>;
  }

  return (
    <li>
      <Link to={`/spices/${id}`}>{spiceQuery.data.name}</Link>
    </li>
  );
}

export default SpiceItem;
