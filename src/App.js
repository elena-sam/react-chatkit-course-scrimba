import React from 'react';
import MessageList from './components/MessageList';
import {
  ChatManager,
  TokenProvider
} from '@pusher/chatkit-client';
import './App.css';

import { instanceLocator, tokenUrl } from './config';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      joignableRooms: [],
      joinedRooms: []
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'frodo',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect() //promise
    .then(currentUser => {
      this.currentUser = currentUser;

      this.currentUser.getJoinableRooms()
        .then(joignableRooms => {
          this.setState({
            joignableRooms,
            joinedRooms: this.currentUser.rooms
          })          
        })
        .catch(err => {
          console.log(`Error getting joinable rooms: ${err}`)
        })

      this.currentUser.subscribeToRoom({
        roomId: '19379249',
        // messageLimit: 10,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message], // we are expanding the messages array, then add the last message at the end
              // we don't use push because we don't want/WE ARE NOT ALLOWED to modify the original array/state
              roomId: '19379249',
              user: currentUser
            })
          }
        }
      })
    })
    .catch(err => {
      console.log('Error on connection', err);
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text, // no need to write text: text if key==value
      roomId: '19379249'
    })
    .then(messageId => {
      console.log(`Added message ${messageId}`)
    })
    .catch(err => {
      console.log(`Error adding message to ${this.props.roomId}: ${err}`)
    })
  }

  createRoom(name) {
    this.currentUser.createRoom({
        name,
        private: true,
        addUserIds: ['frodo'],
        customData: {
          foo: 42
        },
      }).then(room => {
        console.log(`Created room called ${room.name}`)
      })
      .catch(err => {
        console.log(`Error creating room ${err}`)
      })
  }

  render() {
    return (
      <div className="App">
        <RoomList rooms={[...this.state.joignableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage} // inverse data flow; child borrows its parent's function
        />
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default App;
