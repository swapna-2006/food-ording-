
// SWATHI's FOODS - Complete E-commerce JavaScript

// Product Data
const products = [
    // Biryani
    { id: 1, name: "Hyderabadi Chicken Biryani", price: 250, category: "biryani", image: "🍛", description: "Aromatic basmati rice with tender chicken pieces" },
    { id: 2, name: "Mutton Biryani", price: 320, category: "biryani", image: "🍛", description: "Rich and flavorful mutton biryani with spices" },
    { id: 3, name: "Vegetable Biryani", price: 180, category: "biryani", image: "🍛", description: "Mixed vegetables with fragrant basmati rice" },
    { id: 4, name: "Egg Biryani", price: 150, category: "biryani", image: "🍛", description: "Boiled eggs cooked with spiced rice" },
    { id: 5, name: "Fish Biryani", price: 280, category: "biryani", image: "🍛", description: "Fresh fish pieces with aromatic rice" },

    // Tiffin Items
    { id: 6, name: "Plain Dosa", price: 60, category: "tiffin", image: "🥞", description: "Crispy South Indian crepe" },
    { id: 7, name: "Masala Dosa", price: 80, category: "tiffin", image: "🥞", description: "Dosa filled with spiced potato curry" },
    { id: 8, name: "Rava Dosa", price: 90, category: "tiffin", image: "🥞", description: "Crispy semolina dosa with onions" },
    { id: 9, name: "Idli (4 pieces)", price: 50, category: "tiffin", image: "⚪", description: "Steamed rice cakes with chutney" },
    { id: 10, name: "Medu Vada (2 pieces)", price: 40, category: "tiffin", image: "🍩", description: "Crispy fried lentil donuts" },
    { id: 11, name: "Upma", price: 70, category: "tiffin", image: "🍲", description: "Semolina cooked with vegetables" },
    { id: 12, name: "Pongal", price: 80, category: "tiffin", image: "🍲", description: "Rice and lentil comfort food" },

    // Rice Items
    { id: 13, name: "Sambar Rice", price: 120, category: "rice", image: "🍚", description: "Rice mixed with lentil curry" },
    { id: 14, name: "Curd Rice", price: 100, category: "rice", image: "🍚", description: "Rice mixed with yogurt and spices" },
    { id: 15, name: "Lemon Rice", price: 110, category: "rice", image: "🍚", description: "Tangy rice with lemon and spices" },
    { id: 16, name: "Tamarind Rice", price: 115, category: "rice", image: "🍚", description: "Tangy rice with tamarind sauce" },
    { id: 17, name: "Coconut Rice", price: 125, category: "rice", image: "🍚", description: "Rice cooked with fresh coconut" },
    { id: 18, name: "Tomato Rice", price: 120, category: "rice", image: "🍚", description: "Flavorful rice with tomatoes" },

    // Curries
    { id: 19, name: "Dal Tadka", price: 90, category: "curry", image: "🍲", description: "Yellow lentils with spices" },
    { id: 20, name: "Chicken Curry", price: 180, category: "curry", image: "🍛", description: "Spicy chicken curry with gravy" },
    { id: 21, name: "Mutton Curry", price: 220, category: "curry", image: "🍛", description: "Tender mutton in rich gravy" },
    { id: 22, name: "Fish Curry", price: 160, category: "curry", image: "🐟", description: "Fresh fish in spicy curry" },
    { id: 23, name: "Egg Curry", price: 100, category: "curry", image: "🥚", description: "Boiled eggs in spicy gravy" },
    { id: 24, name: "Palak Paneer", price: 140, category: "curry", image: "🥬", description: "Cottage cheese in spinach gravy" },
    { id: 25, name: "Paneer Butter Masala", price: 160, category: "curry", image: "🧈", description: "Cottage cheese in creamy tomato gravy" },

    // Snacks
    { id: 26, name: "Samosa (2 pieces)", price: 30, category: "snacks", image: "🥟", description: "Crispy fried pastry with filling" },
    { id: 27, name: "Pakoda (6 pieces)", price: 50, category: "snacks", image: "🧅", description: "Mixed vegetable fritters" },
    { id: 28, name: "Mirchi Bajji (4 pieces)", price: 40, category: "snacks", image: "🌶️", description: "Stuffed chili fritters" },
    { id: 29, name: "Bonda (4 pieces)", price: 35, category: "snacks", image: "⚪", description: "Spiced potato balls" },
    { id: 30, name: "Cutlet (2 pieces)", price: 45, category: "snacks", image: "🥪", description: "Vegetable cutlets" },
    { id: 31, name: "Sandwich", price: 60, category: "snacks", image: "🥪", description: "Grilled sandwich with vegetables" },

    // Beverages
    { id: 32, name: "Filter Coffee", price: 25, category: "beverages", image: "☕", description: "Traditional South Indian coffee" },
    { id: 33, name: "Masala Tea", price: 20, category: "beverages", image: "🫖", description: "Spiced tea with milk" },
    { id: 34, name: "Lassi", price: 40, category: "beverages", image: "🥛", description: "Yogurt-based drink" },
    { id: 35, name: "Buttermilk", price: 30, category: "beverages", image: "🥛", description: "Spiced yogurt drink" },
    { id: 36, name: "Fresh Lime Soda", price: 35, category: "beverages", image: "🍋", description: "Refreshing lime drink" },
    { id: 37, name: "Mango Juice", price: 50, category: "beverages", image: "🥭", description: "Fresh mango juice" },
    { id: 38, name: "Tender Coconut", price: 40, category: "beverages", image: "🥥", description: "Fresh coconut water" }
];

// Cart Management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const savedCart = localStorage.getItem('swathi_foods_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('swathi_foods_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showToast(`${product.name} added to cart!`);
        return true;
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
        }
    }

    removeFromCart(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            this.showToast(`${item.name} removed from cart!`, 'warning');
        }
    }

    getCart() {
        return this.cart;
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        const totalItems = this.getTotalItems();
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        const toastContainer = document.getElementById('toastContainer');
        if (toastContainer) {
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    }
}

// Product Display Manager
class ProductManager {
    constructor() {
        this.products = products;
        this.filteredProducts = products;
        this.currentCategory = 'all';
        this.productQuantities = {};
        
        // Initialize quantities for all products
        this.products.forEach(product => {
            this.productQuantities[product.id] = 1;
        });
    }

    displayProducts(productsToShow = this.filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                    <h3>No products found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card fade-in">
                <div class="product-image">${product.image}</div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">₹${product.price}</div>
                <div class="product-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="productManager.updateQuantity(${product.id}, -1)">-</button>
                        <span class="quantity-display" id="qty-${product.id}">${this.productQuantities[product.id]}</span>
                        <button class="qty-btn" onclick="productManager.updateQuantity(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="productManager.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateQuantity(productId, change) {
        const currentQty = this.productQuantities[productId] || 1;
        const newQty = Math.max(1, currentQty + change);
        this.productQuantities[productId] = newQty;
        
        const qtyDisplay = document.getElementById(`qty-${productId}`);
        if (qtyDisplay) {
            qtyDisplay.textContent = newQty;
        }
    }

    addToCart(productId) {
        const quantity = this.productQuantities[productId] || 1;
        cartManager.addToCart(productId, quantity);
        
        // Reset quantity to 1 after adding to cart
        this.productQuantities[productId] = 1;
        const qtyDisplay = document.getElementById(`qty-${productId}`);
        if (qtyDisplay) {
            qtyDisplay.textContent = 1;
        }
    }

    filterByCategory(category) {
        this.currentCategory = category;
        if (category === 'all') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        this.displayProducts();
        this.updateCategoryButtons();
    }

    searchProducts(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        if (term === '') {
            this.filteredProducts = this.currentCategory === 'all' 
                ? this.products 
                : this.products.filter(product => product.category === this.currentCategory);
        } else {
            const baseProducts = this.currentCategory === 'all' 
                ? this.products 
                : this.products.filter(product => product.category === this.currentCategory);
            
            this.filteredProducts = baseProducts.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
            );
        }
        this.displayProducts();
    }

    updateCategoryButtons() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === this.currentCategory) {
                btn.classList.add('active');
            }
        });
    }
}

// Cart Display Manager
class CartDisplayManager {
    constructor() {
        this.cartManager = cartManager;
    }

    displayCart() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.getElementById('cartContent');

        if (!cartItems) return;

        const cart = this.cartManager.getCart();

        if (cart.length === 0) {
            if (cartContent) cartContent.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        if (cartContent) cartContent.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';

        // Display cart items
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-content">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="cartDisplayManager.updateCartQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="qty-btn" onclick="cartDisplayManager.updateCartQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="cartDisplayManager.removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update summary
        this.updateCartSummary();
    }

    updateCartQuantity(productId, change) {
        const cart = this.cartManager.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + change);
            this.cartManager.updateQuantity(productId, newQuantity);
            this.displayCart();
        }
    }

    removeFromCart(productId) {
        this.cartManager.removeFromCart(productId);
        this.displayCart();
    }

    updateCartSummary() {
        const totalItemsElement = document.getElementById('totalItems');
        const totalPriceElement = document.getElementById('totalPrice');

        if (totalItemsElement) {
            totalItemsElement.textContent = this.cartManager.getTotalItems();
        }
        if (totalPriceElement) {
            totalPriceElement.textContent = this.cartManager.getTotalPrice();
        }
    }

    checkout() {
        const cart = this.cartManager.getCart();
        if (cart.length === 0) {
            this.cartManager.showToast('Your cart is empty!', 'warning');
            return;
        }

        // Simulate checkout process
        const totalAmount = this.cartManager.getTotalPrice();
        const totalItems = this.cartManager.getTotalItems();
        
        if (confirm(`Proceed with checkout?\n\nTotal Items: ${totalItems}\nTotal Amount: ₹${totalAmount}`)) {
            this.cartManager.showToast('Order placed successfully! Thank you for choosing SWATHI\'s FOODS!');
            this.cartManager.clearCart();
            this.displayCart();
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

// Initialize managers
const cartManager = new CartManager();
const productManager = new ProductManager();
const cartDisplayManager = new CartDisplayManager();

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Products page
    if (currentPage === 'products.html') {
        productManager.displayProducts();

        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                productManager.filterByCategory(category);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                productManager.searchProducts(this.value);
            });
        }
    }

    // Cart page
    if (currentPage === 'cart.html') {
        cartDisplayManager.displayCart();

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                cartDisplayManager.checkout();
            });
        }
    }

    // Update cart count on all pages
    cartManager.updateCartCount();
});

// Make managers globally available for onclick handlers
window.productManager = productManager;
window.cartDisplayManager = cartDisplayManager;
window.cartManager = cartManager;

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

// Auto-update cart count every 5 seconds (in case of multiple tabs)
setInterval(() => {
    cartManager.updateCartCount();
}, 5000);

console.log('SWATHI\'s FOODS - Website loaded successfully!');
