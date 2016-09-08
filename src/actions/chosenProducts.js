import guid from '../guid';

export const RESET_CHOSEN_PRODUCTS = 'RESET_CHOSEN_PRODUCTS';

export function resetChosenProducts() {
    return {
        type: RESET_CHOSEN_PRODUCTS
    };
}

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

export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export function selectProduct(productId, lineId) {
    productId = productId;

    return {
        type: SELECT_PRODUCT,
        lineId,
        productId
    };
}

export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY';

export function changeProductQuantity(lineId, quantity) {
    quantity = Number(quantity);

    if (isNaN(quantity))
        return;

    return {
        type: CHANGE_PRODUCT_QUANTITY,
        lineId,
        quantity
    };
}
