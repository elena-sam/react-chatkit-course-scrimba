import React from 'react'

class SendMessageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message); // child borrows its parent's function
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="send-message-form">
                <input 
                    onChange={this.handleChange} // call function define above when something is typed in the field
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER" 
                    type="text" />
            </form>
        )
    }
}


export default SendMessageForm;