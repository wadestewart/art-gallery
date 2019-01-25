import React, { Component } from 'react'

import Header from '../header/Header'
import Flashcard from '../flashcard/Flashcard'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentIndex: 0,
      timer: 2,
    }
  }

  next = () => {
    let nextIndex = 
      this.state.currentIndex +1 !== this.state.artworks.length
      ? this.state.currentIndex +1
      : this.state.currentIndex

    this.setState({
      currentIndex: nextIndex,
    })
  }

  componentDidMount = () => {
    fetch('https://art-history-back.herokuapp.com/')
      .then(res => res.json())
      .then(data => {
        this.setState({ artworks: data.objects })
      })
      .catch(err => console.log(err))
  }
      
  render() {
    // console.log(this.state.images)

    let flashcard = this.state.artworks[this.state.currentIndex]

    let artFlashcard = 
      (flashcard !== undefined)
      ? <Flashcard
          flashcard={flashcard}
          onTimerEnd={this.next}
        />
      : null 

    return (
      <div>
        <Header />
        {artFlashcard}
      </div>
    )
  }
}

export default App
