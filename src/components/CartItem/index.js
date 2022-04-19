import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, imageUrl, name, quantity, cost} = cartItemDetails

      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      const totalPrice = cost * quantity

      return (
        <li className="cart-item" testid="cartItem">
          <div className="cart-product-title-brand-container">
            <img className="cart-product-image" src={imageUrl} alt={name} />
            <h1 className="cart-product-title">{name}</h1>
          </div>
          <div className="cart-item-details-container">
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                testid="decrement-quantity"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                type="button"
                className="quantity-controller-button"
                testid="increment-quantity"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
          </div>
          <div className="total-price-remove-container">
            <p className="cart-total-price" testid="total-price">
              Rs {totalPrice}/-
            </p>
            <button
              className="remove-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              Remove
            </button>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
