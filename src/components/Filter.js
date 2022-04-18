import React from 'react'
import '../styles/Filter.css'

const toggle = (x, lst) => 
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst];

const Filter = ({ filterCategories, setFilterCategories, value }) => {
  return (
    <div className='filter'>
      <input className="form-check-input" type="checkbox" value={value}
        onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))} />
      <label className="form-check-label" for="flexCheckDefault">
        {value}
      </label>
    </div>
  )
}
export default Filter;