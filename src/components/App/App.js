import React, { Component } from 'react'

import Header from '../Header/Header'
import Flashcard from '../Flashcard/Flashcard'

class App extends Component {
  constructor() {
    super()

    this.state = {
      artworks:     [],
      // artwork_id:   "",
      currentIndex: 0,
      timer:        2
    }
  }

  next = () => {
    let nextIndex = 
      this.state.currentIndex +1 !== this.state.artworks.length
      ? this.state.currentIndex +1
      : this.state.currentIndex

    this.setState({
      currentIndex: nextIndex
    })
  }

  componentDidMount = () => {
    fetch('https://art-history-back.herokuapp.com/')
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          artworks: data.objects
        })
      })
      .catch(err => console.log(err))
  }
      
  render() {
    // console.log(this.state.artworks)

    let flashcard = this.state.artworks[this.state.currentIndex]

    let artFlashcard = 
      (flashcard !== undefined)
      ? <Flashcard
          card={flashcard}
          onTimerEnd={this.next}
        />
      : null

    return (
      <div className="art-gallery">
        <Header />
        {artFlashcard}
      </div>
    )
  }
}

export default App

