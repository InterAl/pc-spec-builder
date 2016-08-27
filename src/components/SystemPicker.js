import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import * as actions from '../actions/chosenSystem';
import './SystemPicker.less';

export default class SystemPicker extends React.Component {
    static PropTypes = {
        dispatch: React.PropTypes.func.isRequired,
        systems: React.PropTypes.object.isRequired,
        systemId: React.PropTypes.number.isRequired,
        subsystem: React.PropTypes.string
    }

    constructor(props) {
        super();

        this.state = {
            systemId: props.systemId,
            subsystem: props.subsystem
        };

        this.handleChooseSystem = this.handleChooseSystem.bind(this);
        this.handleClickSystem = this.handleClickSystem.bind(this);
        this.handleClickSubsystem = this.handleClickSubsystem.bind(this);
    }

    handleChooseSystem() {
        let {systemId, subsystem} = this.state;
        this.props.dispatch(actions.chooseSystem(systemId, subsystem));
    }

    handleClickSystem(systemId) {
        if (systemId !== this.state.systemId) {
            let system = _.find(this.props.systems, s => s.id === systemId);
            let subsystem = _.first(system.subsystems);
            this.setState({ subsystem: subsystem && subsystem.name });
        }

        this.setState({
            systemId
        });
    }

    handleClickSubsystem(systemId, subsystem) {
        this.state.systemId === systemId &&
        this.setState({subsystem: _.get(subsystem, 'value')});
    }

    getSubsystems() {
        let system = _.find(this.props.systems,
                      s => s.id === this.state.systemId);

        return {
            subsystems: _.get(system, 'subsystems'),
            system
        };
    }

    renderSubsystems() {
        const {subsystems, system} = this.getSubsystems();

        const options = _.map(subsystems, (subsystem, idx) => ({
            value: subsystem.name,
            label: subsystem.name
        }));

        return (
            <Select onChange={
                subsystem => this.handleClickSubsystem(system.id, subsystem)
            }
                    value={this.state.subsystem}
                    className="select col-xs-10 pull-right"
                    clearable={false}
                    dir="ltr"
                    options={options}
                />
        );
    }

    renderSystems() {
        const options = _.map(this.props.systems, (system, idx) => ({
            value: system.id,
            label: system.name
        }));

        return (
            <Select onChange={({value}) => this.handleClickSystem(value)}
                    value={this.state.systemId}
                    className="select col-xs-10 pull-right system"
                    clearable={false}
                    dir="ltr"
                    options={options}
                />
        );
    }

    render() {
        return (
            <div className="systemPicker">
                <div className="systems row">
                    <div className="col-xs-6 pull-right">
                        <div className="col-xs-2 pull-right">
                            סוג מערכת:
                        </div>
                        <div className="col-xs-10 pull-right">
                            {this.renderSystems()}
                        </div>
                    </div>
                    {_.get(this.getSubsystems(), 'subsystems.length') > 0 &&
                    <div className="col-xs-3 pull-right">
                        {this.renderSubsystems()}
                    </div>
                    }
                </div>
                <button onClick={this.handleChooseSystem}
                        className='chooseBtn btn'>
                    בחר
                </button>
            </div>
        );
    }
}
