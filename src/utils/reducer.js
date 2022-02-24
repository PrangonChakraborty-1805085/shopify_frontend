export const initialState = {
  basket: [],
  user: null,
};
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const prod_index = state.basket.findIndex((item) => item.id === action.item.id);
      // console.log("prod index is ",prod_index)
      let newBaskett = [...state.basket];
      if (prod_index >= 0) {
        newBaskett.splice(prod_index, 1);
        // newBaskett.push(action.item);
        return {
          ...state,
          basket: [...newBaskett,action.item]
        };
      }
      else{
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
      }
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
        return {
          ...state,
          basket: newBasket,
        };
      } else
        console.warn(
          `Can't remove product having id ${action.id} as it is not present in the basket`
        );
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "UPDATE_BASKET":
      const indexx = state.basket.findIndex((item) => item.id === action.body.id);
      let newBasket2 = [...state.basket];
      if (indexx >= 0) {
        newBasket2[indexx].amount = action.body.amount; 
        return {
          ...state,
          basket: newBasket2,
        };
      }

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
