// --- EMOJI HELPER ---
export const getRoleIcon = (role: string) => {
    switch(role.toLowerCase()) {
        case 'bt': return '🏏';
        case 'bl': return '⚾';
        case 'ar': return '🦾';
        case 'wk': return '🧤';
        case 'sb': return '🌪️';
        default: return '';
    }
};