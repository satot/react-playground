/* globals module: false */
const OK = { type:'OK', hasMessage: false };
const ERROR = { type: 'ERROR', hasMessage: false };
const ERROR_REQUIRED = { type:'ERROR', hasMessage: true, message: 'Required' };

function isOK(status) {
    return status.type === OK.type;
}

function isERROR(status) {
    return status.type === ERROR.type;
}

module.exports = {
    OK,
    ERROR,
    ERROR_REQUIRED,
    isOK,
    isERROR
};
