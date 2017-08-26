import React from 'react';

import { Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import List, { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import FileFolder from 'material-ui/svg-icons/file/folder';
import DocumentIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { transparent, blue500, grey400 } from 'material-ui/styles/colors';

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        // make sure modal is closed when page has been changed
        if (this.props.open) {
            this.props.handleCloseModal();
        }
    }

    componentDidMount () {
        let params = this.props.match.params;
        if(params && params.folderId) {
            this.props.getResourcesByFolderAsync(params.folderId);
        } else {
            this.props.getResourcesAsync();
        }
    }

    handleTextFieldChange(e) {
        this.props.handleChangeName(e.target.value);
    }

    handleRenameSubmit() {
        this.props.handleRenameSubmit();
        this.props.handleCloseModal();
    }

    render () {
        let files = this.props.files;
        let folders = (files && files.folders) ? files.folders.map((f) => {
            return (
                <Folder
                    key={'f' + f.id.toString()}
                    id={f.id}
                    name={f.name}
                    open={this.props.open}
                    description={f.description}
                    handleTouch={this.props.getResourcesByFolderAsync}
                    onMenuClick={this.props.handleOpenModal}
                />
            );
        }) : null;
        let documents = (files && files.documents) ? files.documents.map((d) => {
            return (
                <Document
                    key={'d' + d.id.toString()}
                    id={d.id}
                    name={d.name}
                    updated_at={d.updated_at}
                    onMenuClick={this.props.handleOpenModal}
                />
            );
        }) : null;
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={this.props.handleCloseModal}
            />,
            <FlatButton
                label="Rename"
                primary={true}
                onClick={this.handleRenameSubmit.bind(this)}
            />,
        ];
        return (
            <div>
                <List>{folders} {documents}</List>
                <Dialog
                    title="Rename"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleCloseModal}
                >
                    <TextField
                        id="tf1"
                        value={this.props.file.name}
                        onChange={this.handleTextFieldChange.bind(this)}
                    />
                </Dialog>
            </div>
        );
    }
}

class Folder extends React.Component {
    handleTouchTap (folderId) {
        this.props.handleTouch(folderId);
    }

    handleMenu (e) {
        e.stopPropagation();
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-file-id');
        const name = e.currentTarget.getAttribute('data-file-name');
        this.props.onMenuClick({id: id, name: name, type: 'folder'});
    }

    render() {
        let linkTo = '/' + this.props.id.toString();
        return (
            <ListItem
                key={this.props.id}
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightAvatar={
                    <Avatar
                        icon={<MoreVert />}
                        backgroundColor={transparent}
                        color={grey400}
                        onClick={this.handleMenu.bind(this)}
                        data-file-id={this.props.id}
                        data-file-name={this.props.name}
                    />
                }
                onClick={this.handleTouchTap.bind(this, this.props.id)}
                containerElement={<Link to={linkTo} />}
                primaryText={this.props.name}
                secondaryText={this.props.description}
            />
        );
    }
}

class Document extends React.Component {
    handleMenu (e) {
        e.stopPropagation();
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-file-id');
        const name = e.currentTarget.getAttribute('data-file-name');
        this.props.onMenuClick({id: id, name: name, type: 'document'});
    }

    render() {
        let updt = new Date(this.props.updated_at);
        return (
            <ListItem
                key={this.props.id}
                leftAvatar={<Avatar icon={<DocumentIcon />} backgroundColor={blue500} />}
                rightAvatar={
                    <Avatar
                        icon={<MoreVert />}
                        backgroundColor={transparent}
                        color={grey400}
                        onClick={this.handleMenu.bind(this)}
                        data-file-id={this.props.id}
                        data-file-name={this.props.name}
                    />
                }
                primaryText={this.props.name}
                secondaryText={dtFormat(updt.getFullYear(), updt.getMonth(), updt.getDate())}
            />
        );
    }
}

function dtFormat (year, month, date) {
    return [date, month, year].join('/');
}

export const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
