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
            <div className="sortPicker control-row">
                <div>
                    <label>
                        מיין לפי:
                    </label>
                </div>
                <div>
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'price'}
                           onChange={this.handleSortByPrice} />
                    <label>
                        מחיר
                    </label>
                </div>
                <div>
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'manufacturer'}
                           onChange={this.handleSortByManufacturer} />
                    <label>
                        יצרן
                    </label>
                </div>
                <div>
                    <input type="radio"
                        name="sort"
                        checked={this.props.sortBy === 'popularity'}
                        onChange={this.handleSortByPopularity} />
                    <label>
                        הכי נמכר
                    </label>
                </div>
            </div>
        );
    }
});
