
// Utility Functions for SWATHI's FOODS Platform

// Local Storage Management
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// ID Generation
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Current User Management
function getCurrentUser() {
    return getFromStorage('currentUser', null);
}

function setCurrentUser(user) {
    return saveToStorage('currentUser', user);
}

function logout() {
    removeFromStorage('currentUser');
    removeFromStorage('cart');
    showToast('Logged Out', 'You have been logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Toast Notification System
function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
        <div>${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

// Cart Management
function getCart() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const userCart = getFromStorage(`cart_${currentUser.id}`, []);
    return Array.isArray(userCart) ? userCart : [];
}

function saveCart(cart) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    return saveToStorage(`cart_${currentUser.id}`, cart);
}

function addToCart(product, quantity = 1) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Please Login', 'You need to login to add items to cart', 'warning');
        return false;
    }

    if (currentUser.userType !== 'customer') {
        showToast('Access Denied', 'Only customers can add items to cart', 'error');
        return false;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast('Added to Cart', `${product.name} added to your cart!`, 'success');
    return true;
}

function updateCartQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (!item) return false;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return true;
    }

    item.quantity = newQuantity;
    saveCart(cart);
    updateCartCount();
    return true;
}

function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartCount();
    showToast('Item Removed', 'Item removed from cart', 'info');
    return true;
}

function clearCart() {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    removeFromStorage(`cart_${currentUser.id}`);
    updateCartCount();
    return true;
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const price = item.discount > 0 ? 
            item.price * (1 - item.discount / 100) : 
            item.price;
        return total + (price * item.quantity);
    }, 0);
}

// Product Management
function getProducts(filters = {}) {
    const products = getFromStorage('products', []);
    let filteredProducts = [...products];

    // Filter by restaurant
    if (filters.restaurantId) {
        filteredProducts = filteredProducts.filter(p => p.restaurantId === filters.restaurantId);
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    // Filter by type
    if (filters.type) {
        filteredProducts = filteredProducts.filter(p => p.type === filters.type);
    }

    // Filter by availability
    if (filters.availability !== false) {
        filteredProducts = filteredProducts.filter(p => p.availability === 'available');
    }

    // Search filter
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    return filteredProducts;
}

function getProductById(id) {
    const products = getFromStorage('products', []);
    return products.find(p => p.id === id);
}

function saveProduct(product) {
    const products = getFromStorage('products', []);
    const existingIndex = products.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
        products[existingIndex] = product;
    } else {
        products.push(product);
    }

    return saveToStorage('products', products);
}

// User Management
function getUserById(id) {
    const users = getFromStorage('users', []);
    return users.find(u => u.id === id);
}

function updateUser(updatedUser) {
    const users = getFromStorage('users', []);
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    
    if (userIndex >= 0) {
        users[userIndex] = updatedUser;
        saveToStorage('users', users);
        
        // Update current user if it's the same user
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === updatedUser.id) {
            setCurrentUser(updatedUser);
        }
        
        return true;
    }
    
    return false;
}

// Order Management
function createOrder(orderData) {
    const orderId = generateId();
    const order = {
        id: orderId,
        ...orderData,
        status: 'placed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const orders = getFromStorage('orders', []);
    orders.push(order);
    saveToStorage('orders', orders);

    return order;
}

function getOrders(filters = {}) {
    const orders = getFromStorage('orders', []);
    let filteredOrders = [...orders];

    if (filters.customerId) {
        filteredOrders = filteredOrders.filter(o => o.customerId === filters.customerId);
    }

    if (filters.restaurantId) {
        filteredOrders = filteredOrders.filter(o => 
            o.items.some(item => item.restaurantId === filters.restaurantId)
        );
    }

    if (filters.status) {
        filteredOrders = filteredOrders.filter(o => o.status === filters.status);
    }

    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return filteredOrders;
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getFromStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (order) {
        order.status = newStatus;
        order.updatedAt = new Date().toISOString();
        saveToStorage('orders', orders);
        return true;
    }

    return false;
}

// Format Helpers
function formatPrice(price) {
    return `₹${parseFloat(price).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Validation Helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Search and Filter Helpers
function searchItems(items, searchTerm, searchFields = ['name', 'description']) {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
        searchFields.some(field => 
            item[field] && item[field].toLowerCase().includes(term)
        )
    );
}

function sortItems(items, sortBy = 'name', sortOrder = 'asc') {
    return items.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle different data types
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
        } else {
            return aValue > bValue ? 1 : -1;
        }
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize platform data
function initializePlatform() {
    console.log('SWATHI\'s FOODS Platform initialized');
    
    // Set up event listeners for common elements
    document.addEventListener('DOMContentLoaded', function() {
        updateCartCount();
        
        // Add click handlers for logout buttons
        const logoutBtns = document.querySelectorAll('[onclick="logout()"]');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', logout);
        });
    });
}

// Call initialization
initializePlatform();
