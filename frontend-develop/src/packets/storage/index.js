import {getItem, setItem, removeItem, clear} from './storage';
import {jwtStorage} from './adapters/jwtStorage';

export const storage = {
    getItem,
    setItem,
    removeItem,
    clear,
    jwtStorage,

}