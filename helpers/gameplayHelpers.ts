import { FIELDING_POSITIONS } from '../utils/constants';

export const getPowerplayFieldingPositions = (phase: keyof typeof FIELDING_POSITIONS) => FIELDING_POSITIONS[phase] || FIELDING_POSITIONS['P2'];