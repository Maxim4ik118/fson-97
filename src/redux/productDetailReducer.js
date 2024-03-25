const INITIAL_STATE = {
  productData: null,
  isLoading: false,
  isError: false,

  // contacts: []
};

// INITIAL_STATE.isError = false; -> mutable change ❌

// const NEW_STATE = { -> immutable change ✅
//     ...INITIAL_STATE,
//     isError: false
// }

export const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "details/setProductData": {
      return { ...state, productData: action.payload };
    }
    case "details/setIsLoading": {
      return { ...state, isLoading: action.payload };
    }
    case "details/setIsError": {
      return { ...state, isError: action.payload };
    }
    case "contacts/addContact": {
      return { ...state, contacts: [...state.contacts, action.payload] };
    }
    case "contacts/deleteContact": {
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
};
