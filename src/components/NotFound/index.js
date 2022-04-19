import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="restaurant-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="not found"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading-text">Page Not Found</h1>
      <p className="restaurant-failure-description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="retry-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
