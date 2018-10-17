import _ from 'lodash';
import React, {Component} from 'react';

const MaxRows = 8;

export default class TextAreaAutoRows extends Component {
    state = {
        rows: 1
    };

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setNewRows();
        }
    }

    setNewRows() {
        const cols = 35;
        const rows = Math.ceil(this.props.value.length / cols);
        const boundedRows = Math.min(rows, MaxRows);

        this.setState({
            rows: boundedRows
        });
    }

    render() {
        return (
            <textarea
                ref={e => this.input = e}
                rows={this.state.rows}
                {...this.props}
            />
        );
    }
}
