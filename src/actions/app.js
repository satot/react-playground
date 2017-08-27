export function openModal(file) {
    return {
        type: 'MODAL_OPEN',
        file: file
    };
}

export function closeModal() {
    return { type: 'MODAL_CLOSE' };
}

export function changeName(name) {
    return {
        type: 'CHANGE_NAME',
        name: name
    };
}

export function renameSubmit() {
    return { type: 'RENAME_SUBMIT' };
}

export function getResourcesByFolderAsync(id) {
    return dispatch => {
        setTimeout(() => {
            dispatch(getResourcesByFolder(id));
        }, 100);
    };
}

export function getResourcesByFolder(id) {
    return {
        type: 'GET_RESOURCES',
        files: listResourcesByFolder(id)
    };
}

export function getResourcesAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(getResources());
        }, 100);
    };
}

export function getResources() {
    return {
        type: 'GET_RESOURCES',
        files: listResources
    };
}

const listResources = {
    user_id: '12345',
    user_first_name: 'Sexy',
    user_last_name: 'Lexy',
    folders: [
        {
            id: '10001',
            files_count: 1,
            name: 'Folder 1',
            description: 'This folder is awesome!',
            created_at: '2017-07-05 09:35:40',
            updated_at: '2017-07-05 09:35:40'
        },
        {
            id: '10002',
            files_count: 2,
            name: 'Folder 2',
            description: 'This folder is great!',
            created_at: '2017-07-05 09:35:40',
            updated_at: '2017-07-05 09:35:40'
        }
    ],
    documents: [
        {
            id: '20001',
            name: 'Document 1',
            content: 'I am Document 1',
            created_at: '2017-07-05 09:35:40',
            updated_at: '2017-07-05 09:35:40',
            tags: [{ id: '300001', name: 'tag 1' } ]
        }
    ]
};

function listResourcesByFolder(id) {
    return {
        id: id,
        files_count: 1,
        name: 'Folder 1',
        description: 'This folder is awesome!',
        created_at: '2017-07-05 09:35:40',
        updated_at: '2017-07-05 09:35:40',
        documents: [
            {
                id: id,
                name: ['Document', id.toString()].join(' '),
                content: 'I am Document 1',
                created_at: '2017-07-05 09:35:40',
                updated_at: '2017-07-05 09:35:40',
                tags: [
                    { id: '100001', 'name': 'tag 1' }
                ]
            }
        ]
    };
}
