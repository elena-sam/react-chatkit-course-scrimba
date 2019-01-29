import React from 'react'

function Message(props) {
    // render() { // function can't have a render method
        return(
            <div className="message"> 
              <div className="message-username">{props.username}</div>
              <div className="message-text">{props.text}</div>
            </div>
        )
    // }
}

export default Message;

/* https://reactjs.org/docs/components-and-props.html */