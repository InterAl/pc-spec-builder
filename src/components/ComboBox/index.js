import React from 'react';
import getResponsiveComponent from '../getResponsiveComponent.js';

const {PropTypes} = React;

export const propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })),
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        id: PropTypes.any,
        price: PropTypes.number,
        manufacturer: PropTypes.string
    })),
    onChange: PropTypes.func.isRequired,
    onTabChange: PropTypes.func,
    onClear: PropTypes.func,
    filter: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    showRowCount: PropTypes.bool,
    value: PropTypes.any
};

export default getResponsiveComponent(
    require('./ComboBox.desktop.js').default,
    require('./ComboBox.mobile.js').default
);
