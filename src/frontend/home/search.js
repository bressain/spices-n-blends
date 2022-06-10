import styled from '@emotion/styled';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  row-gap: 2px;

  & > label {
    font-size: 0.8em;
    font-weight: bold;
    padding-left: 4px;
  }
`;

function Search({ search, onSearchChanged }) {
  return (
    <SearchContainer>
      <label htmlFor="search">Filter</label>
      <input
        value={search}
        onChange={(e) => {
          onSearchChanged(e.target.value);
        }}
      />
    </SearchContainer>
  );
}

export default Search;
