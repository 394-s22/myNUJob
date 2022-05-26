import React from 'react'
import '../styles/FilterMenu.css'
import Filter from './Filter.js'
import SortBar from './SortBar.js';


// const categories = ["Research", "Athletics and Recreation", "Technical", "Laboratory Work"]
// quarter = spring, winter, fall
// wage
// work arrangements

const FilterMenu = ({jobCategories, filterCategories, setFilterCategories, sortDirection, setSortDirection}) => {
  
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
      <div className="sort-bar">
					<SortBar sortDirection={sortDirection} setSortDirection={setSortDirection} dataCy="sort-bar"/>
			</div>
    </div>
  )
}

export default FilterMenu;
