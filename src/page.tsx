// this is the react stuff
import React, { Component } from "react"
import {faces} from "./faces"


// i dont really like this type declaration stuff rn, hopegfully there is a better way to do this
type PageProps = {
    face? : string
}

type PageState = {
    face? : number,
    xDown? : number,
    yDown? : number
}

export default class Page extends Component<PageProps, PageState> {
    constructor(props : PageProps) {
        super(props)
        
    }

    state : PageState = {
        face: 0,
        xDown: null,
        yDown: null
    }

    private rootRef = React.createRef<HTMLDivElement>()

    componentDidMount() {
        this.rootRef.current.focus()
    }

    // increments face counter
    changeEmotion = (forward : boolean) => {
        this.setState( oldState => {
            if(forward) {
                if(oldState.face + 1 < faces.length){
                    return {face: oldState.face + 1}
                }
                else {
                    return {face: 0}
                }
            }
            else {
                if(oldState.face - 1 >= 0){
                    return {face: oldState.face - 1}
                }
                else {
                    return {face: faces.length -1}
                }
            }
        })
    }

    keyPress = (event : React.KeyboardEvent) => {
        if(event.code == "ArrowRight" || event.code == "KeyD") {
            // go forward
            this.changeEmotion(true)
        }
        else if (event.code == "ArrowLeft" || event.code == "KeyA") {
            // go backward
            this.changeEmotion(false)
        }
    }

    mousePress = (event : React.MouseEvent) => {
        if(window.innerWidth - event.clientX > window.innerWidth / 2) {
            // left
            this.changeEmotion(false)
        }
        else {
            // right
            this.changeEmotion(true)
        }
    }

    wheelScroll = (event : React.WheelEvent) => {
        event.preventDefault()
        console.log('delta: ', event.deltaY)
        console.log('movement: ', event.movementY);
        if(event.deltaY > 0) {
            // back
            this.changeEmotion(false)

        }
        else if (event.deltaY < 0) {
            // forward
            this.changeEmotion(true)

        } 
        
    }

    swipeStart = (event : React.TouchEvent) => {
        event.preventDefault()
        const firstTouch : React.Touch = event.touches[0]
        this.setState({xDown: firstTouch.clientX})
        this.setState({yDown: firstTouch.clientY})
    }

    swipeMove = (event : React.TouchEvent) => {
        event.preventDefault()
        if(! this.state.xDown || ! this.state.yDown) {
            return
        }

        const xUp = event.touches[0].clientX
        const yUp = event.touches[0].clientY

        const xDiff = this.state.xDown - xUp;
        const yDiff = this.state.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if(xDiff > 0) {
                // left swipe
                this.changeEmotion(false)
            }
            else {
                // right swipe
                this.changeEmotion(true)
            }
        }

        this.setState({xDown: null})
        this.setState({yDown: null})
    }

    render() {
        return(
            <div className="react" flex-middle="" ref={ this.rootRef } tabIndex={0} onTouchStart={ this.swipeStart } onTouchMove={ this.swipeMove } onKeyDown={ this.keyPress } onMouseDown={ this.mousePress } onWheel={ this.wheelScroll } onContextMenu={ e => {e.preventDefault()} } onClick={ e => {e.preventDefault()} }>
                <h1 className="⌐■_■">{faces[this.state.face]}</h1>
            </div>
        )
    }
}
