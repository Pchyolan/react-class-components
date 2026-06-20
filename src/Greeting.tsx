import { Component } from 'react'

type GreetingProps = {
  name: string
}

class Greeting extends Component<GreetingProps>{
  render() {
    return (
      <h2>Hello, {this.props.name}!</h2>
    )
  }
}

export default Greeting