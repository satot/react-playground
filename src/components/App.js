import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import List, { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ws: null,
            message: '',
            open: false,
            value: ''
        };
    }

    handleTouchTap () {
    // this.setState({open: true});
        this.state.ws.send(this.state.value);
    }

    handleRequestClose () {
        this.setState({open: false});
    }

    handleChange (e) {
        this.setState({value: e.target.value});
    }

    handleMessage (msg) {
        this.setState({
            message: msg.data,
            open: true
        });
    }

    componentDidMount () {
        var ws = new WebSocket('wss://echo.websocket.org');
        ws.onmessage = this.handleMessage.bind(this);
        this.setState({ws: ws});
    }

    componentWillUnmount () {
        this.state.ws.close();
    }

    render () {
        return (
            <div>
                <TextField
                    hintText="message"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                />
                <RaisedButton
                    onTouchTap={this.handleTouchTap.bind(this)}
                    label="SUBMIT"
                />
                <List>
                    <Link to="/about">
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            primaryText="Photos"
                        />
                    </Link>
                </List>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
            </div>
        );
    }
}

export const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
