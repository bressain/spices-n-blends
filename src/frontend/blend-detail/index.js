import { Link, useParams } from 'react-router-dom';
import { useGetBlend, useGetSpice } from '../api';
import { useGetParentAndChildSpiceIds } from './hooks';

const SpiceItem = ({ id }) => {
  const spiceQuery = useGetSpice(id);

  if (spiceQuery.isError) return <li>Error loading spice 😕</li>;

  return (
    <li>
      <Link to={`/spices/${id}`}>
        {spiceQuery.isSuccess ? spiceQuery.data.name : ''}
      </Link>
    </li>
  );
};

const BlendItem = ({ id }) => {
  const blendQuery = useGetBlend(id);

  return (
    <li>
      <Link to={`/blends/${id}`}>
        {blendQuery.isSuccess ? blendQuery.data.name : ''}
      </Link>
    </li>
  );
};

const BlendDetail = () => {
  const { id } = useParams();
  const blendQuery = useGetBlend(id);
  const childSpiceIds = useGetParentAndChildSpiceIds(blendQuery.data);

  return (
    <div>
      <h2>Blend Detail Page</h2>
      {!blendQuery.isLoading && (
        <div>
          <div>Blend Name: {blendQuery.data.name}</div>
          <div>Blend Description: {blendQuery.data.description}</div>
          <div>
            <span>Spices:</span>
            <ul>
              {childSpiceIds.map((spiceId) => (
                <SpiceItem key={spiceId} id={spiceId} />
              ))}
            </ul>
          </div>
          {blendQuery.data.blends.length ? (
            <div>
              <span>Included Blends:</span>
              <ul>
                {blendQuery.data.blends.map((blendId) => (
                  <BlendItem key={blendId} id={blendId} />
                ))}
              </ul>
            </div>
          ) : undefined}
        </div>
      )}
    </div>
  );
};

export default BlendDetail;
