import Header from "./Patient_Packet_components/Header.jsx"
import NumPacketDone from "./Patient_Packet_components/NumPacketDone.jsx"
import PacketList from "./Patient_Packet_components/PacketList.jsx"
import Profile from "./Patient_Packet_components/Profile.jsx"

function Patient() {
  return(
    <div className="patient_packets_background">
      {/* <Header/> */}
      <div className="profile-box">
        <Profile/>
      </div>
      <PacketList/>
    </div>
  );
}

export default Patient;
