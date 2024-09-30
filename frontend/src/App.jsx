import { PieCharts } from "./components/PieChart";
import { PieChart2 } from "./components/PieChart2";
import Navbar from "./components/Navbar";
import { BarCharts } from "./components/BarChart";
import { LineCharts } from "./components/LineChart";

function App() {
  return (
    <div>
      <Navbar />
      <div className="text-3xl font-bold text-black p-10">Dashboard</div>
      <div className="h-fit flex flex-col sm:flex-row items-center justify-evenly p-10 gap-5 mt-20">
        <PieCharts />
        <PieChart2 />
      </div>
      <div className="p-32">
        <BarCharts/>
      </div>
      <div className="p-10">
        <LineCharts/>
      </div>
    </div>
  );
}

export default App;
