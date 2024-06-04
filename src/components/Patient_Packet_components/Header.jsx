import treatlie from "./../../../public/treatlie.svg"
function Header() {
  return (
    <div className="logo_patient_packets">
      <img className='treatlie' src={treatlie}></img>
    </div>
  );
}

export default Header;