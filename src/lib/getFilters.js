import defaultFilters from '../constants/defaultFilters';

const getFilters = (queries) => {
  const filters = {
    ...defaultFilters,
  };
  
  Object.entries(queries).forEach(([key, value]) => {
    if (filters[key]) {
      filters[key] = {
        ...filters[key],
        checked: !filters[key].checked,
      }
    }
  });

  const checkedFilters = Object.values(filters).filter((filter) => filter.checked)

  return {
    filters,
    checkedFilters,
  };
};

export default getFilters;
