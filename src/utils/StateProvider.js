import react,{createContext,useContext,useReducer} from 'react';

//prepare the data layer
export const StateContext=createContext();

// wrap our app and provide data to all the components
export const StateProvider=({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider> 
);
// Pull information from the data layer
export const useStateValue=()=>useContext(StateContext);
