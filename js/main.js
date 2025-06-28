
// Main Application Logic
let currentPage = 'menu';
let selectedCategory = 'all';
let selectedLocation = '';
let searchQuery = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initialized');
    
    // Initialize UI components
    initializeNavigation();
    initializeLocationSelector();
    initializeCategoryFilters();
    initializeSearchFunctionality();
    initializeCartDisplay();
    
    // Load initial data
    loadMenuItems();
    loadProductsPage();
    loadCartPage();
    loadOrdersPage();
    updateCartCount();
    
    // Load customer data if exists
    loadCustomerData();
    
    console.log('All components initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });
}

// Show specific page
function showPage(pageName) {
    console.log(`Switching to page: ${pageName}`);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
        
        // Load page-specific content
        if (pageName === 'cart') {
            loadCartPage();
        } else if (pageName === 'products') {
            loadProductsPage();
        } else if (pageName === 'orders') {
            loadOrdersPage();
        }
    }
}

// Location selector functionality
function initializeLocationSelector() {
    const locationSelect = document.getElementById('locationSelect');
    const locationNotice = document.getElementById('locationNotice');
    
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            selectedLocation = this.value;
            console.log(`Location selected: ${selectedLocation}`);
            
            if (selectedLocation) {
                locationNotice.classList.remove('hidden');
                Storage.set('selectedLocation', selectedLocation);
                showToast('Location Selected', `Delivery available in ${selectedLocation}!`);
            } else {
                locationNotice.classList.add('hidden');
                Storage.remove('selectedLocation');
            }
        });
        
        // Load saved location
        const savedLocation = Storage.get('selectedLocation');
        if (savedLocation) {
            locationSelect.value = savedLocation;
            selectedLocation = savedLocation;
            locationNotice.classList.remove('hidden');
        }
    }
}

// Category filter functionality
function initializeCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected category
            selectedCategory = this.getAttribute('data-category');
            console.log(`Category selected: ${selectedCategory}`);
            
            // Filter and display items
            if (currentPage === 'menu') {
                loadMenuItems();
            } else if (currentPage === 'products') {
                loadProductsPage();
            }
        });
    });
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.toLowerCase();
            console.log(`Search query: ${searchQuery}`);
            loadProductsPage();
        });
    }
}

// Load menu items for home page
function loadMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    const filteredItems = getFilteredItems();
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p class="no-items">No items found in this category.</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuGrid.appendChild(menuItem);
    });
}

// Load products page
function loadProductsPage() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const filteredItems = getFilteredItems();
    productsGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        productsGrid.innerHTML = '<p class="no-items">No products found.</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const productItem = createProductItemElement(item);
        productsGrid.appendChild(productItem);
    });
}

// Get filtered items based on category and search
function getFilteredItems() {
    let items = [...menuData];
    
    // Filter by category
    if (selectedCategory !== 'all') {
        items = items.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery) ||
            (item.description && item.description.toLowerCase().includes(searchQuery))
        );
    }
    
    return items;
}

// Create menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'">
        </div>
        <div class="menu-item-content">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-description">${item.description || 'Delicious and authentic dish'}</p>
            <div class="menu-item-footer">
                <span class="menu-item-price">₹${item.price}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})" ${!selectedLocation ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return menuItem;
}

// Create product item element
function createProductItemElement(item) {
    const productItem = document.createElement('div');
    productItem.className = 'menu-item product-item';
    productItem.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'">
        </div>
        <div class="menu-item-content">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-description">${item.description || 'Delicious and authentic dish'}</p>
            <p class="menu-item-category">Category: ${item.category}</p>
            <div class="menu-item-footer">
                <span class="menu-item-price">₹${item.price}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return productItem;
}

// Cart display initialization
function initializeCartDisplay() {
    updateCartCount();
}

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cart = CartManager.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Load cart page
function loadCartPage() {
    const cartItems = document.getElementById('cartItems');
    const totalItems = document.getElementById('totalItems');
    const totalPrice = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItems) return;
    
    const cart = CartManager.getCart();
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Start adding some delicious items!</p>';
        if (totalItems) totalItems.textContent = '0';
        if (totalPrice) totalPrice.textContent = '0';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }
    
    let itemCount = 0;
    let priceSum = 0;
    
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItems.appendChild(cartItem);
        itemCount += item.quantity;
        priceSum += item.price * item.quantity;
    });
    
    if (totalItems) totalItems.textContent = itemCount;
    if (totalPrice) totalPrice.textContent = priceSum;
    if (checkoutBtn) {
        checkoutBtn.style.display = 'block';
        checkoutBtn.onclick = proceedToCheckout;
    }
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=${encodeURIComponent(item.name)}'">
        </div>
        <div class="cart-item-content">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">₹${item.price} each</p>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <p class="cart-item-total">Subtotal: ₹${item.price * item.quantity}</p>
        </div>
        <div class="cart-item-actions">
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `;
    return cartItem;
}

// Load customer data
function loadCustomerData() {
    const customer = CustomerManager.getCustomer();
    if (customer) {
        const form = document.getElementById('registerForm');
        if (form) {
            document.getElementById('customerName').value = customer.name || '';
            document.getElementById('customerPhone').value = customer.phone || '';
            document.getElementById('customerEmail').value = customer.email || '';
            document.getElementById('customerAddress').value = customer.address || '';
        }
    }
    
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const customerData = {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                email: document.getElementById('customerEmail').value,
                address: document.getElementById('customerAddress').value
            };
            
            CustomerManager.saveCustomer(customerData);
            showToast('Registration Successful', 'Your information has been saved!');
        });
    }
}

// Load orders page
function loadOrdersPage() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    const orders = OrderManager.getOrders();
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-orders">No orders yet. Place your first order!</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderItem = createOrderItemElement(order);
        ordersList.appendChild(orderItem);
    });
}

// Create order item element
function createOrderItemElement(order) {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
        <div class="order-header">
            <h4>Order #${order.id}</h4>
            <span class="order-status status-${order.status}">${order.status.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div class="order-details">
            <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹${order.total}</p>
            <p><strong>Items:</strong> ${order.items.length}</p>
            ${order.deliveryBoy ? `<p><strong>Delivery Partner:</strong> ${order.deliveryBoy.name} (${order.deliveryBoy.phone})</p>` : ''}
        </div>
        <div class="order-actions">
            <button onclick="trackOrder('${order.id}')" class="track-btn">Track Order</button>
        </div>
    `;
    return orderItem;
}

// Location validation
function isLocationSelected() {
    return selectedLocation !== '';
}

// Utility function to show toast messages
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

// Initialize cart managers and customer managers
const CartManager = {
    getCart: () => Storage.get('cart', []),
    
    addToCart: (item) => {
        const cart = CartManager.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        Storage.set('cart', cart);
        updateCartCount();
        console.log('Item added to cart:', item.name);
    },
    
    updateQuantity: (itemId, newQuantity) => {
        const cart = CartManager.getCart();
        const item = cart.find(cartItem => cartItem.id === itemId);
        
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            Storage.set('cart', cart);
            updateCartCount();
            if (currentPage === 'cart') {
                loadCartPage();
            }
            return true;
        }
        return false;
    },
    
    removeFromCart: (itemId) => {
        let cart = CartManager.getCart();
        cart = cart.filter(item => item.id !== itemId);
        Storage.set('cart', cart);
        updateCartCount();
        if (currentPage === 'cart') {
            loadCartPage();
        }
        return true;
    },
    
    clearCart: () => {
        Storage.remove('cart');
        updateCartCount();
    }
};

const CustomerManager = {
    getCustomer: () => Storage.get('customer'),
    
    saveCustomer: (customerData) => {
        Storage.set('customer', customerData);
        console.log('Customer data saved:', customerData.name);
    }
};

const OrderManager = {
    getOrders: () => Storage.get('orders', []),
    
    createOrder: (customer) => {
        const cart = CartManager.getCart();
        if (cart.length === 0) {
            return { success: false, message: 'Cart is empty' };
        }
        
        const orderId = 'ORD' + Date.now();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const order = {
            id: orderId,
            customer: customer,
            items: [...cart],
            total: total,
            status: 'placed',
            timestamp: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
            deliveryBoy: assignDeliveryBoy(customer.location)
        };
        
        const orders = OrderManager.getOrders();
        orders.push(order);
        Storage.set('orders', orders);
        
        CartManager.clearCart();
        
        return { success: true, order: order };
    },
    
    updateOrderStatus: (orderId, newStatus) => {
        const orders = OrderManager.getOrders();
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
            order.status = newStatus;
            Storage.set('orders', orders);
            return true;
        }
        return false;
    }
};

// Assign delivery boy based on location
function assignDeliveryBoy(location) {
    const deliveryBoys = [
        { name: 'Ravi Kumar', phone: '+91 9876543210', area: 'hyderabad' },
        { name: 'Suresh Reddy', phone: '+91 9876543211', area: 'secunderabad' },
        { name: 'Prakash Rao', phone: '+91 9876543212', area: 'vijayawada' },
        { name: 'Venkat Goud', phone: '+91 9876543213', area: 'warangal' },
        { name: 'Krishna Murthy', phone: '+91 9876543214', area: 'tirupati' }
    ];
    
    return deliveryBoys.find(boy => boy.area === location) || deliveryBoys[0];
}
