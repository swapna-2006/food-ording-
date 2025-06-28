
// UI Management Functions
let currentCategory = 'all';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
    document.getElementById(pageId + '-link').classList.add('active');

    // Load page content
    switch(pageId) {
        case 'menu':
            renderMenu();
            break;
        case 'cart':
            renderCart();
            break;
        case 'orders':
            renderOrders();
            break;
        case 'register':
            // Register form is already in HTML
            break;
    }
}

function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const filteredItems = currentCategory === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <div>
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-category">${item.category}</span>
                    </div>
                </div>
                <div class="menu-item-price">₹${item.price}</div>
                <div class="menu-item-quantity">${item.quantity}</div>
                <div class="menu-item-actions">
                    <button class="btn btn-primary" onclick="addToCart(${item.id})" ${!isLocationSelected() ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderMenu();
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    const cart = CartManager.getCart();

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h2>Your Cart is Empty</h2>
                <p>Add some delicious items to get started!</p>
                <button class="btn btn-primary" onclick="showPage('menu')">Browse Menu</button>
            </div>
        `;
        return;
    }

    const deliveryFee = OrderManager.getDeliveryFee();
    const subtotal = CartManager.getTotal();
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-content">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price} each</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="btn btn-sm btn-secondary" onclick="removeFromCart(${item.id})" style="margin-left: 1rem;">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>₹${subtotal}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Delivery Fee:</span>
                <span>₹${deliveryFee}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span>Tax (5%):</span>
                <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="proceedToCheckout()">
                Place Order
            </button>
        </div>
    `;
}

function renderOrders() {
    const ordersContent = document.getElementById('orders-content');
    const customer = CustomerManager.getCustomer();
    
    if (!customer) {
        ordersContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h2>Please Register First</h2>
                <p>You need to register to view your orders.</p>
                <button class="btn btn-primary" onclick="showPage('register')">Register Now</button>
            </div>
        `;
        return;
    }

    const orders = OrderManager.getOrders(customer.id);

    if (orders.length === 0) {
        ordersContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h2>No Orders Yet</h2>
                <p>Start by placing your first order!</p>
                <button class="btn btn-primary" onclick="showPage('menu')">Browse Menu</button>
            </div>
        `;
        return;
    }

    ordersContent.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div class="order-id">Order ${order.id}</div>
                <div class="order-status ${order.status}">${order.status.toUpperCase()}</div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-name">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>₹${(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">Total: ₹${order.grandTotal.toFixed(2)}</div>
            <div style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;">
                Ordered on: ${new Date(order.timestamp).toLocaleString()}
                ${order.deliveryBoy ? `<br>Delivery by: ${order.deliveryBoy.name} (${order.deliveryBoy.phone})` : ''}
            </div>
        </div>
    `).join('');
}

function updateCartCount() {
    const count = CartManager.getItemCount();
    document.getElementById('cart-count').textContent = count;
}

function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function handleLocationChange() {
    const locationSelect = document.getElementById('location-select');
    const selectedLocation = locationSelect.value;
    const locationNotice = document.getElementById('location-notice');
    
    if (selectedLocation) {
        Storage.set('selectedLocation', selectedLocation);
        const location = locationData[selectedLocation];
        
        locationNotice.classList.remove('hidden');
        locationNotice.querySelector('.notice-text').textContent = 
            `Delivering to ${location.name} • Delivery fee: ₹${location.deliveryFee}`;
        
        // Re-render menu to enable add to cart buttons
        renderMenu();
        
        showToast('Location Selected', `Now delivering to ${location.name}!`);
    } else {
        Storage.remove('selectedLocation');
        locationNotice.classList.add('hidden');
        renderMenu();
    }
}

function isLocationSelected() {
    return !!Storage.get('selectedLocation');
}
