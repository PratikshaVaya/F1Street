import { Ruler, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SizeGuideModalProps {
  trigger?: React.ReactNode;
  category?: string;
}

const SizeGuideModal = ({ trigger, category = 'general' }: SizeGuideModalProps) => {
  const sizeCharts = {
    tees: {
      title: "Racing Tees Size Guide",
      measurements: [
        { size: 'XS', chest: '32-34', length: '26', shoulder: '16' },
        { size: 'S', chest: '34-36', length: '27', shoulder: '17' },
        { size: 'M', chest: '36-38', length: '28', shoulder: '18' },
        { size: 'L', chest: '38-40', length: '29', shoulder: '19' },
        { size: 'XL', chest: '40-42', length: '30', shoulder: '20' },
        { size: 'XXL', chest: '42-44', length: '31', shoulder: '21' },
      ]
    },
    jackets: {
      title: "Racing Jackets Size Guide",
      measurements: [
        { size: 'XS', chest: '34-36', length: '25', shoulder: '17', sleeve: '32' },
        { size: 'S', chest: '36-38', length: '26', shoulder: '18', sleeve: '33' },
        { size: 'M', chest: '38-40', length: '27', shoulder: '19', sleeve: '34' },
        { size: 'L', chest: '40-42', length: '28', shoulder: '20', sleeve: '35' },
        { size: 'XL', chest: '42-44', length: '29', shoulder: '21', sleeve: '36' },
        { size: 'XXL', chest: '44-46', length: '30', shoulder: '22', sleeve: '37' },
      ]
    },
    caps: {
      title: "Racing Caps Size Guide",
      measurements: [
        { size: 'S/M', circumference: '21.5-22.5', depth: '3.5', brim: '2.75' },
        { size: 'L/XL', circumference: '22.5-23.5', depth: '4', brim: '2.75' },
      ]
    }
  };

  const currentChart = sizeCharts[category as keyof typeof sizeCharts] || sizeCharts.tees;

  const measurementTips = [
    "Measure your body, not your clothes",
    "Use a soft measuring tape",
    "Measure over light clothing",
    "Keep the tape parallel to the floor",
    "For the best fit, have someone help you measure"
  ];

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Ruler className="mr-2 h-4 w-4" />
      Size Guide
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            {currentChart.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="guide">Measurement Guide</TabsTrigger>
            <TabsTrigger value="fit">Fit Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              All measurements are in inches. For international sizing, refer to our conversion guide below.
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Size</TableHead>
                    <TableHead className="font-semibold">Chest/Circumference</TableHead>
                    <TableHead className="font-semibold">Length/Depth</TableHead>
                    <TableHead className="font-semibold">
                      {category === 'jackets' ? 'Sleeve' : category === 'caps' ? 'Brim' : 'Shoulder'}
                    </TableHead>
                    {category === 'jackets' && <TableHead className="font-semibold">Shoulder</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentChart.measurements.map((measurement) => (
                    <TableRow key={measurement.size}>
                      <TableCell className="font-medium">{measurement.size}</TableCell>
                      <TableCell>{measurement.chest || measurement.circumference}</TableCell>
                      <TableCell>{measurement.length || measurement.depth}</TableCell>
                      <TableCell>{measurement.shoulder || measurement.sleeve || measurement.brim}</TableCell>
                      {category === 'jackets' && measurement.sleeve && (
                        <TableCell>{measurement.shoulder}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">International Size Conversion</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <strong>US/UK:</strong>
                    <div>XS = 0-2</div>
                    <div>S = 4-6</div>
                    <div>M = 8-10</div>
                    <div>L = 12-14</div>
                  </div>
                  <div>
                    <strong>EU:</strong>
                    <div>XS = 32-34</div>
                    <div>S = 36-38</div>
                    <div>M = 40-42</div>
                    <div>L = 44-46</div>
                  </div>
                  <div>
                    <strong>IT:</strong>
                    <div>XS = 36-38</div>
                    <div>S = 40-42</div>
                    <div>M = 44-46</div>
                    <div>L = 48-50</div>
                  </div>
                  <div>
                    <strong>JP:</strong>
                    <div>XS = 5-7</div>
                    <div>S = 9-11</div>
                    <div>M = 13-15</div>
                    <div>L = 17-19</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  How to Measure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Chest/Bust</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Measure around the fullest part of your chest/bust, keeping the tape parallel to the floor.
                    </p>
                    
                    <h4 className="font-semibold mb-2 mt-4">Length</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Measure from the highest point of your shoulder down to where you want the garment to end.
                    </p>

                    <h4 className="font-semibold mb-2 mt-4">Shoulder</h4>
                    <p className="text-sm text-muted-foreground">
                      Measure from shoulder point to shoulder point across your back.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tips:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {measurementTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary text-xs mt-1.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fit" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Fit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Best for:</strong> Active wear, racing activities</p>
                  <p><strong>Fit:</strong> Close to body, allows freedom of movement</p>
                  <p><strong>Recommendation:</strong> Choose your measured size</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Casual Fit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Best for:</strong> Everyday wear, layering</p>
                  <p><strong>Fit:</strong> Relaxed, comfortable</p>
                  <p><strong>Recommendation:</strong> Size up for looser fit</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Racing Heritage Fit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Best for:</strong> Authentic racing style</p>
                  <p><strong>Fit:</strong> Slightly oversized, vintage inspired</p>
                  <p><strong>Recommendation:</strong> True to size or size down for fitted look</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Still Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Our racing gear specialists are here to help!</p>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Contact Size Expert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;