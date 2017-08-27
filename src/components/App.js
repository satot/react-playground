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
    componentWillMount () {
        // make sure modal is closed when page has been changed
        if (this.props.open) {
            this.props.handleCloseModal();
        }
    }

    componentDidMount () {
        const params = this.props.match.params;
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
        const {files, file, open, handleOpenModal, handleCloseModal, getResourcesByFolderAsync} = this.props;
        const folders = (files && files.folders) ? files.folders.map((f) => {
            return (
                <Folder
                    key={'f' + f.id.toString()}
                    id={f.id}
                    name={f.name}
                    open={open}
                    description={f.description}
                    handleTouch={getResourcesByFolderAsync}
                    onMenuClick={handleOpenModal}
                />
            );
        }) : null;
        const documents = (files && files.documents) ? files.documents.map((d) => {
            return (
                <Document
                    key={'d' + d.id.toString()}
                    id={d.id}
                    name={d.name}
                    updated_at={d.updated_at}
                    onMenuClick={handleOpenModal}
                />
            );
        }) : null;
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={handleCloseModal}
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
                    open={open}
                    onRequestClose={handleCloseModal}
                >
                    <TextField
                        id="tf1"
                        value={file.name}
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
        const {id, name, description} = this.props;
        const linkTo = '/' + id.toString();
        return (
            <ListItem
                key={id}
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightAvatar={
                    <Avatar
                        icon={<MoreVert />}
                        backgroundColor={transparent}
                        color={grey400}
                        onClick={this.handleMenu.bind(this)}
                        data-file-id={id}
                        data-file-name={name}
                    />
                }
                onClick={this.handleTouchTap.bind(this, id)}
                containerElement={<Link to={linkTo} />}
                primaryText={name}
                secondaryText={description}
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
        const {id, name, updated_at} = this.props;
        const updt = new Date(updated_at);
        return (
            <ListItem
                key={id}
                leftAvatar={<Avatar icon={<DocumentIcon />} backgroundColor={blue500} />}
                rightAvatar={
                    <Avatar
                        icon={<MoreVert />}
                        backgroundColor={transparent}
                        color={grey400}
                        onClick={this.handleMenu.bind(this)}
                        data-file-id={id}
                        data-file-name={name}
                    />
                }
                primaryText={name}
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
