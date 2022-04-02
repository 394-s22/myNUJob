import React, { Component } from 'react'

const FilterMenu = ({filterCategories, setFilterCategories}) => {

  const toggle = (x, lst) =>
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst];

  return (
    <div className='filters'>
      <h2>Search</h2>
      <h4>Category</h4>
      <div>
        <input class="form-check-input" type="checkbox" value="Research" id="flexCheckDefault"
          onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))}/>
        <label class="form-check-label" for="flexCheckDefault">
          Research
        </label>
      </div>
      <div>
        <input class="form-check-input" type="checkbox" value="Athletics and Recreation" id="flexCheckDefault"
          onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))}/>
        <label class="form-check-label" for="flexCheckDefault">
          Athletics and Recreation
        </label>
      </div>
    </div>
  )
}

export default FilterMenu;