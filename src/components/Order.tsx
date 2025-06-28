
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, User, MapPin, Phone } from 'lucide-react';

const Order = () => {
  const [order, setOrder] = useState(null);
  const [deliveryBoy, setDeliveryBoy] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const currentOrder = localStorage.getItem('currentOrder');
    if (currentOrder) {
      const orderData = JSON.parse(currentOrder);
      setOrder(orderData);
      
      // Assign delivery boy based on customer zipcode
      assignDeliveryBoy(orderData.CustID);
    }

    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  const assignDeliveryBoy = (custID) => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    const deliveryBoys = JSON.parse(localStorage.getItem('deliveryBoys') || '[]');
    const assignments = JSON.parse(localStorage.getItem('deliveryAssignments') || '[]');
    
    if (customer && deliveryBoys.length > 0) {
      // Find delivery boy assigned to customer's zipcode
      const assignment = assignments.find(a => a.Zipcode === customer.Zipcode);
      let assignedBoy;
      
      if (assignment) {
        assignedBoy = deliveryBoys.find(boy => boy.DBoyID === assignment.DBoyID);
      }
      
      // If no specific assignment, assign random delivery boy
      if (!assignedBoy) {
        assignedBoy = deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];
      }
      
      setDeliveryBoy(assignedBoy);
    }
  };

  const getEstimatedTime = () => {
    if (!order) return '';
    const deliveryTime = new Date(order.EstimatedDelivery);
    return deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No Order Found</CardTitle>
            <CardDescription>
              Please place an order first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-orange-600 hover:bg-orange-700"
            >
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We're preparing your delicious meal!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Order Details
                <Badge className="bg-green-100 text-green-800">
                  {order.Status}
                </Badge>
              </CardTitle>
              <CardDescription>Order ID: {order.OrderID}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {order.Items.map((item) => (
                  <div key={item.ItemID} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.ItemName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.SellingPrice * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <hr />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.TotalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(order.TotalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${(order.TotalAmount + 2.99 + order.TotalAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <div className="space-y-6">
            {/* Delivery Boy Info */}
            {deliveryBoy && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Your Delivery Ninja</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {deliveryBoy.Name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{deliveryBoy.Name}</p>
                        <p className="text-sm text-gray-600">Delivery Ninja</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{deliveryBoy.PhoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">🏍️</span>
                        <span>{deliveryBoy.VehicleNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Address */}
            {customer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Delivery Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold">{customer.Name}</p>
                    <p>{customer.Address}</p>
                    <p>{customer.City}, {customer.State} {customer.Zipcode}</p>
                    {customer.Phone && (
                      <p className="flex items-center space-x-2 mt-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{customer.Phone}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estimated Delivery Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Estimated Delivery</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{getEstimatedTime()}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order will be delivered in approximately 30 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            onClick={() => window.location.href = '/delivery'}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Track Your Order
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Order More Food
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
