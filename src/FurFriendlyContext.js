import React from 'react';

const FurFriendlyContext = React.createContext({
    spaces: [],
    types:[],
    addSpace: () => {},
    filterType: "",
    updateFilterType: () => {},
    filterCity: "",
    updateFilterCity: () => {}
})
export default FurFriendlyContext;