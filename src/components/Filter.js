import React from 'react'
import '../styles/Filter.css'

const toggle = (x, lst) => 
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst];

const Filter = ({ filterCategories, setFilterCategories, value }) => {
  return (
    <div className='filter'>
      <input class="form-check-input" type="checkbox" value={value}
        onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))} />
      <label class="form-check-label" for="flexCheckDefault">
        {value}
      </label>
    </div>
  )
}
export default Filter;