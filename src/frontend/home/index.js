import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useGetAllBlends, useGetAllSpices } from '../api';
import Search from './search';

const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 20px;
`;
const ListContainer = styled.div`
  width: 400px;
  & > h1 {
    text-align: center;
  }

  & > ul {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    height: 70vh;
    overflow-y: scroll;
    line-height: 1.5;
    border: 1px solid #aaa;
    border-radius: 5px;
  }

  & > a {
    display: block;
    margin-top: 4px;
  }
`;

function Home() {
  const [spiceSearch, setSpiceSearch] = useState('');
  const [blendSearch, setBlendSearch] = useState('');
  const spicesQuery = useGetAllSpices();
  const blendsQuery = useGetAllBlends();

  return (
    <Container>
      <ListContainer>
        <h1>Spice List</h1>
        <Search search={spiceSearch} onSearchChanged={setSpiceSearch} />
        <ul>
          {!spicesQuery.isLoading &&
            spicesQuery.data
              .filter((spice) =>
                spice.name.toLowerCase().includes(spiceSearch.toLowerCase())
              )
              .map((spice) => (
                <li key={spice.id}>
                  <Link to={`/spices/${spice.id}`}>{spice.name}</Link>
                </li>
              ))}
        </ul>
      </ListContainer>
      <ListContainer>
        <h1>Blend List</h1>
        <Search search={blendSearch} onSearchChanged={setBlendSearch} />
        <ul>
          {!blendsQuery.isLoading &&
            blendsQuery.data
              .filter((blend) =>
                blend.name.toLowerCase().includes(blendSearch.toLowerCase())
              )
              .map((blend) => (
                <li key={blend.id}>
                  <Link to={`/blends/${blend.id}`}>{blend.name}</Link>
                </li>
              ))}
        </ul>
        <Link to="/blends/new">Add new blend</Link>
      </ListContainer>
    </Container>
  );
}

export default Home;
