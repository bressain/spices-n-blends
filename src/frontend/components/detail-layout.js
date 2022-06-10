import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin-left: 2em;
  line-height: 1.5;

  & label {
    font-weight: bold;
  }
  & > a {
    display: block;
    margin-top: 20px;
  }
`;

function DetailLayout({ children }) {
  return (
    <Container>
      {children}
      <Link to="/">{'<< Back to spice list'}</Link>
    </Container>
  );
}

export default DetailLayout;
