
// Cart Functions
function addToCart(itemId) {
    if (!isLocationSelected()) {
        showToast('Select Location', 'Please select your delivery location first.', 'warning');
        return;
    }

    const item = menuData.find(item => item.id === itemId);
    if (item) {
        CartManager.addToCart(item);
        showToast('Added to Cart', `${item.name} added to your cart!`);
    }
}

function updateCartQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    CartManager.updateQuantity(itemId, newQuantity);
    // loadCartPage will be called automatically by CartManager
}

function removeFromCart(itemId) {
    const cart = CartManager.getCart();
    const item = cart.find(item => item.id === itemId);
    if (item) {
        CartManager.removeFromCart(itemId);
        showToast('Item Removed', `${item.name} removed from cart.`);
    }
}

function proceedToCheckout() {
    const customer = CustomerManager.getCustomer();
    
    if (!customer) {
        showToast('Registration Required', 'Please register before placing an order.', 'warning');
        setTimeout(() => {
            showPage('register');
        }, 1000);
        return;
    }

    const selectedLocation = Storage.get('selectedLocation');
    if (!selectedLocation) {
        showToast('Select Location', 'Please select your delivery location.', 'warning');
        setTimeout(() => {
            showPage('menu');
        }, 1000);
        return;
    }

    // Create order
    const customerWithLocation = {
        ...customer,
        location: selectedLocation
    };

    const result = OrderManager.createOrder(customerWithLocation);
    
    if (result.success) {
        showToast('Order Placed!', `Your order ${result.order.id} has been placed successfully!`);
        setTimeout(() => {
            showPage('orders');
        }, 2000);
    } else {
        showToast('Order Failed', result.message, 'error');
    }
}
