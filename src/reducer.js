const initialState = {
    open: false,
    file: {},
    files: {},
    // to store renamed files as mocking api response
    renamedFiles: []
};


export default function reducer(state = initialState, action) {
    function assign(newState) {
        return Object.assign({}, state, newState);
    }
    switch(action.type) {
    case 'GET_RESOURCES':
        var files = action.files;
        state.renamedFiles.forEach((f) => { renameFiles(files, f); });
        return assign({ files: files });
    case 'MODAL_OPEN':
        return assign({ open: true, file: action.file });
    case 'MODAL_CLOSE':
        return assign({ open: false, file: {} });
    case 'CHANGE_NAME':
        return assign({
            file: Object.assign({}, state.file, {name: action.name})
        });
    case 'RENAME_SUBMIT':
        state.renamedFiles.push(state.file);
        return assign({ files: renameFiles(state.files, state.file) });
    default:
        return state;
    }
}

// Find renamed file in files and rename if any
function renameFiles(files, file) {
    switch(file.type) {
    case 'folder':
        var folders = files.folders;
        if (folders) {
            folders.map((f) => {
                if(f.id == file.id) {
                    f.name = file.name;
                }
                return f;
            });
        }
        return Object.assign({}, files, {folders: folders});
    case 'document':
        var documents = files.documents;
        if (documents) {
            documents.map((d) => {
                if(d.id == file.id) {
                    d.name = file.name;
                }
                return d;
            });
        }
        return Object.assign({}, files, {documents: documents});
    default:
        return files;
    }
}
