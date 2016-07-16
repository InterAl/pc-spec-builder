export const CHOOSE_SYSTEM = 'CHOOSE_SYSTEM';

export function chooseSystem(systemId, subsystem) {
    return {
        type: CHOOSE_SYSTEM,
        systemId,
        subsystem
    };
}
