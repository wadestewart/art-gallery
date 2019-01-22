import React, { Component } from 'react'

class Card extends Component {

    render() {
        let card = this.props.card
        console.log(card)

        const artworks = card.map((artwork) => {
            console.log(artwork)
        })

        return (
            <div>
                <h1>{}</h1>
                {/* <figure>
                    <img src={url} alt="" />
                </figure> */}
            </div>
        )
    }
}

export default Card
