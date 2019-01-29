import React from 'react';

class NewRoomForm extends React.Component {

    constructor() {
        super();
        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.name);
        this.setState({
            name: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="new-room-form">
                <input 
                    onChange={this.handleChange}
                    value={this.state.name}
                    placeholder="Choose a name for the new room" 
                    type="text" />
            </form>
        )
    }
}

export default NewRoomForm;