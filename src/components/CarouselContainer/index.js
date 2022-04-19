import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CarouselContainer extends Component {
  state = {
    offerData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.offers.map(eachItem => ({
        imageUrl: eachItem.image_url,
        id: eachItem.id,
      }))

      this.setState({
        offerData: updatedData,
        apiStatus: apiStatusConstants.success,
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
      testid="restaurants-offers-loader"
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
      <button type="button" className="retry-button">
        Home Page
      </button>
    </div>
  )

  renderCarouselView = () => {
    const {offerData} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <ul>
        <Slider {...settings}>
          {offerData.map(eachItem => (
            <li key={eachItem.id}>
              <img className="slider-img" src={eachItem.imageUrl} alt="offer" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderAllOffers = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="carousel">{this.renderAllOffers()}</div>
  }
}

export default CarouselContainer
