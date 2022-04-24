import React from 'react'
import '../styles/FilterMenu.css'
import Filter from './Filter.js'

// const categories = ["Research", "Athletics and Recreation", "Technical", "Laboratory Work"]
// quarter = spring, winter, fall
// wage
// work arrangements

const FilterMenu = ({jobCategories, filterCategories, setFilterCategories}) => {
  
  jobCategories.sort();
  return (
    <div className='filter-menu'>
      <h2>Filters</h2>
      <h4>Category</h4>
      {jobCategories.map((category) =>
        <Filter
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
          value={category}
          key={category} />
      )}
    </div>
  )
}

export default FilterMenu;
