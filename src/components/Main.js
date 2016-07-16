require('normalize.css/normalize.css');
require('styles/App.css');
import _ from 'lodash';
import React from 'react';
import SpecLinesBuilder from './SpecLinesBuilder';
import SystemPicker from './SystemPicker';

class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <SystemPicker
                    dispatch={this.props.dispatch}
                    systems={this.props.state.specOptions.systems}
                />
                <SpecLinesBuilder
                    dispatch={this.props.dispatch}
                    categories={this.props.state.specOptions.categories}
                    products={this.props.state.specOptions.products}
                    chosenProducts={this.props.state.chosenProducts}
                    sortBy={this.props.state.sortBy}
                />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
