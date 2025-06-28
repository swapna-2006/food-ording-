
// Checkout functionality for SWATHI'S FOODS

function loadCheckoutPage() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Empty Cart', 'Your cart is empty. Add items to proceed.', 'warning');
        setTimeout(() => window.location.href = 'products.html', 1500);
        return;
    }

    displayOrderSummary(cart);
    calculateTotals(cart);
    prefillCustomerDetails();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckout);
}

function displayOrderSummary(cart) {
    const orderItemsContainer = document.getElementById('orderItems');
    
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p class="item-price">₹${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function calculateTotals(cart) {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + deliveryFee + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
}

function prefillCustomerDetails() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById('customerEmail').value = currentUser.email || '';
        document.getElementById('customerName').value = currentUser.username || '';
    }
}

function handleCheckout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const checkoutData = Object.fromEntries(formData.entries());
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerEmail', 'customerMobile', 'customerAddress', 'customerPincode', 'paymentMethod'];
    const missingFields = requiredFields.filter(field => !checkoutData[field]);
    
    if (missingFields.length > 0) {
        showToast('Missing Information', 'Please fill all required fields', 'error');
        return;
    }

    // Validate email
    if (!isValidEmail(checkoutData.customerEmail)) {
        showToast('Invalid Email', 'Please enter a valid email address', 'error');
        return;
    }

    // Validate mobile
    if (!isValidPhone(checkoutData.customerMobile)) {
        showToast('Invalid Mobile', 'Please enter a valid mobile number', 'error');
        return;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(checkoutData.customerPincode)) {
        showToast('Invalid Pincode', 'Please enter a valid 6-digit pincode', 'error');
        return;
    }

    // Process order
    processOrder(checkoutData);
}

function processOrder(checkoutData) {
    const currentUser = getCurrentUser();
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + deliveryFee + tax;

    const order = {
        id: generateId(),
        customerId: currentUser.id,
        customerDetails: {
            name: checkoutData.customerName,
            email: checkoutData.customerEmail,
            mobile: checkoutData.customerMobile,
            address: checkoutData.customerAddress,
            pincode: checkoutData.customerPincode,
            landmark: checkoutData.customerLandmark || '',
            specialInstructions: checkoutData.specialInstructions || ''
        },
        items: [...cart],
        pricing: {
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            tax: tax,
            grandTotal: grandTotal
        },
        paymentMethod: checkoutData.paymentMethod,
        status: 'placed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes
        restaurantIds: [...new Set(cart.map(item => item.restaurantId))]
    };

    // Save order
    const orders = getFromStorage('orders', []);
    orders.push(order);
    saveToStorage('orders', orders);

    // Clear cart
    clearCart();

    // Show success message
    showToast('Order Placed!', `Your order #${order.id} has been placed successfully!`, 'success');
    
    // Redirect to order confirmation or dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html?tab=orders';
    }, 2000);
}

function updateUserWelcome() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById('userWelcome').textContent = `Welcome, ${currentUser.username}`;
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}
