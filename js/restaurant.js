
// Restaurant Management Functions for SWATHI's FOODS

// Load Restaurant Dashboard
function loadRestaurantDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.userType !== 'restaurant') return;

    loadRestaurantInfo();
    loadMyFoodItems();
    loadRestaurantOrders();
}

// Load Restaurant Information
function loadRestaurantInfo() {
    const currentUser = getCurrentUser();
    const restaurantInfo = document.getElementById('restaurantInfo');

    if (!restaurantInfo) return;

    restaurantInfo.innerHTML = `
        <div class="restaurant-info-card">
            <div class="restaurant-header">
                <div class="restaurant-image">
                    <img src="${currentUser.restaurantImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'}" 
                         alt="${currentUser.restaurantName}">
                </div>
                <div class="restaurant-details">
                    <h2>${currentUser.restaurantName}</h2>
                    <p class="restaurant-cuisine">${currentUser.cuisineType}</p>
                    <p class="restaurant-address">${currentUser.restaurantAddress}</p>
                    <p class="restaurant-phone">${currentUser.restaurantPhone}</p>
                </div>
            </div>
        </div>
    `;
}

// Load My Food Items
function loadMyFoodItems() {
    const currentUser = getCurrentUser();
    const products = getProducts({ restaurantId: currentUser.id });
    const container = document.getElementById('myFoodItems');

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p class="no-data">No food items added yet. <a href="add-item.html">Add your first item</a></p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image || 'https://images.unsplash.com/photo-1546554137-f86b9593a222'}" 
                     alt="${product.name}">
            </div>
            <div class="product-details">
                <span class="product-type ${product.type}">${product.type}</span>
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-pricing">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    ${product.discount > 0 ? `<span class="product-discount">${product.discount}% OFF</span>` : ''}
                </div>
                <div class="product-meta">
                    <span class="prep-time">⏱️ ${product.preparationTime}min</span>
                    <span class="spice-level">${getSpiceLevelEmoji(product.spiceLevel)} ${product.spiceLevel}</span>
                </div>
                <div class="product-actions">
                    <button onclick="editProduct('${product.id}')" class="btn-secondary">Edit</button>
                    <button onclick="toggleAvailability('${product.id}')" 
                            class="btn-${product.availability === 'available' ? 'warning' : 'success'}">
                        ${product.availability === 'available' ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button onclick="deleteProduct('${product.id}')" class="btn-danger">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Restaurant Orders
function loadRestaurantOrders() {
    const currentUser = getCurrentUser();
    const orders = getOrders({ restaurantId: currentUser.id });
    const container = document.getElementById('recentOrders');

    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = '<p class="no-data">No orders received yet.</p>';
        return;
    }

    const users = getFromStorage('users', []);

    container.innerHTML = orders.slice(0, 5).map(order => {
        const customer = users.find(u => u.id === order.customerId);
        const customerName = customer ? customer.username : 'Unknown Customer';

        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info">
                        <h4>Order #${order.id.substring(0, 8)}</h4>
                        <p><strong>Customer:</strong> ${customerName}</p>
                        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                        <p><strong>Status:</strong> 
                            <span class="status-badge ${order.status}">${order.status}</span>
                        </p>
                        <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
                    </div>
                    <div class="order-actions">
                        <select onchange="updateOrderStatus('${order.id}', this.value)" class="status-select">
                            <option value="placed" ${order.status === 'placed' ? 'selected' : ''}>Placed</option>
                            <option value="accepted" ${order.status === 'accepted' ? 'selected' : ''}>Accepted</option>
                            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                            <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                    </div>
                </div>
                <div class="order-items">
                    <h5>Items:</h5>
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>${formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-customer-details">
                    <h5>Delivery Details:</h5>
                    <p>${order.customerDetails.name}</p>
                    <p>${order.customerDetails.phone}</p>
                    <p>${order.customerDetails.address}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Handle Add Item Form
function handleAddItem(event) {
    event.preventDefault();
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.userType !== 'restaurant') {
        showToast('Error', 'Access denied', 'error');
        return;
    }

    const formData = new FormData(event.target);
    
    // Get category (custom or selected)
    let category = formData.get('itemCategory');
    if (category === 'other') {
        category = formData.get('customCategory').trim().toLowerCase();
        if (!category) {
            showToast('Error', 'Please enter a custom category name', 'error');
            return;
        }
    }

    const productData = {
        id: generateId(),
        name: formData.get('itemName').trim(),
        description: formData.get('itemDescription').trim(),
        price: parseFloat(formData.get('itemPrice')),
        image: formData.get('itemImage')?.trim(),
        type: formData.get('itemType'),
        category: category,
        discount: parseInt(formData.get('discount')) || 0,
        availability: formData.get('availability'),
        preparationTime: parseInt(formData.get('preparationTime')) || 30,
        spiceLevel: formData.get('spiceLevel') || 'mild',
        restaurantId: currentUser.id,
        restaurantName: currentUser.restaurantName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || 
        !productData.type || !productData.category) {
        showToast('Error', 'Please fill in all required fields', 'error');
        return;
    }

    // Validate price
    if (productData.price <= 0) {
        showToast('Error', 'Price must be greater than 0', 'error');
        return;
    }

    // Validate image URL if provided
    if (productData.image && !isValidUrl(productData.image)) {
        showToast('Error', 'Please enter a valid image URL', 'error');
        return;
    }

    // Save product
    if (saveProduct(productData)) {
        showToast('Success', 'Food item added successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showToast('Error', 'Failed to add food item', 'error');
    }
}

// Toggle Product Availability
function toggleAvailability(productId) {
    const product = getProductById(productId);
    if (!product) {
        showToast('Error', 'Product not found', 'error');
        return;
    }

    const currentUser = getCurrentUser();
    if (product.restaurantId !== currentUser.id) {
        showToast('Error', 'You can only modify your own products', 'error');
        return;
    }

    product.availability = product.availability === 'available' ? 'out-of-stock' : 'available';
    product.updatedAt = new Date().toISOString();

    if (saveProduct(product)) {
        const status = product.availability === 'available' ? 'available' : 'unavailable';
        showToast('Updated', `${product.name} is now ${status}`, 'success');
        loadMyFoodItems(); // Refresh the items list
    } else {
        showToast('Error', 'Failed to update availability', 'error');
    }
}

// Delete Product
function deleteProduct(productId) {
    const product = getProductById(productId);
    if (!product) {
        showToast('Error', 'Product not found', 'error');
        return;
    }

    const currentUser = getCurrentUser();
    if (product.restaurantId !== currentUser.id) {
        showToast('Error', 'You can only delete your own products', 'error');
        return;
    }

    if (!confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
        return;
    }

    const products = getFromStorage('products', []);
    const updatedProducts = products.filter(p => p.id !== productId);

    if (saveToStorage('products', updatedProducts)) {
        showToast('Deleted', `${product.name} has been deleted`, 'info');
        loadMyFoodItems(); // Refresh the items list
    } else {
        showToast('Error', 'Failed to delete product', 'error');
    }
}

// Edit Product (redirect to edit form)
function editProduct(productId) {
    // For now, we'll just show a toast. In a full implementation, 
    // you'd redirect to an edit form or open a modal
    showToast('Feature Coming Soon', 'Product editing will be available soon', 'info');
}

// Update Order Status
function updateOrderStatus(orderId, newStatus) {
    if (updateOrderStatus(orderId, newStatus)) {
        showToast('Updated', `Order status updated to ${newStatus}`, 'success');
        loadRestaurantOrders(); // Refresh orders
    } else {
        showToast('Error', 'Failed to update order status', 'error');
    }
}

// Get Restaurant Statistics
function getRestaurantStats() {
    const currentUser = getCurrentUser();
    const products = getProducts({ restaurantId: currentUser.id });
    const orders = getOrders({ restaurantId: currentUser.id });

    const stats = {
        totalProducts: products.length,
        availableProducts: products.filter(p => p.availability === 'available').length,
        totalOrders: orders.length,
        completedOrders: orders.filter(o => o.status === 'delivered').length,
        pendingOrders: orders.filter(o => ['placed', 'accepted', 'preparing', 'ready'].includes(o.status)).length,
        totalRevenue: orders.filter(o => o.status === 'delivered').reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
        ordersToday: orders.filter(o => {
            const today = new Date().toDateString();
            const orderDate = new Date(o.createdAt).toDateString();
            return today === orderDate;
        }).length,
        revenueToday: orders.filter(o => {
            const today = new Date().toDateString();
            const orderDate = new Date(o.createdAt).toDateString();
            return today === orderDate;
        }).reduce((sum, order) => sum + order.total, 0)
    };

    return stats;
}

// Helper Functions
function getSpiceLevelEmoji(spiceLevel) {
    const emojis = {
        'mild': '🌶️',
        'medium': '🌶️🌶️',
        'hot': '🌶️🌶️🌶️',
        'very-hot': '🌶️🌶️🌶️🌶️'
    };
    return emojis[spiceLevel] || '🌶️';
}

// Get Popular Products
function getPopularProducts() {
    const currentUser = getCurrentUser();
    const products = getProducts({ restaurantId: currentUser.id });
    const orders = getOrders({ restaurantId: currentUser.id });

    // Count how many times each product was ordered
    const productOrderCount = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (item.restaurantId === currentUser.id) {
                productOrderCount[item.id] = (productOrderCount[item.id] || 0) + item.quantity;
            }
        });
    });

    // Sort products by order count
    return products
        .map(product => ({
            ...product,
            orderCount: productOrderCount[product.id] || 0
        }))
        .sort((a, b) => b.orderCount - a.orderCount)
        .slice(0, 5); // Top 5
}

// Export Restaurant Data
function exportRestaurantData() {
    const currentUser = getCurrentUser();
    const products = getProducts({ restaurantId: currentUser.id });
    const orders = getOrders({ restaurantId: currentUser.id });
    const stats = getRestaurantStats();

    const data = {
        restaurant: {
            name: currentUser.restaurantName,
            owner: currentUser.username,
            email: currentUser.email,
            phone: currentUser.restaurantPhone,
            address: currentUser.restaurantAddress,
            cuisine: currentUser.cuisineType
        },
        products: products,
        orders: orders,
        statistics: stats,
        exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${currentUser.restaurantName.replace(/\s+/g, '-').toLowerCase()}-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

console.log('Restaurant management functions loaded');
