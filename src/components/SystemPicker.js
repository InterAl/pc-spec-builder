import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenSystem';
import './SystemPicker.less';

export default React.createClass({
    PropTypes: {
        dispatch: React.PropTypes.func.isRequired,
        systems: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            systemId: null,
            subsystem: null
        };
    },

    handleChooseSystem() {
        let {systemId, subsystem} = this.state;

        if (systemId) {
            this.props.dispatch(actions.chooseSystem(systemId, subsystem));
        }
    },

    handleClickSystem(systemId) {
        if (systemId !== this.state.systemId) {
            let system = _.find(this.props.systems, s => s.id === systemId);
            let subsystem = _.first(system.subsystems);
            subsystem && this.setState({ subsystem: subsystem.name });
        }

        this.setState({
            systemId
        });
    },

    handleClickSubsystem(systemId, subsystem) {
        this.state.systemId === systemId && this.setState({subsystem});
    },

    renderSystem(system, idx) {
        let subsystems = _.map(system.subsystems, (subsystem, idx) => (
            <div key={`subsystem#${subsystem.name}#${idx}`}>
                <input onChange={() => this.handleClickSubsystem(system.id,
                                                                 subsystem.name)}
                       checked={subsystem.name === this.state.subsystem &&
                                system.id === this.state.systemId}
                       type='radio'
                       name={`subsystem#${system.name}`} />
                {subsystem.name}
            </div>
        ));

        return (
            <div className='systemLine' key={idx}>
                <input
                    onChange={() => this.handleClickSystem(system.id)}
                    checked={system.id === this.state.systemId}
                    type='radio'
                    name='system' />
                <div className='systemName'>{system.name}</div>
                {subsystems}
            </div>
        );
    },

    render() {
        return (
            <div className="systemPicker">
                {_.map(this.props.systems, this.renderSystem)}
                <button onClick={this.handleChooseSystem}
                        className='chooseBtn'>
                    בחר
                </button>
            </div>
        );
    }
});
