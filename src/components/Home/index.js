import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import Header from '../Header'
import RestaurantCard from '../RestaurantCard'
import RestaurantHeader from '../RestaurantHeader'
import CarouselContainer from '../CarouselContainer'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantList: [],
      apiStatus: apiStatusConstants.initial,
      activeOptionId: sortByOptions[1].value,
      searchInput: '',
      activePage: 1,
      totalItems: 0,
    }
  }

  componentDidMount() {
    this.getRestaurant()
  }

  getRestaurant = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, searchInput, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit

    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        hasOnlineDelivery: eachItem.has_online_delivery,
        userRating: eachItem.user_rating,
        name: eachItem.name,
        hasTableBooking: eachItem.has_table_booking,
        isDeliveringNow: eachItem.is_delivering_now,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        menuType: eachItem.menu_type,
        location: eachItem.location,
        opensAt: eachItem.opens_at,
        groupByTime: eachItem.group_by_time,
      }))

      const totalItems = fetchedData.total

      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
        totalItems,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="restaurant-loader-container"
      testid="restaurants-list-loader"
    >
      <Loader type="Audio" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="all-restaurant-error"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading-text">Page Not Found</h1>
      <p className="restaurant-failure-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="retry-button">
          Home Page
        </button>
      </Link>
    </div>
  )

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurant)
  }

  enterSearchInput = () => {
    this.getRestaurant()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput, activePage: 1}, this.getRestaurant)
  }

  onChangeSearchInput = event => this.changeSearchInput(event.target.value)

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  onClickLeft = () => {
    this.setState(prevState => {
      if (prevState.activePage > 1) {
        return {activePage: prevState.activePage - 1}
      }
      return {activePage: prevState.activePage}
    }, this.getRestaurant)
  }

  onClickRight = () => {
    this.setState(prevState => {
      const totalPages = prevState.totalItems / 9
      if (prevState.activePage <= totalPages) {
        return {activePage: prevState.activePage + 1}
      }
      return {activePage: prevState.activePage}
    }, this.getRestaurant)
  }

  renderRestaurantListView = () => {
    const {restaurantList, activeOptionId, activePage, totalItems} = this.state
    return (
      <div className="all-restaurant-container">
        {this.renderSearchInput()}
        <RestaurantHeader
          activeOptionId={activeOptionId}
          sortByOptions={sortByOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="restaurant-list">
          {restaurantList.map(restaurant => (
            <RestaurantCard
              restaurantData={restaurant}
              key={restaurant.id}
              testid="restaurant-item"
            />
          ))}
        </ul>
        <div className="page-container">
          <button
            type="button"
            className="page-controller-button"
            testid="pagination-left-button"
            onClick={this.onClickLeft}
          >
            <MdKeyboardArrowLeft color="#52606D" size={20} />
          </button>
          <p className="page-no-quantity">
            <span testid="active-page-number">{activePage}</span> of{' '}
            {Math.ceil(totalItems / 9)}
          </p>
          <button
            type="button"
            className="page-controller-button"
            testid="pagination-right-button"
            onClick={this.onClickRight}
          >
            <MdKeyboardArrowRight color="#52606D" size={20} />
          </button>
        </div>
      </div>
    )
  }

  renderAllRestaurants = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <CarouselContainer />
        {this.renderAllRestaurants()}
        <Footer />
      </>
    )
  }
}

export default Home
