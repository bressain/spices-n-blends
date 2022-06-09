import './index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllBlends, useGetAllSpices } from '../api';

function Home() {
  const [searchString, updateSearchString] = useState('');
  const spicesQuery = useGetAllSpices();
  const blendsQuery = useGetAllBlends();

  return (
    <div className="App">
      <h4>Spice List</h4>
      <div>
        <input
          value={searchString}
          onChange={(e) => {
            updateSearchString(e.target.value);
          }}
        />
      </div>
      {spicesQuery.isFetched &&
        spicesQuery.data
          .filter((spice) =>
            spice.name.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((spice) => (
            <div key={spice.id}>
              <Link to={`/spices/${spice.id}`}>{spice.name}</Link>
            </div>
          ))}
      <h4>Blend List</h4>
      {blendsQuery.isFetched &&
        blendsQuery.data
          .filter((blend) =>
            blend.name.toLowerCase().includes(searchString.toLowerCase())
          )
          .map((blend) => (
            <div key={blend.id}>
              <Link to={`/blends/${blend.id}`}>{blend.name}</Link>
            </div>
          ))}
    </div>
  );
}

export default Home;
