import React from 'react'
import '../styles/FilterMenu.css'
import Filter from './Filter.js'

// const categories = ["Research", "Athletics and Recreation", "Technical", "Laboratory Work"]

const FilterMenu = ({jobCategories, filterCategories, setFilterCategories}) => {

  return (
    <div className='filter-menu'>
      <h2>Filters</h2>
      <h4>Category</h4>
      {jobCategories.map((category) => 
        <Filter filterCategories={filterCategories} setFilterCategories={setFilterCategories} value={category} />
      )}
    </div>
  )
}

export default FilterMenu;