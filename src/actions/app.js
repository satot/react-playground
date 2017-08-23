export function increment() {
    return {
        type: 'INCREMENT',
        value: 'Tired'
    };
}
export function textUpdate(text) {
    return {
        type: 'TEXT_UPDATE',
        text: text
    };
}
export function setWebSocket(websocket) {
    return {
        type: 'SET_WEBSOCKET',
        ws: websocket
    };
}
export function messageUpdate(msg) {
    return {
        type: 'MSG_UPDATE',
        message: msg
    };
}
export function requestClose() {
    return {
        type: 'REQUEST_CLOSE'
    };
}
