import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    start: 1,
    end: 20,
  }

  onIncrement = () => {
    const {end} = this.state

    if (end < 30) {
      this.setState(prevState => ({
        start: prevState.start + 20,
        end: prevState.end + 10,
      }))
    }
  }

  onDecrement = () => {
    const {end} = this.state

    if (end >= 20) {
      this.setState(prevState => ({
        start: prevState.start - 20,
        end: prevState.end - 10,
      }))
    }
  }

  render() {
    const {start, end} = this.state

    return (
      <div>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>
          `{start} to {end}`
        </div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
