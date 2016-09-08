import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/sortBy';
import './SortPicker.less';

export default React.createClass({
    PropTypes: {
        dispatch: React.PropTypes.func.isRequired,
        sortBy: React.PropTypes.string.isRequired
    },

    handleSortByPrice() {
        this.props.dispatch(actions.sortByPrice());
    },

    handleSortByManufacturer() {
        this.props.dispatch(actions.sortByManufacturer());
    },

    handleSortByPopularity() {
        this.props.dispatch(actions.sortByPopularity());
    },

    render() {
        return (
            <div className="sortPicker row">
                <div className="col-xs-2 pull-right sort-by">
                    <span>
                        מיין לפי:
                    </span>
                </div>
                <div className="col-xs-3 pull-right sort-radio" onClick={this.handleSortByPrice}>
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'price'} />
                    <span>
                        מחיר
                    </span>
                </div>
                <div className="col-xs-3 pull-right sort-radio" onClick={this.handleSortByManufacturer}>
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'manufacturer'} />
                    <span>
                        יצרן
                    </span>
                </div>
                <div className="col-xs-4 pull-right sort-radio" onClick={this.handleSortByPopularity}>
                    <input type="radio"
                        name="sort"
                        checked={this.props.sortBy === 'popularity'} />
                    <span>
                        הכי נמכר
                    </span>
                </div>
            </div>
        );
    }
});
