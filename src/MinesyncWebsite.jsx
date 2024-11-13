import React from 'react';

const MinesyncWebsite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">MineSync</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/shift-handover" className="hover:underline">Shift Handover & Safety</a></li>
              <li><a href="/user-management" className="hover:underline">User Management</a></li>
              <li><a href="/reporting-analytics" className="hover:underline">Reporting & Analytics</a></li>
              <li><a href="/erp-integration" className="hover:underline">ERP Integration</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-12 px-8">
        <section className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">Streamline Your Mining Operations</h2>
          <p className="text-lg text-gray-600 mb-12">
            MineSync is the ultimate solution for efficient and safe coal mining operations.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Module Cards */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Shift Handover & Safety Management</h3>
              <p className="text-gray-700 mb-4">
                Streamline shift logs and safety protocols with digital tools.
              </p>
              <a href="/shift-handover" className="text-blue-500 hover:underline">Learn More</a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-600">User Management & Access Control</h3>
              <p className="text-gray-700 mb-4">
                Secure authentication and role-based access for all personnel.
              </p>
              <a href="/user-management" className="text-green-500 hover:underline">Learn More</a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Reporting & Analytics</h3>
              <p className="text-gray-700 mb-4">
                In-depth insights into shift efficiency and safety data.
              </p>
              <a href="/reporting-analytics" className="text-purple-500 hover:underline">Learn More</a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-red-600">ERP Integration & Data Security</h3>
              <p className="text-gray-700 mb-4">
                Seamless ERP integration with top-notch data encryption.
              </p>
              <a href="/erp-integration" className="text-red-500 hover:underline">Learn More</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8">
        <div className="flex justify-between items-center">
          <p className="font-light">&copy; 2023 MineSync</p>
          <div>
            <a href="#" className="mr-4 hover:underline">Contact Us</a>
            <a href="https://github.com/example/mine-sync" className="mr-4 hover:underline">GitHub</a>
            <a href="#" className="hover:underline">DGMS Resources</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinesyncWebsite;