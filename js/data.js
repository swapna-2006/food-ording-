
// Menu Data
const menuData = [
    // Tiffins & Breakfast
    {
        id: 1,
        name: "Plain Idly (4 pieces)",
        category: "tiffins",
        price: 40,
        quantity: "4 pieces with sambar & chutney",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "Ghee Idly (4 pieces)",
        category: "tiffins",
        price: 60,
        quantity: "4 pieces with ghee, sambar & chutney",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "Masala Dosa",
        category: "tiffins",
        price: 80,
        quantity: "1 large dosa with potato masala",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "Plain Dosa",
        category: "tiffins",
        price: 60,
        quantity: "1 large crispy dosa",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "Onion Uttapam",
        category: "tiffins",
        price: 70,
        quantity: "2 pieces with onions",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "Pesarattu",
        category: "tiffins",
        price: 65,
        quantity: "2 pieces green gram dosa",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "Medu Vada (4 pieces)",
        category: "tiffins",
        price: 50,
        quantity: "4 crispy vadas with sambar",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "Pongal",
        category: "tiffins",
        price: 55,
        quantity: "Sweet & spicy rice dish",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
    },

    // Meals & Lunch
    {
        id: 9,
        name: "Andhra Veg Meals",
        category: "meals",
        price: 120,
        quantity: "Rice, dal, sambar, rasam, vegetables",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
    },
    {
        id: 10,
        name: "Curd Rice",
        category: "meals",
        price: 60,
        quantity: "Rice with curd & pickle",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
    },
    {
        id: 11,
        name: "Lemon Rice",
        category: "meals",
        price: 65,
        quantity: "Tangy rice with lemon & spices",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
    },
    {
        id: 12,
        name: "Tomato Rice",
        category: "meals",
        price: 70,
        quantity: "Spicy tomato flavored rice",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
    },
    {
        id: 13,
        name: "Gongura Rice",
        category: "meals",
        price: 85,
        quantity: "Sorrel leaves rice - Telugu special",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
    },

    // Biryani & Rice Specials
    {
        id: 14,
        name: "Veg Biryani",
        category: "biryani",
        price: 150,
        quantity: "Fragrant rice with mixed vegetables",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51d?w=300&h=200&fit=crop"
    },
    {
        id: 15,
        name: "Chicken Biryani",
        category: "biryani",
        price: 200,
        quantity: "Aromatic rice with tender chicken",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51d?w=300&h=200&fit=crop"
    },
    {
        id: 16,
        name: "Mutton Biryani",
        category: "biryani",
        price: 250,
        quantity: "Rich rice with succulent mutton",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51d?w=300&h=200&fit=crop"
    },
    {
        id: 17,
        name: "Egg Biryani",
        category: "biryani",
        price: 130,
        quantity: "Spiced rice with boiled eggs",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51d?w=300&h=200&fit=crop"
    },
    {
        id: 18,
        name: "Hyderabadi Chicken Biryani",
        category: "biryani",
        price: 220,
        quantity: "Authentic Hyderabadi style",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51d?w=300&h=200&fit=crop"
    },

    // Snacks
    {
        id: 19,
        name: "Mirchi Bajji (6 pieces)",
        category: "snacks",
        price: 45,
        quantity: "6 spicy chili fritters",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
    },
    {
        id: 20,
        name: "Onion Pakoda",
        category: "snacks",
        price: 40,
        quantity: "Crispy onion fritters",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
    },
    {
        id: 21,
        name: "Aloo Bonda (4 pieces)",
        category: "snacks",
        price: 35,
        quantity: "4 potato dumplings",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
    },
    {
        id: 22,
        name: "Punugulu (8 pieces)",
        category: "snacks",
        price: 50,
        quantity: "8 mini idly balls - Andhra special",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
    },
    {
        id: 23,
        name: "Samosa (4 pieces)",
        category: "snacks",
        price: 40,
        quantity: "4 crispy triangular pastries",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
    },

    // Beverages
    {
        id: 24,
        name: "Filter Coffee",
        category: "beverages",
        price: 25,
        quantity: "Traditional South Indian coffee",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop"
    },
    {
        id: 25,
        name: "Masala Tea",
        category: "beverages",
        price: 20,
        quantity: "Spiced Indian tea",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop"
    },
    {
        id: 26,
        name: "Buttermilk",
        category: "beverages",
        price: 30,
        quantity: "Cool yogurt drink with spices",
        image: "https://images.unsplash.com/photo-1553787205-6d8778c6f1b2?w=300&h=200&fit=crop"
    },
    {
        id: 27,
        name: "Fresh Lime Soda",
        category: "beverages",
        price: 35,
        quantity: "Refreshing lime drink",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=200&fit=crop"
    },
    {
        id: 28,
        name: "Mango Shake",
        category: "beverages",
        price: 60,
        quantity: "Thick mango milkshake",
        image: "https://images.unsplash.com/photo-1553787205-6d8778c6f1b2?w=300&h=200&fit=crop"
    },

    // Desserts
    {
        id: 29,
        name: "Gulab Jamun (4 pieces)",
        category: "desserts",
        price: 50,
        quantity: "4 soft milk dumplings in syrup",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    },
    {
        id: 30,
        name: "Mysore Pak (4 pieces)",
        category: "desserts",
        price: 60,
        quantity: "4 pieces traditional sweet",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    },
    {
        id: 31,
        name: "Jalebi (6 pieces)",
        category: "desserts",
        price: 45,
        quantity: "6 spiral shaped sweet treats",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    },
    {
        id: 32,
        name: "Double Ka Meetha",
        category: "desserts",
        price: 70,
        quantity: "Hyderabadi bread pudding",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    },
    {
        id: 33,
        name: "Kulfi",
        category: "desserts",
        price: 40,
        quantity: "Traditional Indian ice cream",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
    }
];

// Location Data
const locationData = {
    hyderabad: {
        name: "Hyderabad",
        areas: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Madhapur", "Kukatpally", "Miyapur"],
        deliveryFee: 25
    },
    vijayawada: {
        name: "Vijayawada",
        areas: ["Governorpet", "Labbipet", "Benz Circle", "Patamata", "Auto Nagar"],
        deliveryFee: 20
    },
    visakhapatnam: {
        name: "Visakhapatnam",
        areas: ["MVP Colony", "Dwaraka Nagar", "Siripuram", "Beach Road", "Gajuwaka"],
        deliveryFee: 30
    },
    guntur: {
        name: "Guntur",
        areas: ["Lakshmipuram", "Brundavan Gardens", "Arundelpet", "Kothapet"],
        deliveryFee: 18
    },
    warangal: {
        name: "Warangal",
        areas: ["Hanamkonda", "Kazipet", "Subedari", "Jammikunta"],
        deliveryFee: 15
    },
    tirupati: {
        name: "Tirupati",
        areas: ["Tirumala", "Renigunta", "Chandragiri", "Alipiri"],
        deliveryFee: 22
    },
    nellore: {
        name: "Nellore",
        areas: ["Stonehousepet", "South Mopur", "Vedayapalem", "Dargamitta"],
        deliveryFee: 20
    }
};

// Delivery Boys Data
const deliveryBoysData = [
    {
        id: 1,
        name: "Ravi Kumar",
        phone: "9876543210",
        vehicle: "KA01AB1234",
        area: "hyderabad"
    },
    {
        id: 2,
        name: "Suresh Babu",
        phone: "9876543211",
        vehicle: "AP01CD5678",
        area: "vijayawada"
    },
    {
        id: 3,
        name: "Mahesh Reddy",
        phone: "9876543212",
        vehicle: "AP02EF9012",
        area: "visakhapatnam"
    },
    {
        id: 4,
        name: "Krishna Murthy",
        phone: "9876543213",
        vehicle: "AP03GH3456",
        area: "guntur"
    },
    {
        id: 5,
        name: "Venkat Rao",
        phone: "9876543214",
        vehicle: "TS01IJ7890",
        area: "warangal"
    },
    {
        id: 6,
        name: "Nagarjuna",
        phone: "9876543215",
        vehicle: "AP04KL1234",
        area: "tirupati"
    },
    {
        id: 7,
        name: "Balaji Naidu",
        phone: "9876543216",
        vehicle: "AP05MN5678",
        area: "nellore"
    }
];
