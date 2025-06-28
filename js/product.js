// Product management and display functionality for SWATHI'S FOODS

// Massive food items collection with images
const sampleProducts = [
    // DOSA VARIETIES
    {
        id: 'prod_1',
        name: 'Masala Dosa',
        description: 'Crispy golden dosa with spiced potato filling, served with sambar and chutneys',
        image: 'https://images.unsplash.com/photo-1587736908446-23ebe0b50bb3?w=400',
        price: 150,
        discount: 25,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.5
    },
    {
        id: 'prod_2',
        name: 'Plain Dosa',
        description: 'Traditional crispy dosa served with sambar and coconut chutney',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
        price: 120,
        discount: 20,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_3',
        name: 'Cheese Dosa',
        description: 'Crispy dosa loaded with melted cheese and spices',
        image: 'https://images.unsplash.com/photo-1587736908446-23ebe0b50bb3?w=400',
        price: 170,
        discount: 30,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_4',
        name: 'Rava Dosa',
        description: 'Crispy semolina dosa with onions and green chilies',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
        price: 140,
        discount: 15,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_5',
        name: 'Onion Dosa',
        description: 'Dosa topped with caramelized onions and spices',
        image: 'https://images.unsplash.com/photo-1587736908446-23ebe0b50bb3?w=400',
        price: 135,
        discount: 10,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_6',
        name: 'Paper Dosa',
        description: 'Extra large, paper-thin crispy dosa',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
        price: 160,
        discount: 10,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.6
    },

    // BIRYANI VARIETIES
    {
        id: 'prod_7',
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice with tender chicken pieces, cooked with traditional spices',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 220,
        discount: 20,
        category: 'biryani',
        type: 'non-veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.7
    },
    {
        id: 'prod_8',
        name: 'Veg Biryani',
        description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 180,
        discount: 15,
        category: 'biryani',
        type: 'veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_9',
        name: 'Mutton Biryani',
        description: 'Royal mutton biryani with tender meat and aromatic spices',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 280,
        discount: 25,
        category: 'biryani',
        type: 'non-veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.8
    },
    {
        id: 'prod_10',
        name: 'Paneer Biryani',
        description: 'Delicious biryani with cottage cheese and fragrant basmati rice',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 200,
        discount: 20,
        category: 'biryani',
        type: 'veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.5
    },
    {
        id: 'prod_11',
        name: 'Hyderabadi Dum Biryani',
        description: 'Authentic Hyderabadi style biryani cooked in traditional dum method',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 240,
        discount: 30,
        category: 'biryani',
        type: 'non-veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.9
    },
    {
        id: 'prod_12',
        name: 'Egg Biryani',
        description: 'Flavorful biryani with boiled eggs and aromatic rice',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        price: 190,
        discount: 10,
        category: 'biryani',
        type: 'non-veg',
        restaurantId: 'rest_2',
        restaurantName: 'Biryani Palace',
        availability: 'available',
        rating: 4.3
    },

    // BREAD VARIETIES
    {
        id: 'prod_13',
        name: 'Butter Naan',
        description: 'Soft and fluffy naan bread brushed with butter',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        price: 40,
        discount: 0,
        category: 'bread',
        type: 'veg',
        restaurantId: 'rest_3',
        restaurantName: 'Tandoor House',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_14',
        name: 'Garlic Naan',
        description: 'Naan bread topped with fresh garlic and herbs',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        price: 50,
        discount: 10,
        category: 'bread',
        type: 'veg',
        restaurantId: 'rest_3',
        restaurantName: 'Tandoor House',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_15',
        name: 'Tandoori Roti',
        description: 'Traditional whole wheat bread cooked in tandoor',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        price: 30,
        discount: 0,
        category: 'bread',
        type: 'veg',
        restaurantId: 'rest_3',
        restaurantName: 'Tandoor House',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_16',
        name: 'Kulcha',
        description: 'Leavened bread stuffed with onions or potatoes',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        price: 45,
        discount: 5,
        category: 'bread',
        type: 'veg',
        restaurantId: 'rest_3',
        restaurantName: 'Tandoor House',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_17',
        name: 'Lachha Paratha',
        description: 'Multi-layered flaky bread cooked on tawa',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        price: 50,
        discount: 10,
        category: 'bread',
        type: 'veg',
        restaurantId: 'rest_3',
        restaurantName: 'Tandoor House',
        availability: 'available',
        rating: 4.5
    },

    // CURRY VARIETIES
    {
        id: 'prod_18',
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese in rich tomato and butter gravy',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 220,
        discount: 15,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.6
    },
    {
        id: 'prod_19',
        name: 'Chicken Curry',
        description: 'Traditional chicken curry with aromatic spices',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 240,
        discount: 20,
        category: 'curry',
        type: 'non-veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.7
    },
    {
        id: 'prod_20',
        name: 'Mutton Rogan Josh',
        description: 'Aromatic mutton curry from Kashmir with rich spices',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 280,
        discount: 25,
        category: 'curry',
        type: 'non-veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.8
    },
    {
        id: 'prod_21',
        name: 'Dal Makhani',
        description: 'Creamy black lentils cooked with butter and cream',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 160,
        discount: 10,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_22',
        name: 'Palak Paneer',
        description: 'Cottage cheese cooked in spinach gravy',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 200,
        discount: 20,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.5
    },
    {
        id: 'prod_23',
        name: 'Chana Masala',
        description: 'Spicy chickpea curry with aromatic spices',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 150,
        discount: 5,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.3
    },

    // RICE & NOODLES
    {
        id: 'prod_24',
        name: 'Veg Fried Rice',
        description: 'Wok-tossed rice with mixed vegetables and soy sauce',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
        price: 140,
        discount: 15,
        category: 'rice',
        type: 'veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_25',
        name: 'Chicken Fried Rice',
        description: 'Fried rice with chicken pieces and vegetables',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
        price: 170,
        discount: 10,
        category: 'rice',
        type: 'non-veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_26',
        name: 'Schezwan Fried Rice',
        description: 'Spicy fried rice with schezwan sauce',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
        price: 160,
        discount: 20,
        category: 'rice',
        type: 'veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_27',
        name: 'Veg Hakka Noodles',
        description: 'Stir-fried noodles with vegetables and sauces',
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
        price: 130,
        discount: 10,
        category: 'noodles',
        type: 'veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_28',
        name: 'Chicken Manchurian',
        description: 'Deep-fried chicken balls in tangy manchurian sauce',
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
        price: 180,
        discount: 20,
        category: 'chinese',
        type: 'non-veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.5
    },
    {
        id: 'prod_29',
        name: 'Paneer Manchurian',
        description: 'Cottage cheese in spicy manchurian gravy',
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
        price: 160,
        discount: 15,
        category: 'chinese',
        type: 'veg',
        restaurantId: 'rest_5',
        restaurantName: 'Chinese Corner',
        availability: 'available',
        rating: 4.3
    },

    // BEVERAGES
    {
        id: 'prod_30',
        name: 'Cold Coffee',
        description: 'Chilled coffee with milk and sugar',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
        price: 90,
        discount: 20,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_31',
        name: 'Oreo Milkshake',
        description: 'Rich milkshake blended with Oreo cookies',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400',
        price: 110,
        discount: 15,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_32',
        name: 'Chocolate Shake',
        description: 'Creamy chocolate milkshake with whipped cream',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400',
        price: 120,
        discount: 10,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_33',
        name: 'Lemon Soda',
        description: 'Refreshing lemon soda with mint',
        image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400',
        price: 60,
        discount: 10,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.0
    },
    {
        id: 'prod_34',
        name: 'Sweet Lassi',
        description: 'Traditional yogurt drink with sugar and cardamom',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400',
        price: 80,
        discount: 10,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_35',
        name: 'Masala Chai',
        description: 'Traditional Indian tea with aromatic spices',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
        price: 40,
        discount: 0,
        category: 'beverages',
        type: 'beverage',
        restaurantId: 'rest_6',
        restaurantName: 'Cafe Delight',
        availability: 'available',
        rating: 4.2
    },

    // DESSERTS
    {
        id: 'prod_36',
        name: 'Gulab Jamun (2 pcs)',
        description: 'Soft milk solids dumplings soaked in rose-flavored sugar syrup',
        image: 'https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c?w=400',
        price: 60,
        discount: 0,
        category: 'desserts',
        type: 'veg',
        restaurantId: 'rest_7',
        restaurantName: 'Sweet Treats',
        availability: 'available',
        rating: 4.5
    },
    {
        id: 'prod_37',
        name: 'Rasgulla (2 pcs)',
        description: 'Spongy cottage cheese balls in sugar syrup',
        image: 'https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c?w=400',
        price: 70,
        discount: 10,
        category: 'desserts',
        type: 'veg',
        restaurantId: 'rest_7',
        restaurantName: 'Sweet Treats',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_38',
        name: 'Jalebi (100g)',
        description: 'Crispy spiral-shaped sweet soaked in sugar syrup',
        image: 'https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c?w=400',
        price: 50,
        discount: 5,
        category: 'desserts',
        type: 'veg',
        restaurantId: 'rest_7',
        restaurantName: 'Sweet Treats',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_39',
        name: 'Mysore Pak',
        description: 'Traditional ghee-based sweet from Karnataka',
        image: 'https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c?w=400',
        price: 80,
        discount: 10,
        category: 'desserts',
        type: 'veg',
        restaurantId: 'rest_7',
        restaurantName: 'Sweet Treats',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_40',
        name: 'Kaju Katli (100g)',
        description: 'Diamond-shaped cashew fudge with silver foil',
        image: 'https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c?w=400',
        price: 120,
        discount: 15,
        category: 'desserts',
        type: 'veg',
        restaurantId: 'rest_7',
        restaurantName: 'Sweet Treats',
        availability: 'available',
        rating: 4.6
    },

    // SNACKS & FAST FOOD
    {
        id: 'prod_41',
        name: 'Veg Burger',
        description: 'Grilled vegetable patty with lettuce and sauces',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        price: 90,
        discount: 10,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_42',
        name: 'Chicken Burger',
        description: 'Juicy chicken patty with fresh vegetables',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
        price: 110,
        discount: 10,
        category: 'snacks',
        type: 'non-veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_43',
        name: 'French Fries',
        description: 'Crispy golden potato fries with seasoning',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
        price: 70,
        discount: 5,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.0
    },
    {
        id: 'prod_44',
        name: 'Cheese Sandwich',
        description: 'Grilled sandwich with melted cheese and vegetables',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        price: 100,
        discount: 15,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_45',
        name: 'Grilled Chicken Sandwich',
        description: 'Grilled chicken breast with fresh salad',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        price: 130,
        discount: 10,
        category: 'snacks',
        type: 'non-veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_46',
        name: 'Chicken Nuggets (6 pcs)',
        description: 'Crispy chicken nuggets with dipping sauce',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
        price: 120,
        discount: 15,
        category: 'snacks',
        type: 'non-veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_47',
        name: 'Samosa (2 pcs)',
        description: 'Crispy triangular pastries with spiced potato filling',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        price: 40,
        discount: 0,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_48',
        name: 'Veg Puff',
        description: 'Flaky pastry with spiced vegetable filling',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        price: 30,
        discount: 0,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.0
    },
    {
        id: 'prod_49',
        name: 'Egg Roll',
        description: 'Spiced scrambled eggs wrapped in paratha',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        price: 60,
        discount: 10,
        category: 'snacks',
        type: 'non-veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.1
    },
    {
        id: 'prod_50',
        name: 'Chicken Roll',
        description: 'Spiced chicken pieces wrapped in soft bread',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        price: 80,
        discount: 15,
        category: 'snacks',
        type: 'non-veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_51',
        name: 'Spring Roll',
        description: 'Crispy rolls filled with vegetables and served with sauce',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        price: 70,
        discount: 5,
        category: 'snacks',
        type: 'veg',
        restaurantId: 'rest_8',
        restaurantName: 'Fast Bites',
        availability: 'available',
        rating: 4.2
    },

    // ADDITIONAL SOUTH INDIAN ITEMS
    {
        id: 'prod_52',
        name: 'Idli Sambar (4 pcs)',
        description: 'Soft steamed rice cakes served with lentil curry and coconut chutney',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
        price: 80,
        discount: 0,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_53',
        name: 'Medu Vada (4 pcs)',
        description: 'Crispy lentil donuts served with sambar and chutney',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
        price: 70,
        discount: 0,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_54',
        name: 'Uttapam',
        description: 'Thick pancake topped with vegetables',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
        price: 90,
        discount: 10,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_55',
        name: 'Pongal',
        description: 'Savory rice and lentil dish with ghee and spices',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
        price: 75,
        discount: 5,
        category: 'tiffin',
        type: 'veg',
        restaurantId: 'rest_1',
        restaurantName: 'South Indian Kitchen',
        availability: 'available',
        rating: 4.1
    },

    // ADDITIONAL NORTH INDIAN ITEMS
    {
        id: 'prod_56',
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken pieces',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 260,
        discount: 18,
        category: 'curry',
        type: 'non-veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.7
    },
    {
        id: 'prod_57',
        name: 'Kadai Paneer',
        description: 'Cottage cheese cooked with bell peppers in spicy gravy',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 210,
        discount: 12,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.4
    },
    {
        id: 'prod_58',
        name: 'Aloo Gobi',
        description: 'Dry curry with potatoes and cauliflower',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 140,
        discount: 8,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.2
    },
    {
        id: 'prod_59',
        name: 'Rajma',
        description: 'Red kidney beans in thick gravy',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
        price: 160,
        discount: 10,
        category: 'curry',
        type: 'veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.3
    },
    {
        id: 'prod_60',
        name: 'Fish Curry',
        description: 'Traditional coastal fish curry with coconut and spices',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
        price: 280,
        discount: 15,
        category: 'curry',
        type: 'non-veg',
        restaurantId: 'rest_4',
        restaurantName: 'Curry House',
        availability: 'available',
        rating: 4.6
    }
];

function initializeProducts() {
    // Initialize sample products if not exists
    let products = getFromStorage('products', []);
    if (products.length === 0) {
        saveToStorage('products', sampleProducts);
        products = sampleProducts;
    }
    
    displayProducts(products);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (products.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    productsGrid.innerHTML = products.map(product => {
        const discountedPrice = product.discount > 0 ? 
            product.price * (1 - product.discount / 100) : 
            product.price;
            
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-type ${product.type}">${getTypeIcon(product.type)}</div>
                    ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-restaurant">by ${product.restaurantName}</p>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-rating">
                        <span class="rating-stars">${getStars(product.rating)}</span>
                        <span class="rating-text">${product.rating}</span>
                    </div>
                    
                    <div class="product-price">
                        ${product.discount > 0 ? 
                            `<span class="original-price">₹${product.price}</span>
                             <span class="discounted-price">₹${discountedPrice.toFixed(2)}</span>` :
                            `<span class="current-price">₹${product.price}</span>`
                        }
                    </div>
                    
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getTypeIcon(type) {
    switch(type) {
        case 'veg': return '🟢';
        case 'non-veg': return '🔴';
        case 'beverage': return '🥤';
        default: return '🍽️';
    }
}

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars;
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let products = getFromStorage('products', []);
    
    // Apply filters
    if (searchTerm) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.restaurantName.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        products = products.filter(product => product.category === categoryFilter);
    }
    
    if (typeFilter) {
        products = products.filter(product => product.type === typeFilter);
    }
    
    // Apply sorting
    switch(sortFilter) {
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'discount':
            products.sort((a, b) => b.discount - a.discount);
            break;
    }
    
    displayProducts(products);
}

function addToCart(productId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Please Login', 'You need to login to add items to cart', 'warning');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }
    
    if (currentUser.userType !== 'customer') {
        showToast('Access Denied', 'Only customers can add items to cart', 'error');
        return;
    }
    
    const products = getFromStorage('products', []);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('Product Not Found', 'This product is no longer available', 'error');
        return;
    }
    
    // Add to cart with discounted price
    const cartItem = {
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
    };
    
    // Apply discount to price
    if (product.discount > 0) {
        cartItem.price = product.price * (1 - product.discount / 100);
        cartItem.originalPrice = product.price;
    }
    
    const success = addItemToCart(cartItem);
    if (success) {
        showToast('Added to Cart!', `${product.name} added to your cart`, 'success');
    }
}

// Helper function to add item to cart
function addItemToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    saveCart(cart);
    updateCartCount();
    return true;
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
