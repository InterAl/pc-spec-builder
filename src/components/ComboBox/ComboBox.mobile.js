import _ from 'lodash';
import React, {Component} from 'react';
import {PropTypes} from './index.js';
import Modal from '../Modal.js';
import X from '../x';
import cx from 'classnames';
import './ComboBox.mobile.less';

export default class ComboBoxMobile extends Component {
    static propTypes = PropTypes;

    constructor() {
        super();

        this.state = {
            isModalOpen: false,
            searchString: '',
            sortBy: 'price',
            tab: '*'
        }
    }

    renderLabel(option) {
        return (
            <div className='comboBox-mobile-label' onClick={this.openModal}>
                <div className="comboBox-clear" style={{marginRight: 6, color: 'red', fontSize: 21}} onClick={this.props.onClear}>
                    ×
                </div>
                {option ? option.text : 'Select'}
            </div>
        );
    }

    toggleModal = (isModalOpen = !this.state.isModalOpen) => {
        this.setState({ isModalOpen });
    }

    closeModal = () => this.toggleModal(false)
    openModal = () => this.toggleModal(true)

    handleProductSelect = option => {
        this.props.onChange(option.value);
        this.closeModal();
    }

    handleTabSelect = ev => {
        this.setState({
            tab: ev.target.value
        });
    }

    handleSortSelect = ev => {
        this.setState({
            sortBy: ev.target.value
        });
    }

    handleSearchChange = ev => {
        this.setState({
            searchString: ev.target.value
        });
    }

    filterProducts(options) {
        const tab = this.state.tab === '*' ? undefined : this.state.tab;
        return this.props.filter(options, this.state.searchString, tab);
    }

    sortProducts(options) {
        return _.orderBy(options, this.state.sortBy);
    }

    renderModal() {
        const {isModalOpen} = this.state;
        const {options, tabs} = this.props;
        const filteredProducts = this.sortProducts(this.filterProducts(options));

        return (
            <Modal
                isOpen={isModalOpen}
                className='comboBox-modal-wrapper'
                overlayClassName='comboBox-modal-overlay'
                onRequestClose={this.closeModal}
                closeTimeoutMS={150}
                openTimeoutMS={150}
            >
                <div className='comboBox-modal-content'>
                    <div className='comboBox-title'>
                        <X className="comboBox-clear-btn" onClick={this.closeModal}/>
                    </div>

                    <div className="comboBox-input-wrapper">
                        <input
                            ref="input"
                            className='comboBox-searchInput'
                            value={this.state.searchString}
                            placeholder="חפש מוצר"
                            onChange={this.handleSearchChange}
                        />
                        <div className='comboBox-sort-wrapper'>
                            <select value={this.state.sortBy} onChange={this.handleSortSelect}>
                                <option value='price'>מיין לפי מחיר</option>
                                <option value='manufacturer'>מיין לפי יצרן</option>
                                <option value='popularity'>מיין לפי הכי נמכר</option>
                            </select>
                        </div>
                        {tabs.length > 1 && (
                            <div className='comboBox-sort-wrapper comboBox-tabs-wrapper'>
                                <select value={this.state.tab} onChange={this.handleTabSelect}>
                                    <option key='*' value='*'>
                                        הצג הכל
                                    </option>
                                    {_.map(tabs, (tab, idx) => (
                                        <option key={idx} value={tab.value}>
                                            {tab.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className='comboBox-resultCount'>
                        {`מציג ${filteredProducts.length} מוצרים`}
                    </div>
                    <div className='comboBox-modal-productList'>
                        {filteredProducts.map(o => (
                            <div
                                onClick={() => this.handleProductSelect(o)}
                                className={cx('comboBox-modal-product', {
                                    selected: o.id === this.props.value
                                })}
                            >
                                {o.text}
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        );
    }

    render() {
        const {value, options, className} = this.props;
        const option = _.find(options, {id: value});

        return (
            <div className={className}>
                {this.renderModal()}
                {this.renderLabel(option)}
            </div>
        );
    }
}
