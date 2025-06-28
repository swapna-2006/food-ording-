
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, CheckCircle, Package, Truck, Home } from 'lucide-react';

const statusSteps = [
  { key: 'Placed', label: 'Order Placed', icon: Package, description: 'Your order has been received' },
  { key: 'Preparing', label: 'Preparing', icon: Clock, description: 'Our chefs are preparing your meal' },
  { key: 'Out for Delivery', label: 'Out for Delivery', icon: Truck, description: 'Your order is on the way' },
  { key: 'Delivered', label: 'Delivered', icon: Home, description: 'Enjoy your meal!' }
];

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const orderList = JSON.parse(savedOrders);
      setOrders(orderList.reverse()); // Show most recent first
      
      if (orderList.length > 0) {
        setSelectedOrder(orderList[0]);
        updateOrderStatus(orderList[0]);
      }
    }
  }, []);

  const updateOrderStatus = (order) => {
    const currentIndex = statusSteps.findIndex(step => step.key === order.Status);
    setCurrentStep(currentIndex >= 0 ? currentIndex : 0);
    
    // Simulate order progression
    if (order.Status === 'Placed') {
      setTimeout(() => {
        const updatedOrder = { ...order, Status: 'Preparing' };
        updateOrderInStorage(updatedOrder);
        setSelectedOrder(updatedOrder);
        setCurrentStep(1);
      }, 10000); // 10 seconds
    } else if (order.Status === 'Preparing') {
      setTimeout(() => {
        const updatedOrder = { ...order, Status: 'Out for Delivery' };
        updateOrderInStorage(updatedOrder);
        setSelectedOrder(updatedOrder);
        setCurrentStep(2);
      }, 20000); // 20 more seconds
    }
  };

  const updateOrderInStorage = (updatedOrder) => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = savedOrders.findIndex(o => o.OrderID === updatedOrder.OrderID);
    if (orderIndex >= 0) {
      savedOrders[orderIndex] = updatedOrder;
      localStorage.setItem('orders', JSON.stringify(savedOrders));
    }
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / statusSteps.length) * 100;
  };

  const getStatusColor = (stepIndex) => {
    if (stepIndex < currentStep) return 'text-green-600';
    if (stepIndex === currentStep) return 'text-orange-600';
    return 'text-gray-400';
  };

  const getStatusBgColor = (stepIndex) => {
    if (stepIndex < currentStep) return 'bg-green-100';
    if (stepIndex === currentStep) return 'bg-orange-100';
    return 'bg-gray-100';
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle>No Orders to Track</CardTitle>
            <CardDescription>
              Place an order to track your delivery!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Order Now
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Follow your delicious meal's journey to your door!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Orders</h3>
            {orders.map((order) => (
              <Card 
                key={order.OrderID} 
                className={`cursor-pointer transition-all ${
                  selectedOrder?.OrderID === order.OrderID 
                    ? 'ring-2 ring-orange-600 bg-orange-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => {
                  setSelectedOrder(order);
                  updateOrderStatus(order);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">{order.OrderID}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(order.Timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      className={
                        order.Status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.Status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                        order.Status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {order.Status}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold mt-2">${order.TotalAmount.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tracking Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedOrder && (
              <>
                {/* Progress Bar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Progress</CardTitle>
                    <CardDescription>Order ID: {selectedOrder.OrderID}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage())}%</span>
                      </div>
                      <Progress value={getProgressPercentage()} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      {statusSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        
                        return (
                          <div key={step.key} className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusBgColor(index)}`}>
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : (
                                <Icon className={`h-6 w-6 ${getStatusColor(index)}`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold ${getStatusColor(index)}`}>
                                {step.label}
                              </p>
                              <p className="text-sm text-gray-600">{step.description}</p>
                              {isActive && (
                                <p className="text-xs text-orange-600 font-medium mt-1">
                                  Current Status
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.Items.map((item) => (
                        <div key={item.ItemID} className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.ItemName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{item.ItemName}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${(item.SellingPrice * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Estimated Delivery */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Delivery Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Estimated Delivery:</span>
                        <span className="font-semibold">
                          {new Date(selectedOrder.EstimatedDelivery).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Order Total:</span>
                        <span className="font-semibold">${selectedOrder.TotalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Order More Food
          </Button>
          <Button 
            onClick={() => window.location.href = '/order'}
            className="bg-orange-600 hover:bg-orange-700"
          >
            View Order Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
