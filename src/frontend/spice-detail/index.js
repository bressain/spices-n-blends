import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useGetSpice } from '../api';
import DetailLayout from '../components/detail-layout';

const LabelElementContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;

  & > label {
    font-weight: bold;
  }
`;

function LabeledElement({ label, children }) {
  return (
    <LabelElementContainer>
      <label>{label}</label>
      {children}
    </LabelElementContainer>
  );
}

const ColorCircle = styled.span`
  background-color: #${({ hexColor }) => hexColor};
  height: 1em;
  width: 1em;
  border-radius: 50%;
`;

function SpiceDetail() {
  const { id } = useParams();
  const spiceQuery = useGetSpice(id);

  if (spiceQuery.isLoading) {
    return <DetailLayout>Loading...</DetailLayout>;
  }
  if (spiceQuery.isError) {
    return <DetailLayout>There was an error loading spice 😱</DetailLayout>;
  }

  return (
    <DetailLayout>
      <h1>{spiceQuery.data.name}</h1>
      <LabeledElement label="Color:">
        <ColorCircle hexColor={spiceQuery.data.color.padStart(6, '0')} />
      </LabeledElement>
      <LabeledElement label="Cost:">{spiceQuery.data.price}</LabeledElement>
      <LabeledElement label="Heat Level:">
        {Array(spiceQuery.data.heat).fill('🔥').join('')}
      </LabeledElement>
    </DetailLayout>
  );
}

export default SpiceDetail;
