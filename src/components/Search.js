import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import postcodes from 'node-postcodes.io';

function Search(props) {

  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { result: { latitude, longitude } } = await postcodes.lookup(query);
    props.history.push(`/results/?query=${query}&latitude=${latitude}&longitude=${longitude}`);
  }

  const handleQuery = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <h1>Find a test centre</h1>
      <form onSubmit={handleSubmit}>
        <div className="nhsuk-form-group">
          <label className="nhsuk-label" htmlFor="Query">
            Enter a town, city or postcode
          </label>
          <input className="nhsuk-input nhsuk-input--width-20" id="Query" name="Query" value={query} onChange={handleQuery} type="text" />
        </div>
        <button className="nhsuk-button" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default withRouter(Search);
