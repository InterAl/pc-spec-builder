export const SET_CHOSEN_PRODUCTS = 'SET_CHOSEN_PRODUCTS';

export function setChosenProducts(chosenProducts) {
    return {
        type: SET_CHOSEN_PRODUCTS,
        chosenProducts
    };
}

export const ADD_EMPTY_SPECLINE = 'ADD_EMPTY_SPECLINE';

export function addEmptySpecLine(categoryId) {
    return {
        type: ADD_EMPTY_SPECLINE,
        categoryId
    };
}

export const DELETE_SPECLINE = 'DELETE_SPECLINE';

export function deleteSpecLine(lineId) {
    return {
        type: DELETE_SPECLINE,
        lineId
    };
}
