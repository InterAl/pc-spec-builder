import React, {Component} from 'react';
import numeral from 'numeral';
import totalSumSelector from '../selectors/totalCalc';
import SystemPicker from './SystemPicker';
import SortPicker from './SortPicker';
import proceedToOffer from '../actions/proceedToOffer';
import {resetChosenProducts} from '../actions/chosenProducts';
import './Header.less';

const {PropTypes} = React;

export default class Header extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        sortBy: PropTypes.string.isRequired,
        systems: PropTypes.object,
        chosenSystem: PropTypes.object.isRequired,
        totalPrice: PropTypes.number.isRequired
    }

    constructor() {
        super();

        this.handleProceedToOffer = this.handleProceedToOffer.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleProceedToOffer() {
        this.props.dispatch(proceedToOffer());
    }

    handleResetClick() {
        this.props.dispatch(resetChosenProducts());
    }

    renderSortPicker() {
        return (
            <div className='col-md-4 col-xs-12 pull-right'>
                <SortPicker
                    dispatch={this.props.dispatch}
                    sortBy={this.props.sortBy}
                />
            </div>
        );
    }

    renderTotal() {
        let {totalPrice} = this.props;
        let totalPriceCash = 0.98 * totalPrice;
        let formattedTotal = numeral(totalPrice).format('0,0');
        let formattedTotalCash = numeral(totalPriceCash).format('0,0');

        return (
            <div className="total col-xs-7 col-md-3 pull-right">
                <span className="title">סה״כ: </span>
                <span className="title">
                    {formattedTotal + ' / ₪' + formattedTotalCash}
                </span>
            </div>
        );
    }

    renderProceedToOffer() {
        return this.props.totalPrice > 0 && (
            <div className='offer pull-right col-xs-3 col-md-2'>
                <a onClick={this.handleProceedToOffer}>המשך להצעה</a>
            </div>
        );
    }

    renderReset() {
        return (
            <div className='col-md-2 col-xs-2 reset' onClick={this.handleResetClick}>
                אתחל
            </div>
        );
    }

    render() {
        return (
            <div className='header'>
                <SystemPicker
                    dispatch={this.props.dispatch}
                    systems={this.props.systems}
                    systemName={this.props.chosenSystem.systemName}
                    subsystem={this.props.chosenSystem.subsystem}
                />

                <div className='controls row' ref="header">
                    {this.renderSortPicker()}
                    {this.renderTotal()}
                    {this.renderReset()}
                    {this.renderProceedToOffer()}
                </div>
            </div>
        );
    }
}
