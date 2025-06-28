
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.ItemID === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.ItemID !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.SellingPrice * item.quantity), 0).toFixed(2);
  };

  const placeOrder = () => {
    if (!customer) {
      toast({
        title: "Registration Required",
        description: "Please register before placing an order.",
        variant: "destructive"
      });
      window.location.href = '/register';
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    const order = {
      OrderID: `ORD-${Date.now()}`,
      CustID: customer.CustID,
      Items: cart,
      TotalAmount: parseFloat(calculateTotal()),
      Status: 'Placed',
      Timestamp: new Date().toISOString(),
      EstimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
    };

    // Save order
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    localStorage.setItem('currentOrder', JSON.stringify(order));

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');

    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${order.OrderID} has been placed.`,
    });

    // Redirect to order confirmation
    setTimeout(() => {
      window.location.href = '/order';
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>
              Add some delicious items to get started!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Menu</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.ItemID}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.ItemName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{item.ItemName}</h3>
                        <p className="text-gray-600">{item.ItemCategory}</p>
                        <p className="text-orange-600 font-bold">${item.SellingPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.ItemID, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Badge variant="secondary" className="px-3 py-1">
                          {item.quantity}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.ItemID, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.ItemID)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-right">
                    <span className="text-lg font-bold text-gray-800">
                      Subtotal: ${(item.SellingPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                  <span>${calculateTotal()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(parseFloat(calculateTotal()) + 2.99 + parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  size="lg"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>

            {/* Customer Info */}
            {customer && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{customer.Name}</p>
                    <p>{customer.Address}</p>
                    <p>{customer.City}, {customer.State} {customer.Zipcode}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
