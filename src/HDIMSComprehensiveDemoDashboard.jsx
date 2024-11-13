import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const HDIMSComprehensiveDemoDashboard = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDataCategory, setSelectedDataCategory] = useState('');

  // Mock data for various categories
  const facilityInfo = {
    name: "Central District Hospital",
    type: "District Hospital",
    location: "123 Health St, Central District",
    operationalHours: "24/7",
    contact: "central@district.health.gov"
  };

  const infrastructureData = {
    beds: { total: 500, icu: 50, maternity: 30, emergency: 20 },
    equipment: { ventilators: 30, oxygenConcentrators: 100, dialysisMachines: 10 },
    ambulances: { total: 10, operational: 8 },
    pharmacyStock: { vaccines: 1000, antibiotics: 5000, emergencyMeds: 2000 }
  };

  const staffingData = [
    { category: "Doctors", count: 100 },
    { category: "Nurses", count: 300 },
    { category: "Technicians", count: 50 },
    { category: "Support Staff", count: 150 }
  ];

  const patientData = [
    { month: "Jan", admissions: 500, outpatients: 2000 },
    { month: "Feb", admissions: 450, outpatients: 1800 },
    { month: "Mar", admissions: 600, outpatients: 2200 },
    { month: "Apr", admissions: 550, outpatients: 2100 }
  ];

  const programData = {
    NHM: { participation: "Active", beneficiaries: 10000 },
    RMNCHA: { participation: "Active", beneficiaries: 5000 },
    TB: { participation: "Active", beneficiaries: 500 }
  };

  const diseaseData = [
    { disease: "COVID-19", cases: 100, tests: 1000, positivity: 10 },
    { disease: "Dengue", cases: 50, tests: 500, positivity: 10 },
    { disease: "Malaria", cases: 30, tests: 300, positivity: 10 }
  ];

  const maternalChildData = {
    pregnancies: { enrolled: 500, antenatalCheckups: 2000, normalDeliveries: 400, cSections: 100 },
    childHealth: { immunized: 1000, growthMonitored: 1500 }
  };

  const financialData = {
    budget: 10000000,
    expenditure: 8000000,
    revenue: 1000000
  };

  const renderDataCategory = () => {
    switch (selectedDataCategory) {
      case 'infrastructure':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Healthcare Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Bed Availability</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(infrastructureData.beds).map(([key, value]) => ({ name: key, count: value }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <h3 className="font-semibold mt-4">Equipment Availability</h3>
              <ul className="list-disc pl-5">
                {Object.entries(infrastructureData.equipment).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      case 'staffing':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Human Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={staffingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'patients':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Patient Data</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="admissions" stroke="#8884d8" />
                  <Line type="monotone" dataKey="outpatients" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'programs':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Health Program Data</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(programData).map(([program, data]) => (
                <div key={program} className="mb-4">
                  <h3 className="font-semibold">{program}</h3>
                  <p>Participation: {data.participation}</p>
                  <p>Beneficiaries: {data.beneficiaries}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      case 'diseases':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Disease Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={diseaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#8884d8" />
                  <Bar dataKey="tests" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'maternal':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Maternal and Child Health</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Pregnancy Data</h3>
              <ul className="list-disc pl-5">
                {Object.entries(maternalChildData.pregnancies).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4">Child Health</h3>
              <ul className="list-disc pl-5">
                {Object.entries(maternalChildData.childHealth).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      case 'financial':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Financial Data</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Budget', value: financialData.budget },
                  { name: 'Expenditure', value: financialData.expenditure },
                  { name: 'Revenue', value: financialData.revenue }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">HDIMS Comprehensive Demo Dashboard</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Facility Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {facilityInfo.name}</p>
          <p><strong>Type:</strong> {facilityInfo.type}</p>
          <p><strong>Location:</strong> {facilityInfo.location}</p>
          <p><strong>Operational Hours:</strong> {facilityInfo.operationalHours}</p>
          <p><strong>Contact:</strong> {facilityInfo.contact}</p>
        </CardContent>
      </Card>

      <div className="flex space-x-2 mb-4">
        <Select value={selectedDataCategory} onValueChange={setSelectedDataCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Data Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="infrastructure">Healthcare Infrastructure</SelectItem>
            <SelectItem value="staffing">Human Resources</SelectItem>
            <SelectItem value="patients">Patient Data</SelectItem>
            <SelectItem value="programs">Health Program Data</SelectItem>
            <SelectItem value="diseases">Disease Surveillance</SelectItem>
            <SelectItem value="maternal">Maternal and Child Health</SelectItem>
            <SelectItem value="financial">Financial Data</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderDataCategory()}

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Alerts and Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle />
            <p>Critical: ICU bed occupancy exceeds 90%</p>
          </div>
          <div className="flex items-center space-x-2 text-yellow-500 mt-2">
            <AlertCircle />
            <p>Warning: Antibiotics stock below 20%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HDIMSComprehensiveDemoDashboard;