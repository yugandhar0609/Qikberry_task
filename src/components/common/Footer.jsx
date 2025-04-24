import Aurora from '../../styles/Aurora';
import logo from '../../assets/Qikberry logo.png';

const Footer = () => {
  return (
    <div className="relative py-4 overflow-hidden" style={{ minHeight: '200px' }}>
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ 
        transform: 'rotate(180deg)', 
        height: '250px',
        bottom: '-50px'
      }}>
        <Aurora 
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.7}
          amplitude={1.5}
          speed={0.5}
        />
      </div>
      <div className="text-center text-white relative z-10 pt-4">
        <img src={logo} alt="Qikberry Logo" className="h-10 mx-auto mb-4" />
        <p className="text-sm text-black opacity-80">
          © {new Date().getFullYear()} Developed by{' '}
          <a href="https://github.com/yugandhar0609" className="text-black hover:text-blue-700">
            yugandhar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer; 