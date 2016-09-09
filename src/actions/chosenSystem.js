export const CHOOSE_SYSTEM = 'CHOOSE_SYSTEM';

export function chooseSystem(systemName, subsystem) {
    return {
        type: CHOOSE_SYSTEM,
        systemName,
        subsystem
    };
}

export const SET_SYSTEM_PICK_PHASE = 'SET_SYSTEM_PICK_PHASE';

export function setSystemPickPhase(phase) {
    return {
        type: SET_SYSTEM_PICK_PHASE,
        phase
    };
}
