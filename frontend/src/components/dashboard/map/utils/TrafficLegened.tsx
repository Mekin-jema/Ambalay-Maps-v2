// Traffic Jam Legend component
const jamStyles = "w-[18px] h-[18px] inline-block mr-[8px]"; // Fixed typo 'inline-bloack' to 'inline-block'

const TrafficLegend = () => (
  <div className="absolute bottom-0 right-[600px] bg-white p-[10px] rounded-[5px] shadow-[0_0_15px_rgba(0,_0,_0,_0.2)]">
    <h4>Jam Factor</h4>
    <div className={`bg-[#2ECC40] ${jamStyles}`}>0-3: Low Congestion</div>
    <div className={`bg-[#FF851B] ${jamStyles}`}>4-7: Moderate Congestion</div>
    <div className={`bg-[#FF4136] ${jamStyles}`}>8-10: High Congestion</div>
  </div>
);

export default TrafficLegend;
