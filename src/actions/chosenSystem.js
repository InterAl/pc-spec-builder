export const CHOOSE_SYSTEM = 'CHOOSE_SYSTEM';

export function chooseSystem(systemName, subsystem) {
    return {
        type: CHOOSE_SYSTEM,
        systemName,
        subsystem
    };
}
