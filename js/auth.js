
// Authentication System for SWATHI's FOODS

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        username: formData.get('username').trim(),
        email: formData.get('email').trim().toLowerCase(),
        password: formData.get('password'),
        userType: formData.get('userType')
    };

    // Validate required fields
    if (!userData.username || !userData.email || !userData.password || !userData.userType) {
        showToast('Error', 'Please fill in all required fields', 'error');
        return;
    }

    // Validate email format
    if (!isValidEmail(userData.email)) {
        showToast('Error', 'Please enter a valid email address', 'error');
        return;
    }

    // Check if user already exists
    const users = getFromStorage('users', []);
    if (users.some(user => user.email === userData.email)) {
        showToast('Error', 'An account with this email already exists', 'error');
        return;
    }

    // Handle restaurant-specific data
    if (userData.userType === 'restaurant') {
        const restaurantData = {
            restaurantName: formData.get('restaurantName')?.trim(),
            restaurantAddress: formData.get('restaurantAddress')?.trim(),
            restaurantPhone: formData.get('restaurantPhone')?.trim(),
            restaurantImage: formData.get('restaurantImage')?.trim(),
            cuisineType: formData.get('cuisineType')
        };

        // Validate restaurant fields
        if (!restaurantData.restaurantName || !restaurantData.restaurantAddress || 
            !restaurantData.restaurantPhone || !restaurantData.cuisineType) {
            showToast('Error', 'Please fill in all restaurant details', 'error');
            return;
        }

        // Validate phone number
        if (!isValidPhone(restaurantData.restaurantPhone)) {
            showToast('Error', 'Please enter a valid phone number', 'error');
            return;
        }

        // Validate image URL if provided
        if (restaurantData.restaurantImage && !isValidUrl(restaurantData.restaurantImage)) {
            showToast('Error', 'Please enter a valid image URL', 'error');
            return;
        }

        // Add restaurant data to user object
        Object.assign(userData, restaurantData);
        userData.approved = false; // Restaurant needs admin approval
    } else {
        userData.approved = true; // Customers are auto-approved
    }

    // Create user account
    const newUser = {
        id: generateId(),
        ...userData,
        createdAt: new Date().toISOString(),
        lastLogin: null
    };

    // Save user
    users.push(newUser);
    if (saveToStorage('users', users)) {
        let message = 'Account created successfully!';
        if (userData.userType === 'restaurant') {
            message += ' Please wait for admin approval before you can start adding items.';
        }
        
        showToast('Success', message, 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showToast('Error', 'Failed to create account. Please try again.', 'error');
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email').trim().toLowerCase();
    const password = formData.get('password');

    if (!email || !password) {
        showToast('Error', 'Please enter both email and password', 'error');
        return;
    }

    // Find user
    const users = getFromStorage('users', []);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showToast('Error', 'Invalid email or password', 'error');
        return;
    }

    // Check if restaurant is approved
    if (user.userType === 'restaurant' && !user.approved) {
        showToast('Pending Approval', 
            'Your restaurant account is waiting for admin approval. Please check back later.', 
            'warning'
        );
        return;
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    updateUser(user);

    // Set current user
    setCurrentUser(user);

    showToast('Welcome!', `Welcome back, ${user.username}!`, 'success');

    // Redirect based on user type
    setTimeout(() => {
        switch (user.userType) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'customer':
            case 'restaurant':
                window.location.href = 'dashboard.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }, 1500);
}

// Check Authentication Status
function checkAuth(requiredRole = null) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showToast('Authentication Required', 'Please login to continue', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }

    if (requiredRole && currentUser.userType !== requiredRole) {
        showToast('Access Denied', `This page requires ${requiredRole} access`, 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        return false;
    }

    // Check if restaurant is approved
    if (currentUser.userType === 'restaurant' && !currentUser.approved) {
        showToast('Pending Approval', 
            'Your restaurant account is still pending approval', 
            'warning'
        );
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return false;
    }

    return true;
}

// Password Change (future feature)
function changePassword(currentPassword, newPassword) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, message: 'User not logged in' };
    }

    if (currentUser.password !== currentPassword) {
        return { success: false, message: 'Current password is incorrect' };
    }

    if (newPassword.length < 6) {
        return { success: false, message: 'New password must be at least 6 characters long' };
    }

    currentUser.password = newPassword;
    currentUser.passwordChangedAt = new Date().toISOString();
    
    if (updateUser(currentUser)) {
        return { success: true, message: 'Password changed successfully' };
    } else {
        return { success: false, message: 'Failed to update password' };
    }
}

// Get User Profile
function getUserProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    // Don't return sensitive information
    const { password, ...profile } = currentUser;
    return profile;
}

// Update User Profile
function updateProfile(profileData) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, message: 'User not logged in' };
    }

    // Validate email if being changed
    if (profileData.email && profileData.email !== currentUser.email) {
        if (!isValidEmail(profileData.email)) {
            return { success: false, message: 'Invalid email format' };
        }

        // Check if email is already taken
        const users = getFromStorage('users', []);
        if (users.some(u => u.email === profileData.email && u.id !== currentUser.id)) {
            return { success: false, message: 'Email already exists' };
        }
    }

    // Update user data
    const updatedUser = {
        ...currentUser,
        ...profileData,
        updatedAt: new Date().toISOString()
    };

    if (updateUser(updatedUser)) {
        return { success: true, message: 'Profile updated successfully' };
    } else {
        return { success: false, message: 'Failed to update profile' };
    }
}

// Session Management
function refreshSession() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Update last activity
        currentUser.lastActivity = new Date().toISOString();
        setCurrentUser(currentUser);
        return true;
    }
    return false;
}

// Auto-refresh session every 5 minutes
setInterval(refreshSession, 5 * 60 * 1000);

// Handle browser close/refresh
window.addEventListener('beforeunload', function() {
    refreshSession();
});

console.log('Authentication system loaded');
