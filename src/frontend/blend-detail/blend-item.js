import { Link } from 'react-router-dom';
import { useGetBlend } from '../api';

function BlendItem({ id }) {
  const blendQuery = useGetBlend(id);

  return (
    <li>
      <Link to={`/blends/${id}`}>
        {blendQuery.isSuccess ? blendQuery.data.name : ''}
      </Link>
    </li>
  );
}

export default BlendItem;
