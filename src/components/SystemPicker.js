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
            this.setState({ subsystem: subsystem && subsystem.name });
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
            <span className='subsystem' key={`subsystem#${subsystem.name}#${idx}`}>
                <span className='subsystem-inner pull-right'>
                    <input onChange={() => this.handleClickSubsystem(system.id,
                                                                 subsystem.name)}
                           checked={subsystem.name === this.state.subsystem &&
                                    system.id === this.state.systemId}
                           type='radio'
                           name={`subsystem#${system.name}`} />
                    {subsystem.name}
                </span>
            </span>
        ));

        return (
            <div className='systemLine row' key={idx}>
                <span className='col-md-7 pull-right'>
                    <input
                        onChange={() => this.handleClickSystem(system.id)}
                        checked={system.id === this.state.systemId}
                        type='radio'
                        name='system' />
                    <span className='systemName'>{system.name}</span>
                </span>
                <span className='col-md-11 pull-right'>
                    {subsystems}
                </span>
            </div>
        );
    },

    render() {
        return (
            <div className="systemPicker">
                <div className="header">בחר סוג מערכת</div>
                <div className="systems">
                    {_.map(this.props.systems, this.renderSystem)}
                </div>
                <button onClick={this.handleChooseSystem}
                        className='chooseBtn btn'>
                    בחר
                </button>
            </div>
        );
    }
});
