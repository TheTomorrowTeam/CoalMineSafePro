import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Camera, Send, FileText, Bell, Settings, Shield, Activity, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Alert, AlertDescription } from "./components/ui/alert";

const ShiftHandover = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentSection, setCurrentSection] = useState('status');
  const [equipmentStatus, setEquipmentStatus] = useState({
    Drill: 'working',
    Pump: 'working',
    Ventilation: 'working',
    Lights: 'working'
  });
  const [shiftSummary, setShiftSummary] = useState([
    { time: "10:00 AM", status: "safe", message: "Ventilation checked" },
    { time: "11:30 AM", status: "alert", message: "Pump maintenance required" },
    { time: "1:00 PM", status: "safe", message: "Area inspection complete" }
  ]);

  const translations = {
    english: {
      status: "Status",
      safe: "Safe",
      unsafe: "Unsafe",
      equipment: "Equipment",
      report: "Report Issue",
      submit: "Submit",
      working: "Working",
      notWorking: "Not Working",
      emergency: "Emergency",
      equipmentIssue: "Equipment Issue",
      safetyHazard: "Safety Hazard",
      takePhoto: "Take Photo",
      sendMessage: "Send Message",
      shiftSummary: "Shift Summary",
      addEntry: "Add Entry",
      confirmEmergency: "Are you sure you want to send an emergency alert?",
      cancel: "Cancel",
      confirm: "Confirm"
    },
    hindi: {
      status: "स्थिति",
      safe: "सुरक्षित",
      unsafe: "असुरक्षित",
      equipment: "उपकरण",
      report: "रिपोर्ट",
      submit: "जमा करें",
      working: "काम कर रहा है",
      notWorking: "काम नहीं कर रहा",
      emergency: "आपातकालीन",
      equipmentIssue: "उपकरण समस्या",
      safetyHazard: "सुरक्षा खतरा",
      takePhoto: "फोटो लें",
      sendMessage: "संदेश भेजें",
      shiftSummary: "शिफ्ट सारांश",
      addEntry: "प्रविष्टि जोड़ें",
      confirmEmergency: "क्या आप आपातकालीन अलर्ट भेजना चाहते हैं?",
      cancel: "रद्द करें",
      confirm: "पुष्टि करें"
    }
  };

  const t = (key) => translations[selectedLanguage][key] || translations.english[key];

  const handleEquipmentStatusChange = (item) => {
    setEquipmentStatus((prevStatus) => ({
      ...prevStatus,
      [item]: prevStatus[item] === 'working' ? 'notWorking' : 'working'
    }));
  };

  const handleAddShiftSummaryEntry = () => {
    const newEntry = { time: new Date().toLocaleTimeString(), status: 'safe', message: 'New entry added' };
    setShiftSummary((prevSummary) => [...prevSummary, newEntry]);
  };

  const handleEmergencyAlert = () => {
    if (window.confirm(t('confirmEmergency'))) {
      alert(t('emergency'));
    }
  };

  const StatusCheck = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Shield className="mr-2 h-6 w-6 text-blue-500" />
        {t('status')}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="p-6 bg-green-100 rounded-xl flex flex-col items-center justify-center hover:bg-green-200 transition-colors border-2 border-green-300"
          onClick={() => { }}
        >
          <CheckCircle className="h-12 w-12 text-green-600 mb-2" />
          <span className="text-lg font-medium text-green-800">{t('safe')}</span>
        </button>

        <button
          className="p-6 bg-red-100 rounded-xl flex flex-col items-center justify-center hover:bg-red-200 transition-colors border-2 border-red-300"
          onClick={() => { }}
        >
          <AlertTriangle className="h-12 w-12 text-red-600 mb-2" />
          <span className="text-lg font-medium text-red-800">{t('unsafe')}</span>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Settings className="mr-2 h-5 w-5 text-gray-600" />
          {t('equipment')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {['Drill', 'Pump', 'Ventilation', 'Lights'].map((item) => (
            <button
              key={item}
              className={`p-4 rounded-lg border-2 transition-colors ${equipmentStatus[item] === 'working' ? 'bg-white border-gray-300 hover:border-blue-500' : 'bg-red-100 border-red-300 hover:border-red-500'}`}
              onClick={() => handleEquipmentStatusChange(item)}
            >
              <div className="flex items-center justify-between">
                <span>{item}</span>
                <div className="flex space-x-2">
                  <div className={`w-3 h-3 rounded-full ${equipmentStatus[item] === 'working' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const QuickReport = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">
        {t('report')}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button className="aspect-square p-4 bg-yellow-100 rounded-xl flex flex-col items-center justify-center hover:bg-yellow-200 transition-colors">
          <Settings className="h-10 w-10 text-yellow-600 mb-2" />
          <span className="text-center">{t('equipmentIssue')}</span>
        </button>
        <button className="aspect-square p-4 bg-red-100 rounded-xl flex flex-col items-center justify-center hover:bg-red-200 transition-colors">
          <AlertTriangle className="h-10 w-10 text-red-600 mb-2" />
          <span className="text-center">{t('safetyHazard')}</span>
        </button>
        <button className="aspect-square p-4 bg-blue-100 rounded-xl flex flex-col items-center justify-center hover:bg-blue-200 transition-colors">
          <Camera className="h-10 w-10 text-blue-600 mb-2" />
          <span className="text-center">{t('takePhoto')}</span>
        </button>
        <button className="aspect-square p-4 bg-green-100 rounded-xl flex flex-col items-center justify-center hover:bg-green-200 transition-colors">
          <Send className="h-10 w-10 text-green-600 mb-2" />
          <span className="text-center">{t('sendMessage')}</span>
        </button>
      </div>

      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Tap any button to report an issue. Photos will help supervisors understand better.
        </AlertDescription>
      </Alert>
    </div>
  );

  const ShiftSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          {t('shiftSummary')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shiftSummary.map((entry, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
            >
              <div className={`w-2 h-2 rounded-full ${entry.status === 'safe' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm text-gray-500">{entry.time}</span>
              <span className="flex-1">{entry.message}</span>
            </div>
          ))}
          <button
            className="mt-4 p-2 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
            onClick={handleAddShiftSummaryEntry}
          >
            <span className="text-blue-600">{t('addEntry')}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-around max-w-md mx-auto">
        <button
          onClick={() => setCurrentSection('status')}
          className={`flex flex-col items-center ${currentSection === 'status' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <CheckCircle className="h-6 w-6" />
          <span className="text-sm mt-1">Check</span>
        </button>
        <button
          onClick={() => setCurrentSection('report')}
          className={`flex flex-col items-center ${currentSection === 'report' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <AlertTriangle className="h-6 w-6" />
          <span className="text-sm mt-1">Report</span>
        </button>
        <button
          onClick={() => setCurrentSection('summary')}
          className={`flex flex-col items-center ${currentSection === 'summary' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <FileText className="h-6 w-6" />
          <span className="text-sm mt-1">Summary</span>
        </button>
      </div>
    </div>
  );

  const EmergencyAlert = () => (
    <div className="fixed bottom-20 right-4">
      <button
        className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        onClick={handleEmergencyAlert}
      >
        <AlertCircle className="h-6 w-6" />
      </button>
    </div>
  );

  const LanguageSelector = () => (
    <div className="absolute top-4 right-4">
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="border rounded-lg px-2 py-1"
      >
        <option value="english">English</option>
        <option value="hindi">हिंदी</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto p-4">
        <LanguageSelector />

        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Shift handover in 30 minutes
          </AlertDescription>
        </Alert>

        {currentSection === 'status' && <StatusCheck />}
        {currentSection === 'report' && <QuickReport />}
        {currentSection === 'summary' && <ShiftSummary />}

        <Navigation />
        <EmergencyAlert />
      </div>
    </div>
  );
}

export default ShiftHandover;