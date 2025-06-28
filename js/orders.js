
// Order Management Functions
function updateOrderStatus(orderId, newStatus) {
    if (OrderManager.updateOrderStatus(orderId, newStatus)) {
        showToast('Status Updated', `Order status updated to ${newStatus.replace('_', ' ')}`);
        if (currentPage === 'orders') {
            loadOrdersPage();
        }
    }
}

function trackOrder(orderId) {
    const orders = OrderManager.getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        const estimatedTime = new Date(order.estimatedDelivery);
        const now = new Date();
        const timeLeft = Math.max(0, Math.ceil((estimatedTime - now) / (1000 * 60)));
        
        let statusMessage = '';
        switch(order.status) {
            case 'placed':
                statusMessage = `Your order is being prepared. Estimated delivery in ${timeLeft} minutes.`;
                break;
            case 'preparing':
                statusMessage = `Your order is being cooked with love! Estimated delivery in ${timeLeft} minutes.`;
                break;
            case 'out_for_delivery':
                statusMessage = `Your order is on the way! ${order.deliveryBoy ? order.deliveryBoy.name : 'Our delivery partner'} will reach you soon.`;
                break;
            case 'delivered':
                statusMessage = 'Your order has been delivered! Enjoy your meal!';
                break;
            default:
                statusMessage = 'Order status unknown.';
        }
        
        showToast('Order Status', statusMessage);
    }
}

// Simulate order status progression for demo purposes
function simulateOrderProgress() {
    const orders = Storage.get('orders', []);
    const activeOrders = orders.filter(o => o.status !== 'delivered');
    
    activeOrders.forEach(order => {
        const orderTime = new Date(order.timestamp);
        const now = new Date();
        const minutesPassed = (now - orderTime) / (1000 * 60);
        
        let newStatus = order.status;
        
        if (minutesPassed > 2 && order.status === 'placed') {
            newStatus = 'preparing';
        } else if (minutesPassed > 10 && order.status === 'preparing') {
            newStatus = 'out_for_delivery';
        } else if (minutesPassed > 25 && order.status === 'out_for_delivery') {
            newStatus = 'delivered';
        }
        
        if (newStatus !== order.status) {
            OrderManager.updateOrderStatus(order.id, newStatus);
            console.log(`Order ${order.id} status updated to ${newStatus}`);
        }
    });
}

// Auto-update order statuses every minute for demonstration
setInterval(simulateOrderProgress, 60000);

// Initialize order simulation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Run initial simulation check
    setTimeout(simulateOrderProgress, 5000);
});
