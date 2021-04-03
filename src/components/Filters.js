import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

function Filters(props) {
  // Set initial state from props which are build from current URL
  const [filters, setFilters] = useState(props.filters);

  // Update URL from state on submit which will trigger updated filters
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the query params we want to keep
    const { query, latitude, longitude } = queryString.parse(props.location.search);

    // Build an object of filterId and value to build new URL
    const checkedFilters = Object.values(filters)
      .filter((filter) => filter.checked)
      .reduce((obj, filter) => ({
        ...obj,
        [filter.id]: true
      }), {});

    // Build query string from essential params and checked filters
    const qs = queryString.stringify({
      query,
      latitude,
      longitude,
      ...checkedFilters,
    });
    
    // Update URL which will trigger full rerendering
    props.history.push(`/results/?${qs}`);
  }

  // Update local filter state on checkbox change
  const handleFilter = (e) => {
    const { id } = e.target;
    const newFilters = {
      ...filters,
      [id]: {
        ...filters[id],
        checked: !filters[id].checked,
      }
    }
    setFilters(newFilters);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="nhsuk-form-group">
        <fieldset className="nhsuk-fieldset">
          <legend className="nhsuk-fieldset__legend">Test site for people without symptoms</legend>
          <div className="nhsuk-checkboxes">
            { Object.values(filters).map((filter) => (
              <div className="nhsuk-checkboxes__item">
                <input className="nhsuk-checkboxes__input" id={filter.id} name="filter" type="checkbox" value="true" onChange={handleFilter} checked={filter.checked} />
                <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={filter.id}>{filter.display}</label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <button className="nhsuk-button">Apply filters</button>
    </form>
  );
}

export default withRouter(Filters);
