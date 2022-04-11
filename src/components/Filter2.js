// testing different style checkbox
import '../styles/Filter2.css'

const toggle = (x, lst) =>
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst];

const Filter2 = ({ filterCategories, setFilterCategories, value }) => {
  return (

    <div class="page__toggle">
      <label class="toggle">
        <input class="toggle__input" type="checkbox" value={value} id="flexCheckDefault"
        onChange={e => setFilterCategories(toggle(e.target.value, filterCategories))} />
        <span class="toggle__label">
          <span class="toggle__text">Check Me!</span>
        </span>
      </label>
    </div>
  )
}
export default Filter2