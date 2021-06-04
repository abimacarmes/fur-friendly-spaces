import React from 'react';

const FurFriendlyContext = React.createContext({
    spaces: [],
    types:[],
    addSpace: () => {},
    filterType: "",
    updateFilterType: () => {},
    filterCity: "",
    updateFilterCity: () => {},
    upVote: () => {},
    downVote: () => {}
})
export default FurFriendlyContext;