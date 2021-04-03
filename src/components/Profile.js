import { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import getTestCentre from '../lib/getTestCentre';

import OpeningTimes from './OpeningTimes';

function Profile(props) {

  const [testCentre, setTestCentre] = useState([]);

  useEffect(() => {
    const result = getTestCentre(props.testCentres, props.match.params.id);
    setTestCentre(result);
	}, [props.testCentres, props.match.params.id]);

  return (
    testCentre &&
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-two-thirds">
        <div className="nhsuk-back-link">
          <Link className="nhsuk-back-link__link" onClick={() => props.history.goBack()}>
            <svg className="nhsuk-icon nhsuk-icon__chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
            </svg>
            Go back
          </Link>
        </div>
          <h1>{ testCentre.name }</h1>
          <p className="nhsuk-lede-text">
            { testCentre.additionalInfo }
          </p>
          <div className="nhsuk-grid-row nhsuk-card-group">
            <div className="nhsuk-grid-column-one-half nhsuk-card-group__item">
              <div className="nhsuk-card">
                <div className="nhsuk-card__content">
                  <h2 className="nhsuk-card__heading nhsuk-heading-s">
                    Address
                  </h2>
                  <p className="nhsuk-card__description">
                    { testCentre.fullAddress }
                  </p>
                </div>
              </div>
            </div>
            <div className="nhsuk-grid-column-one-half nhsuk-card-group__item">
              <div className="nhsuk-card">
                <div className="nhsuk-card__content">
                  <h2 className="nhsuk-card__heading nhsuk-heading-s">
                    Facilities
                  </h2>
                  <ul>
                    { (testCentre.facilities || []).map((facility, index) => (
                      <li key={`facility${index}`}>{ facility }</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          { testCentre.siteBookingUrl &&
            <>
              <h2>Book online</h2>
              <div className="nhsuk-action-link">
                <a className="nhsuk-action-link__link" href={testCentre.siteBookingUrl}>
                  <svg className="nhsuk-icon nhsuk-icon__arrow-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"></path>
                  </svg>
                  <span className="nhsuk-action-link__text">Book a test online</span>
                </a>
              </div>
            </>
          }

          <h2>Opening times</h2>
          <OpeningTimes openingTimes={testCentre.openingTimes} />
        </div>
      </div>
  );
}

export default withRouter(Profile);
