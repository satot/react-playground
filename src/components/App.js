import React from 'react';

import { Link } from 'react-router-dom';

import List, { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import DocumentIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import {blue500} from 'material-ui/styles/colors';

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        let params = this.props.match.params;
        if(params && params.folderId) {
            this.props.getResourcesByFolderAsync(params.folderId);
        } else {
            this.props.getResourcesAsync();
        }
    }

    render () {
        let files = this.props.files;
        let folders = (files && files.folders) ? files.folders.map((f) => {
            return (
                <Folder
                    key={'f' + f.id.toString()}
                    id={f.id}
                    name={f.name}
                    description={f.description}
                    handleTouch={this.props.getResourcesByFolderAsync}
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
                />
            );
        }) : null;
        return (
            <div>
                <List>{folders} {documents}</List>
            </div>
        );
    }
}

class Folder extends React.Component {
    handleTouchTap (folderId) {
        this.props.handleTouch(folderId);
    }

    render() {
        let linkTo = '/' + this.props.id.toString();
        return (
            <ListItem
                key={this.props.id}
                leftAvatar={<Avatar icon={<FileFolder />} />}
                onTouchTap={this.handleTouchTap.bind(this, this.props.id)}
                containerElement={<Link to={linkTo} />}
                primaryText={this.props.name}
                secondaryText={this.props.description}
            />
        );
    }
}

class Document extends React.Component {
    render() {
        let updt = new Date(this.props.updated_at);
        return (
            <ListItem
                key={this.props.id}
                leftAvatar={<Avatar icon={<DocumentIcon />} backgroundColor={blue500} />}
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
