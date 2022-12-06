const rootReducer = (state, action = {}) => {
  switch (action.type) {
    case 'addToShoppingCart': {
      let checkAddedKey = 0;

      const shoppingCart = state.shoppingCart.map((shoppingCartItem) => {
        if (
          shoppingCartItem.productId === action.payload.productId &&
          shoppingCartItem.size === action.payload.size
        ) {
          checkAddedKey = 1;

          return {
            ...shoppingCartItem,
            quantity: shoppingCartItem.quantity + action.payload.quantity,
          };
        }

        return shoppingCartItem;
      });

      if (checkAddedKey) {
        return {
          ...state,
          shoppingCart: shoppingCart,
        };
      }
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };
    }

    case 'removeFromShoppingCart':
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((shoppingCartItem) => {
          return (
            shoppingCartItem.productId !== action.payload.productId ||
            shoppingCartItem.size !== action.payload.size
          );
        }),
      };

    case 'editCartItemSize': {
      let cartItemDuplicateIndex = -1;
      let cartItemIndex = -1;

      let shoppingCart = state.shoppingCart.map((item, i) => {
        if (
          item.productId === action.payload.productId &&
          item.size === action.payload.previousSize
        ) {
          cartItemIndex = i;
        }

        if (
          item.productId === action.payload.productId &&
          item.size === action.payload.size
        ) {
          cartItemDuplicateIndex = i;
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
          };
        }

        return item;
      });

      if (cartItemDuplicateIndex === -1) {
        shoppingCart[cartItemIndex].size = action.payload.size;

        return {
          ...state,
          shoppingCart: shoppingCart,
        };
      }

      shoppingCart = shoppingCart.filter((item) => {
        return (
          item.productId !== action.payload.productId ||
          item.size !== action.payload.previousSize
        );
      });

      return {
        ...state,
        shoppingCart: shoppingCart,
      };
    }

    case 'editCartItemQuantity': {
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((shoppingCartItem) => {
          if (
            shoppingCartItem.productId === action.payload.productId &&
            shoppingCartItem.size === action.payload.size
          ) {
            return action.payload;
          }

          return shoppingCartItem;
        }),
      };
    }

    case 'login':
      return {
        ...state,
        user: {
          token: action.payload.token,
          id: action.payload.userId,
          role: action.payload.userRole,
        },
      };

    case 'removeAllFromShoppingCart':
      return {
        ...state,
        shoppingCart: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
