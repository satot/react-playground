import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    handleTouchTap () {
        this.props.ws.send(this.props.value);
    }

    handleRequestClose () {
        this.props.handleRequestClose();
    }

    handleChange (e) {
        this.props.handleTextChange(e.target.value);
    }

    handleMessage (msg) {
        this.props.handleMessageChange(msg.data);
    }

    componentDidMount () {
        var ws = new WebSocket('wss://echo.websocket.org');
        ws.onmessage = this.handleMessage.bind(this);
        this.props.handleWebSocket(ws);
    }

    componentWillUnmount () {
        this.props.ws.close();
    }

    render () {
        return (
            <div>
                <TextField
                    hintText="message"
                    value={this.props.value}
                    onChange={e => this.handleChange(e)}
                />
                <RaisedButton
                    onTouchTap={this.handleTouchTap.bind(this)}
                    label="SUBMIT"
                />
                <List>
                    <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} />}
                        primaryText={this.props.label}
                        secondaryText={this.props.value}
                    />
                </List>
                <Snackbar
                    open={this.props.open}
                    message={this.props.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
                <span>{this.props.num}</span>
                <button onClick={() => this.props.handleClick()}>incre</button>
            </div>
        );
    }
}

export const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
