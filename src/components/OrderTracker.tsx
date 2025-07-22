import { useState } from 'react';
import { Package, Search, MapPin, Clock, CheckCircle, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderTrackerProps {
  trigger?: React.ReactNode;
}

const OrderTracker = ({ trigger }: OrderTrackerProps) => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock order data for demo
  const mockOrders: Record<string, any> = {
    'RF2024001': {
      id: 'RF2024001',
      date: '2024-01-15',
      status: 'delivered',
      estimatedDelivery: '2024-01-18',
      actualDelivery: '2024-01-17',
      items: [
        { name: 'Monaco Racing Jacket', quantity: 1, price: 129.99 },
        { name: 'Championship Cap', quantity: 2, price: 39.99 }
      ],
      total: 209.97,
      trackingNumber: 'RF1234567890',
      timeline: [
        { status: 'confirmed', date: '2024-01-15 10:30', title: 'Order Confirmed', description: 'Your order has been confirmed and is being prepared.' },
        { status: 'preparing', date: '2024-01-15 14:20', title: 'Preparing for Shipment', description: 'Items are being picked and packed in our racing facility.' },
        { status: 'shipped', date: '2024-01-16 09:15', title: 'Shipped', description: 'Your package is on its way!' },
        { status: 'out_for_delivery', date: '2024-01-17 08:00', title: 'Out for Delivery', description: 'Package is out for delivery with our racing courier.' },
        { status: 'delivered', date: '2024-01-17 15:30', title: 'Delivered', description: 'Package delivered successfully to your doorstep.' }
      ]
    },
    'RF2024002': {
      id: 'RF2024002',
      date: '2024-01-20',
      status: 'shipped',
      estimatedDelivery: '2024-01-23',
      items: [
        { name: 'Silverstone Speed Tee', quantity: 1, price: 49.99 },
        { name: 'Racing Gloves', quantity: 1, price: 79.99 }
      ],
      total: 129.98,
      trackingNumber: 'RF1234567891',
      timeline: [
        { status: 'confirmed', date: '2024-01-20 11:00', title: 'Order Confirmed', description: 'Your order has been confirmed and is being prepared.' },
        { status: 'preparing', date: '2024-01-20 16:45', title: 'Preparing for Shipment', description: 'Items are being picked and packed in our racing facility.' },
        { status: 'shipped', date: '2024-01-21 10:30', title: 'Shipped', description: 'Your package is on its way!' }
      ]
    },
    'RF2024003': {
      id: 'RF2024003',
      date: '2024-01-22',
      status: 'preparing',
      estimatedDelivery: '2024-01-25',
      items: [
        { name: 'Track Day Essential Tee', quantity: 1, price: 54.99 }
      ],
      total: 54.99,
      timeline: [
        { status: 'confirmed', date: '2024-01-22 09:15', title: 'Order Confirmed', description: 'Your order has been confirmed and is being prepared.' },
        { status: 'preparing', date: '2024-01-22 14:20', title: 'Preparing for Shipment', description: 'Items are being picked and packed in our racing facility.' }
      ]
    }
  };

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const order = mockOrders[orderId.toUpperCase()];
    if (order) {
      setOrderData(order);
    } else {
      setError('Order not found. Please check your order ID and try again.');
    }

    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'preparing':
        return <Package className="h-4 w-4 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'out_for_delivery':
        return <MapPin className="h-4 w-4 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      confirmed: 'bg-blue-100 text-blue-700',
      preparing: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      out_for_delivery: 'bg-orange-100 text-orange-700',
      delivered: 'bg-green-100 text-green-700'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-700'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Package className="mr-2 h-4 w-4" />
      Track Order
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Order Tracker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track Your Racing Gear</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-id">Order ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="order-id"
                    placeholder="e.g., RF2024001"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <p><strong>Demo Order IDs:</strong> RF2024001 (delivered), RF2024002 (shipped), RF2024003 (preparing)</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {orderData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order {orderData.id}</span>
                  {getStatusBadge(orderData.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Summary */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Order Date:</strong> {new Date(orderData.date).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> ${orderData.total}</p>
                    {orderData.trackingNumber && (
                      <p><strong>Tracking #:</strong> {orderData.trackingNumber}</p>
                    )}
                  </div>
                  <div>
                    <p><strong>Estimated Delivery:</strong> {new Date(orderData.estimatedDelivery).toLocaleDateString()}</p>
                    {orderData.actualDelivery && (
                      <p><strong>Delivered:</strong> {new Date(orderData.actualDelivery).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold mb-3">Items Ordered</h4>
                  <div className="space-y-2">
                    {orderData.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold mb-4">Order Timeline</h4>
                  <div className="space-y-4">
                    {orderData.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(event.status)}
                          {index < orderData.timeline.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{event.title}</h5>
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.date).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderTracker;