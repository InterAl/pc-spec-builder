export const SORT_BY_PRICE = "SORT_BY_PRICE";

export function sortByPrice() {
    return {
        type: SORT_BY_PRICE
    };
}

export const SORT_BY_MANUFACTURER = "SORT_BY_MANUFACTURER";

export function sortByManufacturer() {
    return {
        type: SORT_BY_MANUFACTURER
    };
}

export const SORT_BY_POPULARITY = "SORT_BY_POPULARITY";

export function sortByPopularity() {
    return {
        type: SORT_BY_POPULARITY
    };
}
