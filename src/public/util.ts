import omit from 'omit.js';

function getSizeOfInput(size) {
    switch(size) {
        case 'mini':
            return 'mi';
        case 'small':
            return 'sm';
        case 'large':
            return 'lg';
        default:
            return 'sm';
    }
}

export const esy_util = {
    omit: omit,
    getSizeOfInput: getSizeOfInput
};
