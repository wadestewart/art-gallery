import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="nav-wrapper blue-grey darken-1">
                    <div className="container">
                        <div className="valign-wrapper">
                            <p className="brand-logo">Art Gallery</p>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
