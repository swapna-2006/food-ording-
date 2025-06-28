
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, MapPin, Phone, Mail } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Zipcode: '',
    City: '',
    State: '',
    Phone: '',
    Email: ''
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.Name || !formData.Address || !formData.Zipcode || !formData.City) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const customer = {
      CustID: Date.now(),
      ...formData
    };

    localStorage.setItem('customer', JSON.stringify(customer));
    
    toast({
      title: "Registration Successful!",
      description: "Welcome to IchirakuFlow! You can now place orders.",
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Join IchirakuFlow</CardTitle>
          <CardDescription>
            Register to start ordering delicious food!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Name">Full Name *</Label>
              <Input
                id="Name"
                name="Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="Email"
                  name="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.Email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="Phone"
                  name="Phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.Phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Address">Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="Address"
                  name="Address"
                  type="text"
                  placeholder="123 Ninja Street"
                  value={formData.Address}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="City">City *</Label>
                <Input
                  id="City"
                  name="City"
                  type="text"
                  placeholder="Konoha"
                  value={formData.City}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="State">State *</Label>
                <Input
                  id="State"
                  name="State"
                  type="text"
                  placeholder="Fire Country"
                  value={formData.State}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Zipcode">Zipcode *</Label>
              <Input
                id="Zipcode"
                name="Zipcode"
                type="text"
                placeholder="12345"
                value={formData.Zipcode}
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              Register Now
            </Button>

            <div className="text-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => window.location.href = '/'}
                className="text-orange-600"
              >
                Back to Menu
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
