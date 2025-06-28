
// LocalStorage Management
class Storage {
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
}

// Initialize default data if not exists
function initializeData() {
    if (!Storage.get('deliveryBoys')) {
        Storage.set('deliveryBoys', deliveryBoysData);
    }
    if (!Storage.get('locations')) {
        Storage.set('locations', locationData);
    }
    if (!Storage.get('cart')) {
        Storage.set('cart', []);
    }
    if (!Storage.get('orders')) {
        Storage.set('orders', []);
    }
}

// Cart Management
class CartManager {
    static getCart() {
        return Storage.get('cart', []);
    }

    static addToCart(item, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...item, quantity });
        }

        Storage.set('cart', cart);
        updateCartCount();
        return true;
    }

    static updateQuantity(itemId, quantity) {
        const cart = this.getCart();
        const item = cart.find(cartItem => cartItem.id === itemId);

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                item.quantity = quantity;
                Storage.set('cart', cart);
            }
        }
        updateCartCount();
    }

    static removeFromCart(itemId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== itemId);
        Storage.set('cart', updatedCart);
        updateCartCount();
    }

    static clearCart() {
        Storage.set('cart', []);
        updateCartCount();
    }

    static getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static getItemCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
}

// Order Management
class OrderManager {
    static createOrder(customerData) {
        const cart = CartManager.getCart();
        if (cart.length === 0) {
            return { success: false, message: 'Cart is empty' };
        }

        const order = {
            id: 'ORD-' + Date.now(),
            customerId: customerData.id || Date.now(),
            items: [...cart],
            total: CartManager.getTotal(),
            deliveryFee: this.getDeliveryFee(),
            tax: CartManager.getTotal() * 0.05, // 5% tax
            grandTotal: CartManager.getTotal() + this.getDeliveryFee() + (CartManager.getTotal() * 0.05),
            status: 'placed',
            timestamp: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
            customer: customerData,
            deliveryBoy: this.assignDeliveryBoy(customerData.location)
        };

        const orders = Storage.get('orders', []);
        orders.push(order);
        Storage.set('orders', orders);
        Storage.set('currentOrder', order);

        CartManager.clearCart();
        return { success: true, order: order };
    }

    static getOrders(customerId = null) {
        const orders = Storage.get('orders', []);
        if (customerId) {
            return orders.filter(order => order.customerId === customerId);
        }
        return orders;
    }

    static getDeliveryFee() {
        const selectedLocation = Storage.get('selectedLocation');
        if (selectedLocation && locationData[selectedLocation]) {
            return locationData[selectedLocation].deliveryFee;
        }
        return 25; // default delivery fee
    }

    static assignDeliveryBoy(location) {
        const deliveryBoys = Storage.get('deliveryBoys', deliveryBoysData);
        const availableBoys = deliveryBoys.filter(boy => boy.area === location);
        
        if (availableBoys.length > 0) {
            return availableBoys[Math.floor(Math.random() * availableBoys.length)];
        }
        
        // Return any delivery boy if none found for specific area
        return deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];
    }

    static updateOrderStatus(orderId, status) {
        const orders = Storage.get('orders', []);
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            Storage.set('orders', orders);
            return true;
        }
        return false;
    }
}

// Customer Management
class CustomerManager {
    static saveCustomer(customerData) {
        const customer = {
            id: Date.now(),
            ...customerData,
            registeredAt: new Date().toISOString()
        };
        
        Storage.set('customer', customer);
        return customer;
    }

    static getCustomer() {
        return Storage.get('customer');
    }

    static isRegistered() {
        return !!this.getCustomer();
    }
}
