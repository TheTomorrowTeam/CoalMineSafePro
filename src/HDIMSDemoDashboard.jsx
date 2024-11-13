import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HDIMSDemoDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState('state');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newDataPoint, setNewDataPoint] = useState('');
  const [forumPost, setForumPost] = useState('');

  const demoData = {
    state: [
      { name: 'District A', value: 400 },
      { name: 'District B', value: 300 },
      { name: 'District C', value: 600 },
    ],
    district: [
      { name: 'Sub-district X', value: 200 },
      { name: 'Sub-district Y', value: 150 },
      { name: 'Sub-district Z', value: 300 },
    ],
    subdistrict: [
      { name: 'Hospital 1', value: 80 },
      { name: 'Hospital 2', value: 120 },
      { name: 'Hospital 3', value: 100 },
    ],
  };

  const renderHierarchySelector = () => (
    <div className="flex space-x-2 mb-4">
      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
        <SelectTrigger>
          <SelectValue placeholder="Select Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="state">State</SelectItem>
          <SelectItem value="district">District</SelectItem>
          <SelectItem value="subdistrict">Sub-district</SelectItem>
        </SelectContent>
      </Select>
      <Select value={selectedEntity} onValueChange={setSelectedEntity}>
        <SelectTrigger>
          <SelectValue placeholder="Select Entity" />
        </SelectTrigger>
        <SelectContent>
          {selectedLevel === 'state' && (
            <>
              <SelectItem value="districtA">District A</SelectItem>
              <SelectItem value="districtB">District B</SelectItem>
              <SelectItem value="districtC">District C</SelectItem>
            </>
          )}
          {selectedLevel === 'district' && (
            <>
              <SelectItem value="subdistrictX">Sub-district X</SelectItem>
              <SelectItem value="subdistrictY">Sub-district Y</SelectItem>
              <SelectItem value="subdistrictZ">Sub-district Z</SelectItem>
            </>
          )}
          {selectedLevel === 'subdistrict' && (
            <>
              <SelectItem value="hospital1">Hospital 1</SelectItem>
              <SelectItem value="hospital2">Hospital 2</SelectItem>
              <SelectItem value="hospital3">Hospital 3</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">HDIMS Demo Dashboard</h1>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dataEntry">Data Entry</TabsTrigger>
          <TabsTrigger value="forum">Department Forum</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {renderHierarchySelector()}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demoData[selectedLevel]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dataEntry">
          <Card>
            <CardHeader>
              <CardTitle>Update Hospital Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Select className="mb-2" onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                className="mb-2"
                placeholder="Enter new data point" 
                value={newDataPoint}
                onChange={(e) => setNewDataPoint(e.target.value)}
              />
              <Button>Submit Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Department Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <Select className="mb-2" onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                className="mb-2"
                placeholder="Enter your update" 
                value={forumPost}
                onChange={(e) => setForumPost(e.target.value)}
              />
              <Button>Post Update</Button>
              <div className="mt-4">
                <h3 className="font-semibold">Recent Updates:</h3>
                <ul className="list-disc pl-5 mt-2">
                  <li>Cardiology: New treatment protocol implemented</li>
                  <li>Pediatrics: Vaccination drive successful</li>
                  <li>Oncology: Equipment upgrade completed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HDIMSDemoDashboard;