import React, { Component } from 'react'

export function withController(Childcomponent, props) {
    if (!Childcomponent) {
        return null
    }
    return class withController extends Component {
        render() {
            return <Childcomponent {...props}/>
        }
    }
}
