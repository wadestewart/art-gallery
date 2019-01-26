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
        
        this.setState({
            currentTimeout: window.setTimeout(this.decrementTimer, 3000)
        })
        
        fetch(`https://art-history-back.herokuapp.com/${this.props.card.id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.object.images)
                let newImage = data.object.images[0].z.url
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
        if (prevProps.card.id !== this.props.card.id) {
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
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1">
                        <div className="card horizontal white">
                            <div className="card-image">
                                <img src={imgUrl} alt="Artwork" />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>Artwork Title:</h5>
                                    <p>{artwork.title_raw}</p>
                                    <h5>Artwork Details:</h5>
                                    <p>{artwork.gallery_text}</p>
                                    <h5>{artwork.creditline}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (artwork.title !== null && artwork.title !== "" && artwork.gallery_text !== null) {
            detail = (
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1">
                        <div className="card horizontal white">
                            <div className="card-image">
                                <img src={imgUrl} alt="Artwork" />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>Artwork Title:</h5>
                                    <p>{artwork.title}</p>
                                    <h5>Artwork Details:</h5>
                                    <p>{artwork.gallery_text}</p>
                                    <h5>{artwork.creditline}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (artwork.title_raw !== null && artwork.title_raw !== "" && artwork.label_text !== null) {
            detail = (
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1">
                        <div className="card horizontal white">
                            <div className="card-image">
                                <img src={imgUrl} alt="Artwork" />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>Artwork Title:</h5>
                                    <p>{artwork.title_raw}</p>
                                    <h5>Artwork Details:</h5>
                                    <p>{artwork.label_text}</p>
                                    <h5>{artwork.creditline}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (artwork.title !== null && artwork.title !== "" && artwork.label_text !== null) {
            detail = (
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1">
                        <div className="card horizontal white">
                            <div className="card-image">
                                <img src={imgUrl} alt="Artwork" />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>Artwork Title:</h5>
                                    <p>{artwork.title}</p>
                                    <h5>Artwork Details:</h5>
                                    <p>{artwork.label_text}</p>
                                    <h5>{artwork.creditline}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            detail = (
                <div className="row valign-wrapper">
                    <div className="col s10 pull-s1">
                        <div className="card horizontal white">
                            <div className="card-image">
                                <img src={imgUrl} alt="Artwork" />
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>Artwork Title:</h5>
                                    <p>{artwork.title}</p>
                                    <h5>Artwork Details:</h5>
                                    <p>No Details Available</p>
                                    <h5>{artwork.creditline}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
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
