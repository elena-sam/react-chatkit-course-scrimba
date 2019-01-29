import React from 'react';
import Message from './Message'

 // eslint-disable-next-line
const DUMMY_DATA = [{
    senderId: 'perborgen',
    text: 'Hey, how is it going?'
  },
  {
    senderId: 'janedoe',
    text: 'Great! How about you?'
  },
  {
    senderId: 'perborgen',
    text: 'Good to hear! I am great as well'
  }
]

class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list">
        { // curly brackets to use js
          this.props.messages.map((message, index) => { // curly braces to use js
          return ( // here we are in jsx land again
            <Message key={index} username={message.senderId} text={message.text}/>
          )
        })}
      </div>
    );
  }
}

export default MessageList;