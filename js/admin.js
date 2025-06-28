
// Admin Panel Functions for SWATHI's FOODS

// Load Admin Dashboard
function loadAdminDashboard() {
    updateAdminStats();
    loadApprovalRequests();
    loadAllUsers();
    loadRecentOrders();
}

// Update Admin Statistics
function updateAdminStats() {
    const users = getFromStorage('users', []);
    const orders = getFromStorage('orders', []);
    
    const totalUsers = users.length;
    const totalRestaurants = users.filter(u => u.userType === 'restaurant' && u.approved).length;
    const totalOrders = orders.length;
    const pendingApprovals = users.filter(u => u.userType === 'restaurant' && !u.approved).length;

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalRestaurants').textContent = totalRestaurants;
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('pendingApprovals').textContent = pendingApprovals;
}

// Load Restaurant Approval Requests
function loadApprovalRequests() {
    const users = getFromStorage('users', []);
    const pendingRestaurants = users.filter(u => u.userType === 'restaurant' && !u.approved);
    const approvalContainer = document.getElementById('approvalRequests');

    if (pendingRestaurants.length === 0) {
        approvalContainer.innerHTML = '<p class="no-data">No pending approval requests</p>';
        return;
    }

    approvalContainer.innerHTML = pendingRestaurants.map(restaurant => `
        <div class="approval-card">
            <div class="approval-header">
                <div class="approval-info">
                    <h3>${restaurant.restaurantName}</h3>
                    <p><strong>Owner:</strong> ${restaurant.username}</p>
                    <p><strong>Email:</strong> ${restaurant.email}</p>
                    <p><strong>Phone:</strong> ${restaurant.restaurantPhone}</p>
                    <p><strong>Address:</strong> ${restaurant.restaurantAddress}</p>
                    <p><strong>Cuisine:</strong> ${restaurant.cuisineType}</p>
                    <p><strong>Registered:</strong> ${formatDate(restaurant.createdAt)}</p>
                </div>
                <div class="approval-actions">
                    <button class="approve-btn" onclick="approveRestaurant('${restaurant.id}')">
                        Approve
                    </button>
                    <button class="reject-btn" onclick="rejectRestaurant('${restaurant.id}')">
                        Reject
                    </button>
                </div>
            </div>
            ${restaurant.restaurantImage ? `
                <div style="margin-top: 15px;">
                    <img src="${restaurant.restaurantImage}" 
                         alt="${restaurant.restaurantName}" 
                         style="max-width: 200px; border-radius: 10px;">
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Approve Restaurant
function approveRestaurant(restaurantId) {
    const users = getFromStorage('users', []);
    const restaurant = users.find(u => u.id === restaurantId);

    if (!restaurant) {
        showToast('Error', 'Restaurant not found', 'error');
        return;
    }

    restaurant.approved = true;
    restaurant.approvedAt = new Date().toISOString();
    restaurant.approvedBy = getCurrentUser().id;

    if (updateUser(restaurant)) {
        showToast('Success', `${restaurant.restaurantName} has been approved!`, 'success');
        loadAdminDashboard(); // Refresh the dashboard
    } else {
        showToast('Error', 'Failed to approve restaurant', 'error');
    }
}

// Reject Restaurant
function rejectRestaurant(restaurantId) {
    if (!confirm('Are you sure you want to reject this restaurant? This action cannot be undone.')) {
        return;
    }

    const users = getFromStorage('users', []);
    const restaurantIndex = users.findIndex(u => u.id === restaurantId);

    if (restaurantIndex === -1) {
        showToast('Error', 'Restaurant not found', 'error');
        return;
    }

    const restaurant = users[restaurantIndex];
    
    // Remove the restaurant from users
    users.splice(restaurantIndex, 1);
    
    if (saveToStorage('users', users)) {
        showToast('Rejected', `${restaurant.restaurantName} has been rejected and removed`, 'info');
        loadAdminDashboard(); // Refresh the dashboard
    } else {
        showToast('Error', 'Failed to reject restaurant', 'error');
    }
}

// Load All Users
function loadAllUsers() {
    const users = getFromStorage('users', []);
    const usersTable = document.getElementById('usersTable');

    if (users.length === 0) {
        usersTable.innerHTML = '<tr><td colspan="6" class="no-data">No users found</td></tr>';
        return;
    }

    usersTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <span class="status-badge ${user.userType}">
                    ${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                </span>
            </td>
            <td>
                <span class="status-badge ${user.approved ? 'approved' : 'pending'}">
                    ${user.approved ? 'Approved' : 'Pending'}
                </span>
            </td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                ${user.userType === 'restaurant' && !user.approved ? `
                    <button class="approve-btn" onclick="approveRestaurant('${user.id}')" style="font-size: 0.8rem; padding: 4px 8px;">
                        Approve
                    </button>
                ` : ''}
                ${user.userType !== 'admin' ? `
                    <button class="reject-btn" onclick="deleteUser('${user.id}')" style="font-size: 0.8rem; padding: 4px 8px;">
                        Delete
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// Delete User
function deleteUser(userId) {
    const currentUser = getCurrentUser();
    if (userId === currentUser.id) {
        showToast('Error', 'You cannot delete your own account', 'error');
        return;
    }

    const users = getFromStorage('users', []);
    const user = users.find(u => u.id === userId);

    if (!user) {
        showToast('Error', 'User not found', 'error');
        return;
    }

    if (!confirm(`Are you sure you want to delete ${user.username}? This action cannot be undone.`)) {
        return;
    }

    const userIndex = users.findIndex(u => u.id === userId);
    users.splice(userIndex, 1);

    if (saveToStorage('users', users)) {
        showToast('Deleted', `${user.username} has been deleted`, 'info');
        
        // Also clean up related data
        if (user.userType === 'restaurant') {
            // Remove restaurant's products
            const products = getFromStorage('products', []);
            const updatedProducts = products.filter(p => p.restaurantId !== userId);
            saveToStorage('products', updatedProducts);
        }
        
        loadAdminDashboard(); // Refresh the dashboard
    } else {
        showToast('Error', 'Failed to delete user', 'error');
    }
}

// Load Recent Orders
function loadRecentOrders() {
    const orders = getOrders();
    const ordersTable = document.getElementById('ordersTable');
    
    // Show only recent 10 orders
    const recentOrders = orders.slice(0, 10);

    if (recentOrders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="6" class="no-data">No orders found</td></tr>';
        return;
    }

    const users = getFromStorage('users', []);

    ordersTable.innerHTML = recentOrders.map(order => {
        const customer = users.find(u => u.id === order.customerId);
        const customerName = customer ? customer.username : 'Unknown Customer';
        
        // Get restaurant name from the first item (assuming all items are from same restaurant per order)
        const firstItem = order.items[0];
        const restaurant = users.find(u => u.id === firstItem?.restaurantId);
        const restaurantName = restaurant ? restaurant.restaurantName : 'Unknown Restaurant';

        return `
            <tr>
                <td>${order.id.substring(0, 10)}...</td>
                <td>${customerName}</td>
                <td>${restaurantName}</td>
                <td>${formatPrice(order.total)}</td>
                <td>
                    <span class="status-badge ${order.status}">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </td>
                <td>${formatDate(order.createdAt)}</td>
            </tr>
        `;
    }).join('');
}

// Get Platform Statistics
function getPlatformStats() {
    const users = getFromStorage('users', []);
    const orders = getFromStorage('orders', []);
    const products = getFromStorage('products', []);

    const stats = {
        totalUsers: users.length,
        totalCustomers: users.filter(u => u.userType === 'customer').length,
        totalRestaurants: users.filter(u => u.userType === 'restaurant').length,
        approvedRestaurants: users.filter(u => u.userType === 'restaurant' && u.approved).length,
        pendingRestaurants: users.filter(u => u.userType === 'restaurant' && !u.approved).length,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
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

// Export Platform Data (for backup)
function exportPlatformData() {
    const data = {
        users: getFromStorage('users', []),
        products: getFromStorage('products', []),
        orders: getFromStorage('orders', []),
        exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `swathi-foods-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Bulk Actions
function bulkApproveRestaurants() {
    const users = getFromStorage('users', []);
    const pendingRestaurants = users.filter(u => u.userType === 'restaurant' && !u.approved);

    if (pendingRestaurants.length === 0) {
        showToast('Info', 'No pending restaurants to approve', 'info');
        return;
    }

    if (!confirm(`Are you sure you want to approve all ${pendingRestaurants.length} pending restaurants?`)) {
        return;
    }

    const currentTime = new Date().toISOString();
    const currentAdminId = getCurrentUser().id;

    pendingRestaurants.forEach(restaurant => {
        restaurant.approved = true;
        restaurant.approvedAt = currentTime;
        restaurant.approvedBy = currentAdminId;
    });

    if (saveToStorage('users', users)) {
        showToast('Success', `${pendingRestaurants.length} restaurants approved successfully!`, 'success');
        loadAdminDashboard();
    } else {
        showToast('Error', 'Failed to approve restaurants', 'error');
    }
}

// Search and Filter Functions
function searchUsers(searchTerm) {
    const users = getFromStorage('users', []);
    const filteredUsers = searchItems(users, searchTerm, ['username', 'email', 'restaurantName']);
    
    // Update the users table with filtered results
    const usersTable = document.getElementById('usersTable');
    // Implementation similar to loadAllUsers but with filtered data
}

function filterOrdersByStatus(status) {
    const orders = getOrders({ status: status });
    // Update orders table with filtered results
}

console.log('Admin panel functions loaded');
