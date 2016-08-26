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
            <div className="sortPicker control-row row">
                <div className="col-xs-2 pull-right">
                    <span>
                        מיין לפי:
                    </span>
                </div>
                <div className="col-xs-3 pull-right">
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'price'}
                           onChange={this.handleSortByPrice} />
                    <span>
                        מחיר
                    </span>
                </div>
                <div className="col-xs-3 pull-right">
                    <input type="radio"
                           name="sort"
                           checked={this.props.sortBy === 'manufacturer'}
                           onChange={this.handleSortByManufacturer} />
                    <span>
                        יצרן
                    </span>
                </div>
                <div className="col-xs-4 pull-right">
                    <input type="radio"
                        name="sort"
                        checked={this.props.sortBy === 'popularity'}
                        onChange={this.handleSortByPopularity} />
                    <span>
                        הכי נמכר
                    </span>
                </div>
            </div>
        );
    }
});
