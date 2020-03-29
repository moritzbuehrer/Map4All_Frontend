export const statesLayer = {
    id: 'states',
    type: 'fill',
    source: 'state_data_fill',
    paint: {
        'fill-outline-color': 'rgba(19,91,236,0.3)',
        'fill-color': 'rgba(19,91,236,0.1)'
    }
};

export const highlightLayer = {
    id: 'states-highlighted',
    type: 'fill',
    source: 'state_data_fill',
    paint: {
        'fill-color': 'rgba(19,91,236,0.4)',
        'fill-opacity': 0.5
    }
};