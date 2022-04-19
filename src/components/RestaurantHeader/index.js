import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId} = props
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  return (
    <div className="restaurant-header">
      <div>
        <h1 className="restaurant-list-heading">Popular Restaurants</h1>
        <p className="restaurant-list-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <div className="sort-by-icon-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
        </div>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RestaurantHeader
