import React, { Component } from 'react'

class Flashcard extends Component {
    constructor(props) {
        super(props)

        this.decrementTimer = this.decrementTimer.bind(this)
        this.fetchData = this.fetchData.bind(this)

        this.state = {
            artwork: [],
            currentTimeout: null,
            imageUrl: '',
            timer: 1
        }
    }

    decrementTimer = () => {
        if (this.state.timer === 0) {
            this.props.onTimerEnd()
        } else {
            clearTimeout(this.state.currentTimeout)
            this.setState(prevState => ({
                timer: prevState.timer -1,
                currentTimeout: window.setTimeout(this.decrementTimer, 3000)
            }))
        }
    }

    fetchData = () => {
        const artwork = this.props.flashcard
        
        this.setState({
            currentTimeout: window.setTimeout(this.decrementTimer, 3000)
        })
        
        fetch(`https://art-history-back.herokuapp.com/${artwork.id}`)
            .then(res => res.json())
            .then(data => {
                let newImage = data.object.images[0].b.url
                this.setState({
                    artwork: data.object,
                    imageUrl: newImage
                 })
            })
            .catch(err => console.log(err))
    }
    
    componentDidMount = () => {
        this.fetchData()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.flashcard.id !== this.props.flashcard.id) {
            clearTimeout(this.state.currentTimeout)
            this.setState({
                timer: 1,
                currentTimeout: window.setTimeout(this.decrementTimer, 3000)
            })
            this.fetchData()
        }
    }

    render() {
        let imgUrl = this.state.imageUrl
        let artwork = this.state.artwork
        let detail

        if (artwork.title_raw !== null && artwork.title_raw !== "" && artwork.gallery_text !== null) {
            detail = (
                <div className="art-detail">
                    <div className="detailed-info">
                        <h3 className="title-h3">Artwork Title:</h3>
                        <h4 className="piece-title">{artwork.title_raw}</h4>
                        <h3 className="details-h3">Artwork Details:</h3>
                        <h4 className="label-text">{artwork.gallery_text}</h4>
                        <h4 className="art-credit">{artwork.creditline}</h4>
                    </div>
                    <figure className="large-image">
                        <img src={imgUrl} alt="Artwork" />
                    </figure>
                </div>
            )
        } else if (artwork.title !== null && artwork.title !== "" && artwork.gallery_text !== null) {
            detail = (
                <div className="art-detail">
                    <div className="detailed-info">
                        <h3 className="title-h3">Artwork Title:</h3>
                        <h4 className="piece-title">{artwork.title}</h4>
                        <h3 className="details-h3">Artwork Details:</h3>
                        <h4 className="art-description">{artwork.gallery_text}</h4>
                        <h4 className="art-credit">{artwork.creditline}</h4>
                    </div>
                    <figure className="large-image">
                        <img src={imgUrl} alt="Artwork" />
                    </figure>
                </div>
            )
        } else if (artwork.title_raw !== null && artwork.title_raw !== "" && artwork.label_text !== null) {
            detail = (
                <div className="art-detail">
                    <div className="detailed-info">
                        <h3 className="title-h3">Artwork Title:</h3>
                        <h4 className="piece-title">{artwork.title_raw}</h4>
                        <h3 className="details-h3">Artwork Details:</h3>
                        <h4 className="art-description">{artwork.label_text}</h4>
                        <h4 className="art-credit">{artwork.creditline}</h4>
                    </div>
                    <figure className="large-image">
                        <img src={imgUrl} alt="Artwork" />
                    </figure>
                </div>
            )
        } else if (artwork.title !== null && artwork.title !== "" && artwork.label_text !== null) {
            detail = (
                <div className="art-detail">
                    <div className="detailed-info">
                        <h3 className="title-h3">Artwork Title:</h3>
                        <h4 className="piece-title">{artwork.title}</h4>
                        <h3 className="details-h3">Artwork Details:</h3>
                        <h4 className="art-description">{artwork.label_text}</h4>
                        <h4 className="art-credit">{artwork.creditline}</h4>
                    </div>
                    <figure className="large-image">
                        <img src={imgUrl} alt="Artwork" />
                    </figure>
                </div>
            )
        } else {
            detail = (
                <div className="art-detail">
                    <div className="detailed-info">
                        <h3 className="title-h3">Artwork Title:</h3>
                        <h4 className="piece-title">{artwork.title}</h4>
                        <h3 className="details-h3">Artwork Details:</h3>
                        <h4 className="art-description">No Details Available</h4>
                        <h4 className="art-credit">{artwork.creditline}</h4>
                    </div>
                    <figure className="large-image">
                        <img src={imgUrl} alt="Artwork" />
                    </figure>
                </div>
            )
        }
    
        return (
            <div className="art-details">
                {detail}
            </div>
        )
    }
}

export default Flashcard
