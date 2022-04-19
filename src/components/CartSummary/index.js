import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartData} = value

      let total = 0
      cartData.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <div className="order-total-value">
              <h1 className="order-total-label">Order Total:</h1>
              <p className="order-total-label" testid="total-price">
                Rs {total} /-
              </p>
            </div>
            <p className="total-items">{cartData.length} Items in cart</p>
            <Link to="/payment-success">
              <button type="button" className="checkout-button">
                Place Order
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
