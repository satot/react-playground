import { OK, ERROR_REQUIRED } from '../constants/validationStatus';

export function fileName(name) {
    if(name === ''){return ERROR_REQUIRED;}
    return OK;
}
