import _ from 'lodash';
import React, {Component} from 'react';
import {PropTypes} from './index.js';
import Modal from '../Modal.js';
import X from '../x';
import './ComboBox.mobile.less';

export default class ComboBoxMobile extends Component {
    static propTypes = PropTypes;

    state = {
        isModalOpen: false,
        searchString: '',
        sortBy: 'price'
    };

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
        return options.filter(option => {
            return option.text.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
        });
    }

    sortProducts(options) {
        return _.orderBy(options, this.state.sortBy);
    }

    renderModal() {
        const {isModalOpen} = this.state;
        const {options} = this.props;
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
                            </select>
                        </div>
                    </div>
                    <div className='comboBox-resultCount'>
                        {`מציג ${filteredProducts.length} מוצרים`}
                    </div>
                    <div className='comboBox-modal-productList'>
                        {filteredProducts.map(o => (
                        <div onClick={() => this.handleProductSelect(o)} className='product'>
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
