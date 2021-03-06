import _ from 'lodash';
import React from 'react';
import * as actions from '../actions/chosenSystem';
import classNames from 'classnames';
import {setSystemPickPhase} from '../actions/chosenSystem';
import './SystemPicker.less';

export default class SystemPicker extends React.Component {
    static PropTypes = {
        dispatch: React.PropTypes.func.isRequired,
        systems: React.PropTypes.object.isRequired,
        systemName: React.PropTypes.number.isRequired,
        subsystem: React.PropTypes.string,
        phase: React.PropTypes.string.isRequired
    }

    constructor(props) {
        super();

        this.handleChooseSystem = this.handleChooseSystem.bind(this);
        this.handleClickSystem = this.handleClickSystem.bind(this);
        this.handleClickSubsystem = this.handleClickSubsystem.bind(this);
        this.renderSystem = this.renderSystem.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChooseSystem(systemName, subsystem) {
        this.props.dispatch(actions.chooseSystem(systemName, subsystem));
    }

    handleClickSystem(systemName) {
        let system = _.find(this.props.systems, (s, name) => name === systemName);
        let subsystemName = Object.keys(system.subsystems)[0];
        let subsystem = system.subsystems[subsystemName];

        this.handleChooseSystem(systemName, subsystemName);
        this.props.dispatch(setSystemPickPhase('subsystemPick'));
    }

    handleClickSubsystem(systemName, subsystem) {
        this.handleChooseSystem(this.props.systemName, subsystem);
    }

    handleBack() {
        this.props.dispatch(setSystemPickPhase('systemPick'));
    }

    getSubsystems() {
        let system = _.find(this.props.systems,
                      (s, name) => name === this.props.systemName);

        return {
            subsystems: _.get(system, 'subsystems'),
            systemName: this.props.systemName
        };
    }

    renderSubsystem(systemName, subsystem) {
        return (
            <div key={subsystem}
                className={classNames("system", {
                    selected: this.props.subsystem === subsystem
                })}
                 onClick={() => this.handleClickSubsystem(systemName, subsystem)}>
                {subsystem}
            </div>
        );
    }

    renderSubsystems() {
        const {subsystems, systemName} = this.getSubsystems();

        const options = _.map(subsystems, (subsystem, subsystemName) => ({
            value: subsystemName,
            label: subsystemName
        }));

        return (
            <div className="systems subsystemPick">
                <span className='system-back' onClick={this.handleBack}>
                    ⟳
                </span>
                <div className="subsystems">
                    {_.map(subsystems, (s, sub) => this.renderSubsystem(systemName, sub))}
                    <span className="arrow">
                        ⬅
                    </span>
                </div>
                <div className={classNames("system", {
                    selected: this.props.systemName === systemName
                })}>
                    {systemName}
                </div>
            </div>
        );
    }

    renderSystem(system, name) {
        return (
            <div key={name}
                 className={classNames("system", {
                    selected: this.props.systemName === name
                })}
                 onClick={() => this.handleClickSystem(name)}>
                {name}
            </div>
        );
    }

    renderSystems() {
        return (
            <div className="systems">
                {
                    _.map(this.props.systems, this.renderSystem)
                }
            </div>
        );
    }

    render() {
        return (
            <div className="systemPicker">
                <div className="row system-header">
                    בחר סוג מערכת
                </div>
                {this.props.phase === 'systemPick' &&
                    <div className="row">
                        {this.renderSystems()}
                    </div>
                }
                {this.props.phase === 'subsystemPick' &&
                    <div className="row">
                        {this.renderSubsystems()}
                    </div>
                }
            </div>
        );
    }
}
