import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetailSection from './components/RestaurantDetailSection'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import PaymentSuccess from './components/PaymentSuccess'

import './App.css'

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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: [],
    }
  }

  componentDidMount() {
    if (localStorage.getItem('cartData')) {
      this.setState({
        cartData: JSON.parse(localStorage.getItem('cartData')),
      })
    } else {
      const {cartData} = this.state
      localStorage.setItem('cartData', JSON.stringify(cartData))
    }
  }

  componentDidUpdate() {
    const {cartData} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  removeAllCartItems = () => {
    this.setState({cartData: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartData: prevState.cartData.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartData} = this.state
    const foodObject = cartData.find(eachCartItem => eachCartItem.id === id)
    if (foodObject.quantity > 1) {
      this.setState(prevState => ({
        cartData: prevState.cartData.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartData: updatedCartData})
  }

  addCartItem = foodItem => {
    const {cartData} = this.state
    const foodObject = cartData.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )

    if (foodObject) {
      this.setState(prevState => ({
        cartData: prevState.cartData.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodItem.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartData = [...cartData, foodItem]

      this.setState({cartData: updatedCartData})
    }
  }

  render() {
    const {cartData} = this.state
    return (
      <CartContext.Provider
        value={{
          cartData,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            sortByOptions={sortByOptions}
          />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetailSection}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/payment-success"
            component={PaymentSuccess}
          />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
