import { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import getTestCentres from '../lib/getTestCentres';
import getFilters from '../lib/getFilters';

import Filters from './Filters';
import OpeningTimes from './OpeningTimes';
import defaultFilters from '../constants/defaultFilters';

function Results(props) {
  const [filters, setFilters] = useState(defaultFilters);
  const [filteredResults, setFilteredResults] = useState([]);

  const { query } = queryString.parse(props.location.search);
  
  useEffect(() => {
    const queries = queryString.parse(props.location.search);
    // Get filter state and checked filters based on URL
    const { filters, checkedFilters } = getFilters(queries);
    // Get test centres ordered by distance and filtered
    const results = getTestCentres(props.testCentres, checkedFilters, queries.latitude, queries.longitude);
    // Set state for use in templates
    setFilteredResults(results);
    setFilters(filters);
	}, [props.testCentres, props.location.search]);

  return (
    <>
      <div className="nhsuk-back-link">
        <Link className="nhsuk-back-link__link" to="/">
          <svg className="nhsuk-icon nhsuk-icon__chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
          </svg>
          Go back
        </Link>
      </div>
      <h1>Test centres near "{query}"</h1>
      <details className="nhsuk-details nhsuk-expander">
        <summary className="nhsuk-details__summary">
          <span className="nhsuk-details__summary-text">
            Filter results
          </span>
        </summary>
        <div className="nhsuk-details__text">
          <Filters filters={filters} />
        </div>
      </details>
      <p>Results are ordered by neared first</p>
      <ul className="nhsuk-list app-results__list nhsuk-u-padding-top-4">
        {filteredResults.map((testCentre, index) => (
          <li className="app-results__list-item nhsuk-u-padding-bottom-4 nhsuk-u-margin-bottom-4" key={`result${index}`}>
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-one-half">
                <h2 className="nhsuk-heading-m nhsuk-u-padding-top-0 nhsuk-u-margin-bottom-2">
                  <Link to={`/profile/${ testCentre.id }`}>{ testCentre.name }</Link>
                </h2>
                <p className="nhsuk-u-margin-bottom-0">{ testCentre.fullAddress }</p>
              </div>
              <div className="nhsuk-grid-column-one-half">
                <div className="nhsuk-card nhsuk-u-margin-bottom-0">
                  <div className="nhsuk-card__content">
                    <details className="nhsuk-details">
                      <summary className="nhsuk-details__summary">
                        <span className="nhsuk-details__summary-text">
                          Opening times
                        </span>
                      </summary>
                      <div className="nhsuk-details__text app-details__text">
                        <OpeningTimes openingTimes={testCentre.openingTimes} />
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default withRouter(Results);
