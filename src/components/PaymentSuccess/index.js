import {Link} from 'react-router-dom'
import {BsFillCheckCircleFill} from 'react-icons/bs'

import Header from '../Header'

import CartContext from '../../context/CartContext'

import './index.css'

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const onClickGoToHome = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="paymentSuccess">
            <BsFillCheckCircleFill className="check-sign" />
            <h1 className="success-heading">Payment Successful</h1>
            <p className="success-description">
              Thank you for ordering
              <br />
              Your payment is successfully completed.
            </p>
            <Link to="/">
              <button
                type="button"
                className="go-to-button"
                onClick={onClickGoToHome}
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccess
