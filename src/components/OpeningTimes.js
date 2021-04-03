function OpeningTimes(props) {
  return (
    <table className="nhsuk-table">
      <thead className="nhsuk-table__head">
        <tr role="row">
          <th role="columnheader" className="" scope="col">
            Day
          </th>
          <th role="columnheader" className="" scope="col">
            Opening hours
          </th>
        </tr>
      </thead>
      <tbody className="nhsuk-table__body">
        { (props.openingTimes || []).map((row, rowIndex) => (
          <tr role="row" className="nhsuk-table__row" key={`openingTimesRow${rowIndex}`}>
            { row.map(({ text }, cellIndex) => (
              <td className="nhsuk-table__cell" key={`openingTimesCell${rowIndex}${cellIndex}`}>
                { text }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OpeningTimes;
