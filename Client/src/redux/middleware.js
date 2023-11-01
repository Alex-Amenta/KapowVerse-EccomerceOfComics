export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined;
        }
        
        const loadedState = JSON.parse(serializedState);
        

        const expectedKeys = ["cart", "error", "itemQuantity", "loading", "totalItemsInCart", "totalPrice", "darkMode"];
        const loadedStateKeys = Object.keys(loadedState);
        const isValidState = loadedStateKeys.every(key => expectedKeys.includes(key));

        if (!isValidState) {
            return undefined;
        }
        return loadedState;
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({cart:state.cart, darkMode: state.darkMode});
        localStorage.setItem('cart', serializedState);
    } catch {
        // Ignorar errores de write
    }
};