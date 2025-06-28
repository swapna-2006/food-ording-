import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Comprehensive Telugu food menu data with authentic pricing
const menuData = [
  // TIFFINS & BREAKFAST ITEMS
  {
    ItemID: 1,
    ItemName: "Plain Idly (4 pieces)",
    SellingPrice: 40,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Idly Varieties",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
  },
  {
    ItemID: 2,
    ItemName: "Ghee Idly (4 pieces)",
    SellingPrice: 60,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Idly Varieties",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop"
  },
  {
    ItemID: 3,
    ItemName: "Rava Idly (4 pieces)",
    SellingPrice: 55,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Idly Varieties",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
  },
  {
    ItemID: 4,
    ItemName: "Button Idly (8 pieces)",
    SellingPrice: 50,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Idly Varieties",
    quantity: "8 pieces",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop"
  },
  {
    ItemID: 5,
    ItemName: "Carrot Idly (4 pieces)",
    SellingPrice: 65,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Idly Varieties",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop"
  },

  // DOSA VARIETIES
  {
    ItemID: 6,
    ItemName: "Plain Dosa",
    SellingPrice: 50,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 7,
    ItemName: "Masala Dosa",
    SellingPrice: 80,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop"
  },
  {
    ItemID: 8,
    ItemName: "Rava Dosa",
    SellingPrice: 70,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 9,
    ItemName: "Mysore Dosa",
    SellingPrice: 85,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop"
  },
  {
    ItemID: 10,
    ItemName: "Set Dosa (3 pieces)",
    SellingPrice: 90,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "3 pieces",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 11,
    ItemName: "Cheese Dosa",
    SellingPrice: 120,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop"
  },
  {
    ItemID: 12,
    ItemName: "Podi Dosa",
    SellingPrice: 75,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Dosa Varieties",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop"
  },

  // UTTAPAM VARIETIES
  {
    ItemID: 13,
    ItemName: "Onion Uttapam",
    SellingPrice: 70,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Uttapam",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop"
  },
  {
    ItemID: 14,
    ItemName: "Tomato Uttapam",
    SellingPrice: 75,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Uttapam",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop"
  },
  {
    ItemID: 15,
    ItemName: "Mix Veg Uttapam",
    SellingPrice: 85,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Uttapam",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop"
  },
  {
    ItemID: 16,
    ItemName: "Cheese Uttapam",
    SellingPrice: 110,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Uttapam",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop"
  },

  // PESARATTU VARIETIES
  {
    ItemID: 17,
    ItemName: "Plain Pesarattu",
    SellingPrice: 60,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Pesarattu",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1644746175906-fbc8b4a4c1b5?w=300&h=200&fit=crop"
  },
  {
    ItemID: 18,
    ItemName: "Upma Pesarattu",
    SellingPrice: 80,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Pesarattu",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1644746175906-fbc8b4a4c1b5?w=300&h=200&fit=crop"
  },
  {
    ItemID: 19,
    ItemName: "Ginger Pesarattu",
    SellingPrice: 70,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Pesarattu",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1644746175906-fbc8b4a4c1b5?w=300&h=200&fit=crop"
  },
  {
    ItemID: 20,
    ItemName: "Onion Pesarattu",
    SellingPrice: 75,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Pesarattu",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1644746175906-fbc8b4a4c1b5?w=300&h=200&fit=crop"
  },

  // UPMA VARIETIES
  {
    ItemID: 21,
    ItemName: "Suji Upma",
    SellingPrice: 45,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Upma Varieties",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 22,
    ItemName: "Tomato Bath",
    SellingPrice: 55,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Upma Varieties",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 23,
    ItemName: "Vegetable Upma",
    SellingPrice: 60,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Upma Varieties",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 24,
    ItemName: "Semiya Upma",
    SellingPrice: 50,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Upma Varieties",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },

  // VADA VARIETIES
  {
    ItemID: 25,
    ItemName: "Medu Vada (3 pieces)",
    SellingPrice: 45,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Vada Varieties",
    quantity: "3 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 26,
    ItemName: "Masala Vada (3 pieces)",
    SellingPrice: 50,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Vada Varieties",
    quantity: "3 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 27,
    ItemName: "Sambar Vada (2 pieces)",
    SellingPrice: 60,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Vada Varieties",
    quantity: "2 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 28,
    ItemName: "Curd Vada (2 pieces)",
    SellingPrice: 65,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Vada Varieties",
    quantity: "2 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },

  // OTHER TIFFIN ITEMS
  {
    ItemID: 29,
    ItemName: "Poori with Aloo (4 pieces)",
    SellingPrice: 65,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Others",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1626132647523-66f3bf4c3c10?w=300&h=200&fit=crop"
  },
  {
    ItemID: 30,
    ItemName: "Ponganalu (12 pieces)",
    SellingPrice: 60,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Others",
    quantity: "12 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 31,
    ItemName: "Punugulu (12 pieces)",
    SellingPrice: 50,
    ItemCategory: "Tiffins",
    ItemSubcategory: "Others",
    quantity: "12 pieces",
    image: "https://images.unsplash.com/photo-1666190553687-0e19ee23e51c?w=300&h=200&fit=crop"
  },

  // LUNCH & FULL MEALS
  {
    ItemID: 32,
    ItemName: "Andhra Veg Meals",
    SellingPrice: 120,
    ItemCategory: "Meals",
    ItemSubcategory: "Veg Meals",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop"
  },
  {
    ItemID: 33,
    ItemName: "Tomato Pappu with Rice",
    SellingPrice: 90,
    ItemCategory: "Meals",
    ItemSubcategory: "Andhra Style",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 34,
    ItemName: "Gongura Pappu",
    SellingPrice: 110,
    ItemCategory: "Meals",
    ItemSubcategory: "Andhra Style",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 35,
    ItemName: "Beerakaya Pappu",
    SellingPrice: 95,
    ItemCategory: "Meals",
    ItemSubcategory: "Andhra Style",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 36,
    ItemName: "Gutti Vankaya Curry",
    SellingPrice: 95,
    ItemCategory: "Meals",
    ItemSubcategory: "Andhra Style",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=300&h=200&fit=crop"
  },
  {
    ItemID: 37,
    ItemName: "Bendakaya Fry",
    SellingPrice: 85,
    ItemCategory: "Meals",
    ItemSubcategory: "Andhra Style",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=300&h=200&fit=crop"
  },
  {
    ItemID: 38,
    ItemName: "Drumstick Sambar",
    SellingPrice: 100,
    ItemCategory: "Meals",
    ItemSubcategory: "South Indian",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 39,
    ItemName: "Paneer Butter Masala",
    SellingPrice: 140,
    ItemCategory: "Meals",
    ItemSubcategory: "North Indian",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop"
  },

  // NON-VEG CURRIES
  {
    ItemID: 40,
    ItemName: "Andhra Chicken Curry",
    SellingPrice: 180,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Chicken",
    quantity: "500g",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop"
  },
  {
    ItemID: 41,
    ItemName: "Mutton Curry",
    SellingPrice: 280,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Mutton",
    quantity: "500g",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&h=200&fit=crop"
  },
  {
    ItemID: 42,
    ItemName: "Chicken 65",
    SellingPrice: 220,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Andhra Specials",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop"
  },
  {
    ItemID: 43,
    ItemName: "Natukodi Fry",
    SellingPrice: 350,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Andhra Specials",
    quantity: "500g",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop"
  },
  {
    ItemID: 44,
    ItemName: "Kodi Kura",
    SellingPrice: 200,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Andhra Specials",
    quantity: "500g",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop"
  },
  {
    ItemID: 45,
    ItemName: "Egg Curry",
    SellingPrice: 120,
    ItemCategory: "Non-Veg",
    ItemSubcategory: "Egg",
    quantity: "4 eggs",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&h=200&fit=crop"
  },

  // BIRYANI & RICE SPECIALS
  {
    ItemID: 46,
    ItemName: "Chicken Biryani",
    SellingPrice: 220,
    ItemCategory: "Biryani",
    ItemSubcategory: "Non-Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=200&fit=crop"
  },
  {
    ItemID: 47,
    ItemName: "Mutton Biryani",
    SellingPrice: 320,
    ItemCategory: "Biryani",
    ItemSubcategory: "Non-Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&h=200&fit=crop"
  },
  {
    ItemID: 48,
    ItemName: "Veg Biryani",
    SellingPrice: 150,
    ItemCategory: "Biryani",
    ItemSubcategory: "Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 49,
    ItemName: "Ulavacharu Biryani",
    SellingPrice: 280,
    ItemCategory: "Biryani",
    ItemSubcategory: "Andhra Specials",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 50,
    ItemName: "Hyderabadi Chicken Biryani",
    SellingPrice: 250,
    ItemCategory: "Biryani",
    ItemSubcategory: "Non-Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=200&fit=crop"
  },
  {
    ItemID: 51,
    ItemName: "Egg Biryani",
    SellingPrice: 180,
    ItemCategory: "Biryani",
    ItemSubcategory: "Non-Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&h=200&fit=crop"
  },
  {
    ItemID: 52,
    ItemName: "Paneer Biryani",
    SellingPrice: 190,
    ItemCategory: "Biryani",
    ItemSubcategory: "Veg Biryani",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },

  // RICE SPECIALS
  {
    ItemID: 53,
    ItemName: "Pulihora (Tamarind Rice)",
    SellingPrice: 70,
    ItemCategory: "Rice Specials",
    ItemSubcategory: "Traditional Rice",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 54,
    ItemName: "Curd Rice",
    SellingPrice: 60,
    ItemCategory: "Rice Specials",
    ItemSubcategory: "Traditional Rice",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 55,
    ItemName: "Lemon Rice",
    SellingPrice: 65,
    ItemCategory: "Rice Specials",
    ItemSubcategory: "Traditional Rice",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },
  {
    ItemID: 56,
    ItemName: "Ghee Rice",
    SellingPrice: 80,
    ItemCategory: "Rice Specials",
    ItemSubcategory: "Traditional Rice",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 57,
    ItemName: "Bisibelebath",
    SellingPrice: 90,
    ItemCategory: "Rice Specials",
    ItemSubcategory: "Traditional Rice",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
  },

  // SNACKS & EVENING BITES
  {
    ItemID: 58,
    ItemName: "Mirchi Bajji (6 pieces)",
    SellingPrice: 60,
    ItemCategory: "Snacks",
    ItemSubcategory: "Deep Fry",
    quantity: "6 pieces",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 59,
    ItemName: "Onion Pakoda (8 pieces)",
    SellingPrice: 55,
    ItemCategory: "Snacks",
    ItemSubcategory: "Deep Fry",
    quantity: "8 pieces",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 60,
    ItemName: "Aloo Bonda (4 pieces)",
    SellingPrice: 40,
    ItemCategory: "Snacks",
    ItemSubcategory: "Deep Fry",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop"
  },
  {
    ItemID: 61,
    ItemName: "Paneer Pakoda (6 pieces)",
    SellingPrice: 80,
    ItemCategory: "Snacks",
    ItemSubcategory: "Deep Fry",
    quantity: "6 pieces",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 62,
    ItemName: "Egg Puff",
    SellingPrice: 35,
    ItemCategory: "Snacks",
    ItemSubcategory: "Bakery",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1509365390234-33a50be1eca5?w=300&h=200&fit=crop"
  },
  {
    ItemID: 63,
    ItemName: "Veg Puff",
    SellingPrice: 30,
    ItemCategory: "Snacks",
    ItemSubcategory: "Bakery",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1509365390234-33a50be1eca5?w=300&h=200&fit=crop"
  },
  {
    ItemID: 64,
    ItemName: "Chicken Puff",
    SellingPrice: 45,
    ItemCategory: "Snacks",
    ItemSubcategory: "Bakery",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1509365390234-33a50be1eca5?w=300&h=200&fit=crop"
  },

  // SWEETS & DESSERTS
  {
    ItemID: 65,
    ItemName: "Mysore Pak (250g)",
    SellingPrice: 120,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
  },
  {
    ItemID: 66,
    ItemName: "Ariselu (6 pieces)",
    SellingPrice: 150,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "6 pieces",
    image: "https://images.unsplash.com/photo-1464454709131-fcc8ab27d4c8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 67,
    ItemName: "Pootharekulu (6 pieces)",
    SellingPrice: 200,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "6 pieces",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 68,
    ItemName: "Bobbatlu (4 pieces)",
    SellingPrice: 100,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1464454709131-fcc8ab27d4c8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 69,
    ItemName: "Gulab Jamun (4 pieces)",
    SellingPrice: 80,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "4 pieces",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
  },
  {
    ItemID: 70,
    ItemName: "Jalebi (250g)",
    SellingPrice: 100,
    ItemCategory: "Sweets",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
  },
  {
    ItemID: 71,
    ItemName: "Double Ka Meetha",
    SellingPrice: 90,
    ItemCategory: "Sweets",
    ItemSubcategory: "Hyderabadi",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1464454709131-fcc8ab27d4c8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 72,
    ItemName: "Khubani Ka Meetha",
    SellingPrice: 110,
    ItemCategory: "Sweets",
    ItemSubcategory: "Hyderabadi",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop"
  },

  // FAST FOOD & INDO-CHINESE
  {
    ItemID: 73,
    ItemName: "Chicken Fried Rice",
    SellingPrice: 140,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Fried Rice",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 74,
    ItemName: "Veg Fried Rice",
    SellingPrice: 100,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Fried Rice",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop"
  },
  {
    ItemID: 75,
    ItemName: "Chicken Noodles",
    SellingPrice: 130,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Noodles",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop"
  },
  {
    ItemID: 76,
    ItemName: "Veg Noodles",
    SellingPrice: 90,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Noodles",
    quantity: "Full plate",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop"
  },
  {
    ItemID: 77,
    ItemName: "Gobi Manchurian",
    SellingPrice: 110,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Manchurian",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop"
  },
  {
    ItemID: 78,
    ItemName: "Chicken Manchurian",
    SellingPrice: 150,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Manchurian",
    quantity: "1 bowl",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop"
  },
  {
    ItemID: 79,
    ItemName: "Chicken Roll",
    SellingPrice: 80,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Rolls & Wraps",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&h=200&fit=crop"
  },
  {
    ItemID: 80,
    ItemName: "Paneer Roll",
    SellingPrice: 70,
    ItemCategory: "Fast Food",
    ItemSubcategory: "Rolls & Wraps",
    quantity: "1 piece",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&h=200&fit=crop"
  },

  // BEVERAGES
  {
    ItemID: 81,
    ItemName: "Filter Coffee",
    SellingPrice: 25,
    ItemCategory: "Beverages",
    ItemSubcategory: "Hot Drinks",
    quantity: "1 cup",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop"
  },
  {
    ItemID: 82,
    ItemName: "Masala Chai",
    SellingPrice: 20,
    ItemCategory: "Beverages",
    ItemSubcategory: "Hot Drinks",
    quantity: "1 cup",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop"
  },
  {
    ItemID: 83,
    ItemName: "Buttermilk",
    SellingPrice: 30,
    ItemCategory: "Beverages",
    ItemSubcategory: "Cool Drinks",
    quantity: "1 glass",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 84,
    ItemName: "Mango Lassi",
    SellingPrice: 60,
    ItemCategory: "Beverages",
    ItemSubcategory: "Cool Drinks",
    quantity: "1 glass",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop"
  },
  {
    ItemID: 85,
    ItemName: "Rose Milk",
    SellingPrice: 40,
    ItemCategory: "Beverages",
    ItemSubcategory: "Cool Drinks",
    quantity: "1 glass",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop"
  },
  {
    ItemID: 86,
    ItemName: "Fresh Lime Soda",
    SellingPrice: 35,
    ItemCategory: "Beverages",
    ItemSubcategory: "Cool Drinks",
    quantity: "1 glass",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=300&h=200&fit=crop"
  },
  {
    ItemID: 87,
    ItemName: "Badam Milk",
    SellingPrice: 50,
    ItemCategory: "Beverages",
    ItemSubcategory: "Hot Drinks",
    quantity: "1 glass",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop"
  },

  // SAVOURIES
  {
    ItemID: 88,
    ItemName: "Mixture (250g)",
    SellingPrice: 60,
    ItemCategory: "Savouries",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 89,
    ItemName: "Murukulu (250g)",
    SellingPrice: 80,
    ItemCategory: "Savouries",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 90,
    ItemName: "Chakodi (250g)",
    SellingPrice: 70,
    ItemCategory: "Savouries",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  },
  {
    ItemID: 91,
    ItemName: "Chekkalu (250g)",
    SellingPrice: 90,
    ItemCategory: "Savouries",
    ItemSubcategory: "Traditional",
    quantity: "250g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop"
  }
];

const categories = [
  "All", 
  "Tiffins", 
  "Meals", 
  "Non-Veg", 
  "Biryani", 
  "Rice Specials", 
  "Snacks", 
  "Sweets", 
  "Fast Food", 
  "Beverages", 
  "Savouries"
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [customer, setCustomer] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Initialize data in localStorage
    if (!localStorage.getItem('menuData')) {
      localStorage.setItem('menuData', JSON.stringify(menuData));
    }
    
    // Load cart and customer data
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }

    // Initialize delivery data
    initializeDeliveryData();
  }, []);

  const initializeDeliveryData = () => {
    if (!localStorage.getItem('deliveryBoys')) {
      const deliveryBoys = [
        { DBoyID: 1, Name: "Ravi Kumar", PhoneNumber: "9876543210", VehicleNumber: "TS09EH1234" },
        { DBoyID: 2, Name: "Suresh Babu", PhoneNumber: "9876543211", VehicleNumber: "TS09FH5678" },
        { DBoyID: 3, Name: "Ramesh Reddy", PhoneNumber: "9876543212", VehicleNumber: "TS09GH9012" },
        { DBoyID: 4, Name: "Venkat Rao", PhoneNumber: "9876543213", VehicleNumber: "TS09HH3456" },
        { DBoyID: 5, Name: "Krishna Murthy", PhoneNumber: "9876543214", VehicleNumber: "AP39CH7890" },
        { DBoyID: 6, Name: "Naresh Kumar", PhoneNumber: "9876543215", VehicleNumber: "AP20DH1234" }
      ];
      localStorage.setItem('deliveryBoys', JSON.stringify(deliveryBoys));
    }

    if (!localStorage.getItem('zipcodes')) {
      const zipcodes = [
        // Hyderabad & Surrounding Areas
        { Zipcode: "500001", City: "Hyderabad", State: "Telangana", Area: "Afzal Gunj" },
        { Zipcode: "500002", City: "Secunderabad", State: "Telangana", Area: "Secunderabad Railway Station" },
        { Zipcode: "500003", City: "Hyderabad", State: "Telangana", Area: "Kachiguda" },
        { Zipcode: "500004", City: "Hyderabad", State: "Telangana", Area: "Abids" },
        { Zipcode: "500016", City: "Hyderabad", State: "Telangana", Area: "Himayat Nagar" },
        { Zipcode: "500020", City: "Hyderabad", State: "Telangana", Area: "Jubilee Hills" },
        { Zipcode: "500081", City: "Hyderabad", State: "Telangana", Area: "Gachibowli" },
        { Zipcode: "500032", City: "Hyderabad", State: "Telangana", Area: "Kukatpally" },
        { Zipcode: "500033", City: "Hyderabad", State: "Telangana", Area: "LB Nagar" },
        { Zipcode: "500035", City: "Hyderabad", State: "Telangana", Area: "Kondapur" },
        
        // Vijayawada
        { Zipcode: "520001", City: "Vijayawada", State: "Andhra Pradesh", Area: "Governorpet" },
        { Zipcode: "520002", City: "Vijayawada", State: "Andhra Pradesh", Area: "Labbipet" },
        { Zipcode: "520010", City: "Vijayawada", State: "Andhra Pradesh", Area: "Benz Circle" },
        
        // Visakhapatnam
        { Zipcode: "530001", City: "Visakhapatnam", State: "Andhra Pradesh", Area: "Dwaraka Nagar" },
        { Zipcode: "530013", City: "Visakhapatnam", State: "Andhra Pradesh", Area: "MVP Colony" },
        { Zipcode: "530016", City: "Visakhapatnam", State: "Andhra Pradesh", Area: "Gajuwaka" },
        
        // Tirupati
        { Zipcode: "517501", City: "Tirupati", State: "Andhra Pradesh", Area: "Tirupati Central" },
        { Zipcode: "517502", City: "Tirupati", State: "Andhra Pradesh", Area: "Renigunta" },
        
        // Guntur
        { Zipcode: "522001", City: "Guntur", State: "Andhra Pradesh", Area: "Guntur Central" },
        { Zipcode: "522002", City: "Guntur", State: "Andhra Pradesh", Area: "Brodipet" },
        
        // Warangal
        { Zipcode: "506001", City: "Warangal", State: "Telangana", Area: "Hanamkonda" },
        { Zipcode: "506002", City: "Warangal", State: "Telangana", Area: "Kazipet" }
      ];
      localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
    }

    if (!localStorage.getItem('deliveryAssignments')) {
      const assignments = [
        // Hyderabad assignments
        { DBoyID: 1, Zipcode: "500001" },
        { DBoyID: 1, Zipcode: "500003" },
        { DBoyID: 1, Zipcode: "500004" },
        { DBoyID: 2, Zipcode: "500002" },
        { DBoyID: 2, Zipcode: "500016" },
        { DBoyID: 3, Zipcode: "500020" },
        { DBoyID: 3, Zipcode: "500032" },
        { DBoyID: 3, Zipcode: "500081" },
        { DBoyID: 4, Zipcode: "500033" },
        { DBoyID: 4, Zipcode: "500035" },
        
        // Andhra Pradesh assignments
        { DBoyID: 5, Zipcode: "520001" },
        { DBoyID: 5, Zipcode: "520002" },
        { DBoyID: 5, Zipcode: "520010" },
        { DBoyID: 6, Zipcode: "530001" },
        { DBoyID: 6, Zipcode: "530013" },
        { DBoyID: 6, Zipcode: "530016" },
        { DBoyID: 5, Zipcode: "517501" },
        { DBoyID: 5, Zipcode: "517502" },
        { DBoyID: 6, Zipcode: "522001" },
        { DBoyID: 6, Zipcode: "522002" },
        
        // Telangana other cities
        { DBoyID: 4, Zipcode: "506001" },
        { DBoyID: 4, Zipcode: "506002" }
      ];
      localStorage.setItem('deliveryAssignments', JSON.stringify(assignments));
    }
  };

  const addToCart = (item) => {
    if (!selectedLocation) {
      toast({
        title: "Select Location First!",
        description: "Please select your delivery location before adding items to cart.",
        variant: "destructive"
      });
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.ItemID === item.ItemID);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.ItemID === item.ItemID
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...item, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }

    toast({
      title: "Added to Cart! 🛒",
      description: `${item.ItemName} has been added to your cart.`,
    });
  };

  const handleLocationSelect = (zipcode) => {
    setSelectedLocation(zipcode);
    localStorage.setItem('selectedLocation', zipcode);
    
    const zipcodes = JSON.parse(localStorage.getItem('zipcodes') || '[]');
    const locationInfo = zipcodes.find(z => z.Zipcode === zipcode);
    
    toast({
      title: "Location Selected! 📍",
      description: `Delivering to ${locationInfo?.Area}, ${locationInfo?.City}`,
    });
  };

  const filteredMenu = selectedCategory === "All" 
    ? menuData 
    : menuData.filter(item => item.ItemCategory === selectedCategory);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Get available locations from localStorage
  const availableLocations = JSON.parse(localStorage.getItem('zipcodes') || '[]');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl font-bold">🍜</span>
              </div>
              <h1 className="text-2xl font-bold">IchirakuFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Location Selector */}
              <div className="hidden md:block">
                <select 
                  value={selectedLocation}
                  onChange={(e) => handleLocationSelect(e.target.value)}
                  className="bg-white text-gray-800 px-3 py-1 rounded-md text-sm border-none outline-none"
                >
                  <option value="">Select Location</option>
                  {availableLocations.map((location) => (
                    <option key={location.Zipcode} value={location.Zipcode}>
                      {location.Area}, {location.City} - {location.Zipcode}
                    </option>
                  ))}
                </select>
              </div>

              {customer ? (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{customer.Name}</span>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  onClick={() => window.location.href = '/register'}
                  className="flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Button>
              )}
              
              <Button 
                variant="secondary" 
                onClick={() => window.location.href = '/cart'}
                className="relative flex items-center space-x-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to IchirakuFlow Telugu Kitchen
          </h2>
          <p className="text-xl md:text-2xl mb-4">
            Authentic Telugu & Andhra cuisine delivered fast! 🏠
          </p>
          <p className="text-lg mb-8">
            📍 Serving: Hyderabad, Secunderabad, Vijayawada, Visakhapatnam, Tirupati, Guntur, Warangal
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.location.href = '/ai'}
              className="flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>AI Food Suggestions</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/delivery'}
              className="flex items-center space-x-2 text-white border-white hover:bg-white hover:text-orange-600"
            >
              <MapPin className="h-5 w-5" />
              <span>Track Order</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Notice */}
      {!selectedLocation && (
        <section className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <div className="container mx-auto text-center">
            <p className="font-semibold">📍 Please select your delivery location to start ordering!</p>
          </div>
        </section>
      )}

      {/* Delivery Areas */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">📍 Delivery Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Hyderabad</p>
              <p className="text-sm text-gray-600">Multiple Areas</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Secunderabad</p>
              <p className="text-sm text-gray-600">500002</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Vijayawada</p>
              <p className="text-sm text-gray-600">520001-520010</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Visakhapatnam</p>
              <p className="text-sm text-gray-600">530001-530016</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Tirupati</p>
              <p className="text-sm text-gray-600">517501-517502</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Guntur</p>
              <p className="text-sm text-gray-600">522001-522002</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <p className="font-semibold text-orange-800">Warangal</p>
              <p className="text-sm text-gray-600">506001-506002</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category === "Tiffins" && "🥞 "}
                {category === "Meals" && "🍚 "}
                {category === "Non-Veg" && "🍗 "}
                {category === "Biryani" && "🍛 "}
                {category === "Rice Specials" && "🍙 "}
                {category === "Snacks" && "🍟 "}
                {category === "Sweets" && "🍨 "}
                {category === "Fast Food" && "🥪 "}
                {category === "Beverages" && "🥤 "}
                {category === "Savouries" && "🥨 "}
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Authentic Telugu Menu 🍽️
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenu.map((item) => (
              <Card key={item.ItemID} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.ItemName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.ItemName}</CardTitle>
                    <Badge variant="secondary">{item.ItemCategory}</Badge>
                  </div>
                  <CardDescription>
                    {item.ItemSubcategory} • {item.quantity}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{item.SellingPrice}
                    </span>
                    <Button 
                      onClick={() => addToCart(item)}
                      className="bg-orange-600 hover:bg-orange-700"
                      disabled={!selectedLocation}
                    >
                      {!selectedLocation ? 'Select Location' : 'Add to Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Location Display */}
      {selectedLocation && (
        <section className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mx-4 mb-8 rounded">
          <div className="container mx-auto text-center">
            <p className="font-semibold">
              🚚 Delivering to: {availableLocations.find(l => l.Zipcode === selectedLocation)?.Area}, {availableLocations.find(l => l.Zipcode === selectedLocation)?.City} - {selectedLocation}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">IchirakuFlow Telugu Kitchen</h4>
          <p className="text-gray-400 mb-2">
            Authentic Telugu & Andhra Pradesh cuisine delivered with love! 🧡
          </p>
          <p className="text-sm text-gray-500 mb-4">
            📱 Contact: +91-9876543210 | 📧 orders@ichirakuflow.com
          </p>
          <p className="text-sm text-gray-500 mb-4">
            📍 Serving across Telangana & Andhra Pradesh
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
            <div>
              <p className="font-semibold text-white">Telangana</p>
              <p>Hyderabad, Secunderabad</p>
              <p>Warangal, Karimnagar</p>
            </div>
            <div>
              <p className="font-semibold text-white">Andhra Pradesh</p>
              <p>Vijayawada, Visakhapatnam</p>
              <p>Tirupati, Guntur</p>
            </div>
            <div>
              <p className="font-semibold text-white">Specialties</p>
              <p>Authentic Telugu Food</p>
              <p>Traditional Recipes</p>
            </div>
            <div>
              <p className="font-semibold text-white">Quick Links</p>
              <p><a href="/ai" className="hover:text-orange-400">AI Suggestions</a></p>
              <p><a href="/delivery" className="hover:text-orange-400">Track Order</a></p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            © 2024 IchirakuFlow Telugu Kitchen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
