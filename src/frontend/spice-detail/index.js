import { useParams } from 'react-router-dom';
import { useGetSpice } from '../api';

const SpiceDetail = () => {
  const { id } = useParams();
  const spiceQuery = useGetSpice(id);

  return (
    <div>
      <h2>Spice Detail Page</h2>
      {spiceQuery.isFetched && spiceQuery.data && (
        <div>
          <div>Spice Name: {spiceQuery.data.name}</div>
          <div>Spice Color: {spiceQuery.data.color}</div>
          <div>Spice Cost: {spiceQuery.data.price}</div>
          <div>Spice Heat Level: {spiceQuery.data.heat}</div>
        </div>
      )}
    </div>
  );
};

export default SpiceDetail;
