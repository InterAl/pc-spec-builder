import React, {Component} from 'react';
import numeral from 'numeral';
import totalSumSelector from '../selectors/totalCalc';
import SystemPicker from './SystemPicker';
import SortPicker from './SortPicker';
import proceedToOffer from '../actions/proceedToOffer';

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
    }

    handleProceedToOffer() {
        this.props.dispatch(proceedToOffer());
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
            <div className="categoryLine total col-xs-12 col-md-3 pull-right">
                <span className="title">סה״כ: </span>
                <span className="title">
                    {formattedTotal + ' / ₪' + formattedTotalCash}
                </span>
            </div>
        );
    }

    renderProceedToOffer() {
        return this.props.totalPrice > 0 && (
            <div className='offer control-row pull-right col-xs-12 col-md-2'>
                <a onClick={this.handleProceedToOffer}>המשך להצעה</a>
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
                    {this.renderProceedToOffer()}
                </div>
            </div>
        );
    }
}
