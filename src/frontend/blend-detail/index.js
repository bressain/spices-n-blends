import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useGetBlend } from '../api';
import BlendItem from './blend-item';
import { useGetParentAndChildSpiceIds } from './hooks';
import DetailLayout from '../components/detail-layout';
import SpiceItem from './spice-item';

const DescriptionContainer = styled.div`
  display: flex;
  column-gap: 4px;
  max-width: 500px;
`;

const ListContainer = styled.div`
  display: flex;
  column-gap: 4px;

  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const BlendDetail = () => {
  const { id } = useParams();
  const blendQuery = useGetBlend(id);
  const childSpiceIds = useGetParentAndChildSpiceIds(blendQuery.data);

  if (blendQuery.isLoading) {
    return <DetailLayout>Loading...</DetailLayout>;
  }
  if (blendQuery.isError) {
    return <DetailLayout>There was an error loading blend 😱</DetailLayout>;
  }

  return (
    <DetailLayout>
      <h1>{blendQuery.data.name}</h1>
      <DescriptionContainer>
        <label>Description:</label>
        <span>{blendQuery.data.description}</span>
      </DescriptionContainer>
      <ListContainer>
        <label>Spices:</label>
        <ul>
          {childSpiceIds.map((spiceId) => (
            <SpiceItem key={spiceId} id={spiceId} />
          ))}
        </ul>
      </ListContainer>
      {blendQuery.data.blends.length ? (
        <ListContainer>
          <label>Included Blends:</label>
          <ul>
            {blendQuery.data.blends.map((blendId) => (
              <BlendItem key={blendId} id={blendId} />
            ))}
          </ul>
        </ListContainer>
      ) : undefined}
    </DetailLayout>
  );
};

export default BlendDetail;
