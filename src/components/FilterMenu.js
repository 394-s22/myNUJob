import React, { Component } from 'react'

const FilterMenu = ({filterCategories, setFilterCategories}) => {

  const toggle = (x, lst) =>
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst];

  return (
    <div className='filter-menu'>
      <h2>Filter by</h2>
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
      <div>
        <input class="form-check-input" type="checkbox" value="Technical" id="flexCheckDefault"
          onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))}/>
        <label class="form-check-label" for="flexCheckDefault">
          Technical
        </label>
      </div>
      <div>
        <input class="form-check-input" type="checkbox" value="Laboratory Work" id="flexCheckDefault"
          onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))}/>
        <label class="form-check-label" for="flexCheckDefault">
          Laboratory Work
        </label>
      </div>
    </div>
  )
}

export default FilterMenu;