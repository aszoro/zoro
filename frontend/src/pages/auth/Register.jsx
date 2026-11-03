// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import api from '../../api/axios';
// // // // // // import { useNavigate, Link, useLocation } from 'react-router-dom';

// // // // // // const Register = () => {
// // // // // //     const navigate = useNavigate();
// // // // // //     const location = useLocation();
    
// // // // // //     // UPI hata diya gaya hai
// // // // // //     const [formData, setFormData] = useState({
// // // // // //         sponsorId: '', 
// // // // // //         name: '',
// // // // // //         email: '',
// // // // // //         mobile: '',
// // // // // //         password: '',
// // // // // //         agreeTerms: false
// // // // // //     });
    
// // // // // //     const [loading, setLoading] = useState(false);
// // // // // //     const [error, setError] = useState('');
    
// // // // // //     // Modal State
// // // // // //     const [showModal, setShowModal] = useState(false);
// // // // // //     const [modalData, setModalData] = useState(null);

// // // // // //     // URL se Referral (ref) ID fetch karne ke liye
// // // // // //     useEffect(() => {
// // // // // //         const params = new URLSearchParams(location.search);
// // // // // //         const ref = params.get('ref');
// // // // // //         if (ref) {
// // // // // //             setFormData(prev => ({ ...prev, sponsorId: ref }));
// // // // // //         }
// // // // // //     }, [location]);

// // // // // //     const handleChange = (e) => {
// // // // // //         const { name, value, type, checked } = e.target;
// // // // // //         setFormData({
// // // // // //             ...formData,
// // // // // //             [name]: type === 'checkbox' ? checked : value
// // // // // //         });
// // // // // //     };

// // // // // //     const handleSubmit = async (e) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!formData.agreeTerms) {
// // // // // //             setError("Please agree to the terms of service.");
// // // // // //             return;
// // // // // //         }

// // // // // //         setLoading(true);
// // // // // //         setError('');
        
// // // // // //         try {
// // // // // // const res = await api.post('/auth/register', formData);
            
// // // // // //             // Success Modal Data Set karna
// // // // // //             const today = new Date();
// // // // // //             const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            
// // // // // //             setModalData({
// // // // // //                 name: formData.name,
// // // // // //                 email: formData.email,
// // // // // //                 password: formData.password,
// // // // // //                 userId: res.data.userId,
// // // // // //                 trxPassword: res.data.transactionPassword || 'Check Email', // Backend se aayega
// // // // // //                 date: formattedDate
// // // // // //             });

// // // // // //             setLoading(false);
// // // // // //             setShowModal(true); // Modal open karo
            
// // // // // //         } catch (err) {
// // // // // //             setError(err.response?.data?.message || "Registration failed. Check backend connection.");
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     };

// // // // // //     // --- MAIN UI STYLES ---
// // // // // //     const containerStyle = {
// // // // // //         minHeight: '100vh',
// // // // // //         display: 'flex',
// // // // // //         justifyContent: 'center',
// // // // // //         alignItems: 'center',
// // // // // //         background: 'url("/background.jpg") no-repeat center center fixed', 
// // // // // //         backgroundSize: 'cover',
// // // // // //         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // // // // //         padding: '20px'
// // // // // //     };

// // // // // //     const registerBoxStyle = {
// // // // // //         background: 'rgba(50, 50, 50, 0.75)', 
// // // // // //         backdropFilter: 'blur(10px)',
// // // // // //         WebkitBackdropFilter: 'blur(10px)',
// // // // // //         borderRadius: '20px', 
// // // // // //         width: '100%',
// // // // // //         maxWidth: '450px', 
// // // // // //         boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
// // // // // //         overflow: 'hidden', 
// // // // // //         position: 'relative',
// // // // // //         border: '1px solid rgba(255,255,255,0.1)'
// // // // // //     };

// // // // // //     const topHeader = {
// // // // // //         width: '100%',
// // // // // //         height: '100px',
// // // // // //         background: 'linear-gradient(135deg, rgba(0, 180, 219, 0.8) 0%, rgba(0, 131, 176, 0.8) 100%)',
// // // // // //         clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
// // // // // //         position: 'absolute',
// // // // // //         top: 0,
// // // // // //         left: 0,
// // // // // //         zIndex: 0
// // // // // //     };

// // // // // //     const contentWrapper = {
// // // // // //         position: 'relative',
// // // // // //         zIndex: 1,
// // // // // //         padding: '30px 25px 25px 25px',
// // // // // //     };

// // // // // //     const inputGroupStyle = {
// // // // // //         position: 'relative',
// // // // // //         marginBottom: '20px',
// // // // // //     };

// // // // // //     const inputStyle = {
// // // // // //         width: '100%',
// // // // // //         background: 'transparent',
// // // // // //         border: 'none',
// // // // // //         borderBottom: '1px solid rgba(255, 255, 255, 0.5)', 
// // // // // //         padding: '8px 10px 5px 30px',
// // // // // //         color: 'white',
// // // // // //         fontSize: '15px',
// // // // // //         outline: 'none',
// // // // // //         boxSizing: 'border-box',
// // // // // //         transition: 'border-bottom 0.3s ease'
// // // // // //     };

// // // // // //     const iconStyle = {
// // // // // //         position: 'absolute',
// // // // // //         left: '0',
// // // // // //         top: '8px',
// // // // // //         color: '#03a9f4',
// // // // // //         fontSize: '16px'
// // // // // //     };

// // // // // //     const btnStyle = {
// // // // // //         width: '100%',
// // // // // //         background: 'linear-gradient(to right, #03a9f4, #0083b0)', 
// // // // // //         color: 'white',
// // // // // //         border: 'none',
// // // // // //         padding: '14px',
// // // // // //         fontSize: '16px',
// // // // // //         cursor: loading ? 'wait' : 'pointer',
// // // // // //         marginTop: '10px',
// // // // // //         opacity: loading ? 0.8 : 1,
// // // // // //         fontWeight: 'bold',
// // // // // //         borderRadius: '8px',
// // // // // //         letterSpacing: '1px',
// // // // // //         boxShadow: '0 5px 15px rgba(3, 169, 244, 0.4)'
// // // // // //     };

// // // // // //     // --- MODAL STYLES (MATCHING YOUR IMAGE) ---
// // // // // //     const modalOverlay = {
// // // // // //         position: 'fixed',
// // // // // //         top: 0, left: 0, right: 0, bottom: 0,
// // // // // //         backgroundColor: 'rgba(0, 0, 0, 0.8)',
// // // // // //         display: 'flex',
// // // // // //         justifyContent: 'center',
// // // // // //         alignItems: 'center',
// // // // // //         zIndex: 9999,
// // // // // //         padding: '20px'
// // // // // //     };

// // // // // //     const modalContent = {
// // // // // //         backgroundColor: '#0a0a0a', // Pure dark background
// // // // // //         borderRadius: '20px',
// // // // // //         padding: '30px 20px',
// // // // // //         width: '100%',
// // // // // //         maxWidth: '380px',
// // // // // //         position: 'relative',
// // // // // //         fontFamily: "'Segoe UI', Tahoma, sans-serif"
// // // // // //     };

// // // // // //     const successCircle = {
// // // // // //         width: '60px',
// // // // // //         height: '60px',
// // // // // //         backgroundColor: '#4ade80', // Green color
// // // // // //         borderRadius: '50%',
// // // // // //         display: 'flex',
// // // // // //         justifyContent: 'center',
// // // // // //         alignItems: 'center',
// // // // // //         margin: '0 auto 15px',
// // // // // //         color: 'black',
// // // // // //         fontSize: '30px',
// // // // // //         fontWeight: 'bold'
// // // // // //     };

// // // // // //     const detailsBox = {
// // // // // //         backgroundColor: '#171717', // Slightly lighter dark box
// // // // // //         borderRadius: '12px',
// // // // // //         padding: '15px',
// // // // // //         marginBottom: '20px'
// // // // // //     };

// // // // // //     const dataRow = {
// // // // // //         display: 'flex',
// // // // // //         justifyContent: 'space-between',
// // // // // //         padding: '10px 0',
// // // // // //         borderBottom: '1px dashed #333',
// // // // // //         fontSize: '14px'
// // // // // //     };

// // // // // //     const labelStyle = { color: '#a3a3a3' }; // Grey text
// // // // // //     const valueStyle = { color: '#ffffff', fontWeight: 'bold' }; // White text

// // // // // //     const loginBtn = {
// // // // // //         width: '100%',
// // // // // //         backgroundColor: '#3b82f6', // Blue button matching image
// // // // // //         color: 'white',
// // // // // //         border: 'none',
// // // // // //         padding: '12px',
// // // // // //         borderRadius: '10px',
// // // // // //         fontSize: '16px',
// // // // // //         fontWeight: 'bold',
// // // // // //         cursor: 'pointer',
// // // // // //         display: 'flex',
// // // // // //         justifyContent: 'center',
// // // // // //         alignItems: 'center',
// // // // // //         gap: '8px'
// // // // // //     };

// // // // // //     return (
// // // // // //         <div style={containerStyle}>
// // // // // //             <div style={registerBoxStyle}>
                
// // // // // //                 <div style={topHeader}></div>

// // // // // //                 <div style={contentWrapper}>
// // // // // //                     <div style={{ textAlign: 'center', marginBottom: '25px', marginTop: '10px' }}>
// // // // // //                         <img src="/logo.jpg" alt="World together" style={{ height: '55px', borderRadius: '8px', marginBottom: '10px' }} />
// // // // // //                         <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '20px', margin: 0 }}>Create An Account</h3>
// // // // // //                     </div>

// // // // // //                     {error && (
// // // // // //                         <div style={{ background: 'rgba(255, 60, 60, 0.2)', color: '#ffb3b3', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(255,0,0,0.3)', textAlign: 'center' }}>
// // // // // //                             ⚠️ {error}
// // // // // //                         </div>
// // // // // //                     )}

// // // // // //                     <form onSubmit={handleSubmit}>
                        
// // // // // //                         <div style={inputGroupStyle}>
// // // // // //                             <i className="fa fa-user-circle" style={iconStyle}></i>
// // // // // //                             <input type="text" name="sponsorId" value={formData.sponsorId} onChange={handleChange} placeholder="Sponsor ID *" required style={inputStyle} />
// // // // // //                         </div>

// // // // // //                         <div style={inputGroupStyle}>
// // // // // //                             <i className="fa fa-user" style={iconStyle}></i>
// // // // // //                             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={inputStyle} />
// // // // // //                         </div>

// // // // // //                         <div style={inputGroupStyle}>
// // // // // //                             <i className="fa fa-envelope" style={iconStyle}></i>
// // // // // //                             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id *" required style={inputStyle} />
// // // // // //                         </div>

// // // // // //                         <div style={inputGroupStyle}>
// // // // // //                             <i className="fa fa-phone" style={iconStyle}></i>
// // // // // //                             <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No. *" required style={inputStyle} />
// // // // // //                         </div>

// // // // // //                         <div style={inputGroupStyle}>
// // // // // //                             <i className="fa fa-lock" style={iconStyle}></i>
// // // // // //                             <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Set Login Password *" required style={inputStyle} />
// // // // // //                         </div>

// // // // // //                         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', marginTop: '15px' }}>
// // // // // //                             <input 
// // // // // //                                 type="checkbox" 
// // // // // //                                 name="agreeTerms" 
// // // // // //                                 id="terms" 
// // // // // //                                 checked={formData.agreeTerms}
// // // // // //                                 onChange={handleChange}
// // // // // //                                 style={{ cursor: 'pointer', width: '16px', height: '16px', marginRight: '10px' }} 
// // // // // //                             />
// // // // // //                             <label htmlFor="terms" style={{ color: '#e0e0e0', fontSize: '14px', cursor: 'pointer' }}>I agree to the terms of service</label>
// // // // // //                         </div>

// // // // // //                         <button type="submit" disabled={loading} style={btnStyle}>
// // // // // //                             {loading ? 'PROCESSING...' : 'REGISTER NOW'}
// // // // // //                         </button>
// // // // // //                     </form>

// // // // // //                     <p style={{ textAlign: 'center', marginTop: '25px', color: '#ccc', fontSize: '14px' }}>
// // // // // //                         Already have an account? <Link to="/login" style={{ color: '#03a9f4', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
// // // // // //                     </p>

// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* SUCCESS MODAL POPUP */}
// // // // // //             {showModal && modalData && (
// // // // // //                 <div style={modalOverlay}>
// // // // // //                     <div style={modalContent}>
// // // // // //                         <button 
// // // // // //                             onClick={() => navigate('/login')} 
// // // // // //                             style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer' }}>
// // // // // //                             ✕
// // // // // //                         </button>
                        
// // // // // //                         <div style={successCircle}>✓</div>
                        
// // // // // //                         <h2 style={{ color: '#0ea5e9', textAlign: 'center', fontSize: '22px', margin: '0 0 5px 0' }}>Registration Successful!</h2>
// // // // // //                         <p style={{ color: '#e5e5e5', textAlign: 'center', fontSize: '14px', margin: '0 0 20px 0' }}>Welcome to World together</p>

// // // // // //                         <div style={detailsBox}>
// // // // // //                             <div style={dataRow}>
// // // // // //                                 <span style={labelStyle}>Full Name:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.name}</span>
// // // // // //                             </div>
// // // // // //                             <div style={dataRow}>
// // // // // //                                 <span style={labelStyle}>User ID:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.userId}</span>
// // // // // //                             </div>
// // // // // //                             <div style={dataRow}>
// // // // // //                                 <span style={labelStyle}>Password:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.password}</span>
// // // // // //                             </div>
// // // // // //                             <div style={dataRow}>
// // // // // //                                 <span style={labelStyle}>Trx Password:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.trxPassword}</span>
// // // // // //                             </div>
// // // // // //                             <div style={dataRow}>
// // // // // //                                 <span style={labelStyle}>Date:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.date}</span>
// // // // // //                             </div>
// // // // // //                             <div style={{...dataRow, borderBottom: 'none'}}>
// // // // // //                                 <span style={labelStyle}>Email:</span> 
// // // // // //                                 <span style={valueStyle}>{modalData.email}</span>
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         <button onClick={() => navigate('/login')} style={loginBtn}>
// // // // // //                             ➜ Login to Your Account
// // // // // //                         </button>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default Register;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import api from '../../api/axios';
// // // // // import { useNavigate, Link, useLocation } from 'react-router-dom';

// // // // // // 🌍 Sabhi Countries ki List
// // // // // const countryList = [
// // // // //     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
// // // // //     "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
// // // // //     "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
// // // // //     "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
// // // // //     "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
// // // // //     "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
// // // // //     "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
// // // // //     "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
// // // // //     "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
// // // // //     "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
// // // // //     "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
// // // // //     "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
// // // // //     "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
// // // // //     "Yemen", "Zambia", "Zimbabwe"
// // // // // ];

// // // // // const Register = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const location = useLocation();
    
// // // // //     const [formData, setFormData] = useState({
// // // // //         sponsorId: '', 
// // // // //         name: '',
// // // // //         email: '',
// // // // //         mobile: '',
// // // // //         country: '',
// // // // //         walletAddress: '', // 🔥 USDT BEP20 Wallet Address add kiya gaya hai
// // // // //         password: '',
// // // // //         agreeTerms: false
// // // // //     });
    
// // // // //     const [loading, setLoading] = useState(false);
// // // // //     const [error, setError] = useState('');
    
// // // // //     // Modal State
// // // // //     const [showModal, setShowModal] = useState(false);
// // // // //     const [modalData, setModalData] = useState(null);

// // // // //     // Country Dropdown State
// // // // //     const [showCountryDropdown, setShowCountryDropdown] = useState(false);
// // // // //     const [searchCountry, setSearchCountry] = useState('');

// // // // //     useEffect(() => {
// // // // //         const params = new URLSearchParams(location.search);
// // // // //         const ref = params.get('ref');
// // // // //         if (ref) {
// // // // //             setFormData(prev => ({ ...prev, sponsorId: ref }));
// // // // //         }
// // // // //     }, [location]);

// // // // //     const handleChange = (e) => {
// // // // //         const { name, value, type, checked } = e.target;
// // // // //         setFormData({
// // // // //             ...formData,
// // // // //             [name]: type === 'checkbox' ? checked : value
// // // // //         });
// // // // //     };

// // // // //     const handleCountrySelect = (countryName) => {
// // // // //         setFormData({ ...formData, country: countryName });
// // // // //         setShowCountryDropdown(false);
// // // // //         setSearchCountry('');
// // // // //     };

// // // // //     const filteredCountries = countryList.filter(c => 
// // // // //         c.toLowerCase().includes(searchCountry.toLowerCase())
// // // // //     );

// // // // //     const handleSubmit = async (e) => {
// // // // //         e.preventDefault();
// // // // //         if (!formData.country) {
// // // // //             setError("Please select your country.");
// // // // //             return;
// // // // //         }
// // // // //         if (!formData.walletAddress) {
// // // // //             setError("USDT BEP-20 Wallet Address is required.");
// // // // //             return;
// // // // //         }
// // // // //         if (!formData.agreeTerms) {
// // // // //             setError("Please agree to the terms of service.");
// // // // //             return;
// // // // //         }

// // // // //         setLoading(true);
// // // // //         setError('');
        
// // // // //         try {
// // // // //             const res = await api.post('/auth/register', formData);
            
// // // // //             const today = new Date();
// // // // //             const formattedDate = today.toISOString().split('T')[0]; 
            
// // // // //             setModalData({
// // // // //                 name: formData.name,
// // // // //                 email: formData.email,
// // // // //                 password: formData.password,
// // // // //                 userId: res.data.userId,
// // // // //                 trxPassword: res.data.transactionPassword || 'Check Email', 
// // // // //                 date: formattedDate
// // // // //             });

// // // // //             setLoading(false);
// // // // //             setShowModal(true); 
            
// // // // //         } catch (err) {
// // // // //             setError(err.response?.data?.message || "Registration failed. Check backend connection.");
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     // --- MAIN UI STYLES ---
// // // // //     const containerStyle = {
// // // // //         minHeight: '100vh',
// // // // //         display: 'flex',
// // // // //         justifyContent: 'center',
// // // // //         alignItems: 'center',
// // // // //         background: 'url("/background.jpg") no-repeat center center fixed', 
// // // // //         backgroundSize: 'cover',
// // // // //         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // // // //         padding: '20px'
// // // // //     };

// // // // //     const registerBoxStyle = {
// // // // //         background: 'rgba(50, 50, 50, 0.75)', 
// // // // //         backdropFilter: 'blur(10px)',
// // // // //         WebkitBackdropFilter: 'blur(10px)',
// // // // //         borderRadius: '20px', 
// // // // //         width: '100%',
// // // // //         maxWidth: '450px', 
// // // // //         boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
// // // // //         overflow: 'hidden', 
// // // // //         position: 'relative',
// // // // //         border: '1px solid rgba(255,255,255,0.1)'
// // // // //     };

// // // // //     const topHeader = {
// // // // //         width: '100%',
// // // // //         height: '100px',
// // // // //         background: 'linear-gradient(135deg, rgba(0, 180, 219, 0.8) 0%, rgba(0, 131, 176, 0.8) 100%)',
// // // // //         clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
// // // // //         position: 'absolute',
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         zIndex: 0
// // // // //     };

// // // // //     const contentWrapper = {
// // // // //         position: 'relative',
// // // // //         zIndex: 1,
// // // // //         padding: '30px 25px 25px 25px',
// // // // //     };

// // // // //     const inputGroupStyle = {
// // // // //         position: 'relative',
// // // // //         marginBottom: '20px',
// // // // //     };

// // // // //     const inputStyle = {
// // // // //         width: '100%',
// // // // //         background: 'transparent',
// // // // //         border: 'none',
// // // // //         borderBottom: '1px solid rgba(255, 255, 255, 0.5)', 
// // // // //         padding: '8px 10px 5px 30px',
// // // // //         color: 'white',
// // // // //         fontSize: '15px',
// // // // //         outline: 'none',
// // // // //         boxSizing: 'border-box',
// // // // //         transition: 'border-bottom 0.3s ease'
// // // // //     };

// // // // //     const iconStyle = {
// // // // //         position: 'absolute',
// // // // //         left: '0',
// // // // //         top: '8px',
// // // // //         color: '#03a9f4',
// // // // //         fontSize: '16px'
// // // // //     };

// // // // //     const btnStyle = {
// // // // //         width: '100%',
// // // // //         background: 'linear-gradient(to right, #03a9f4, #0083b0)', 
// // // // //         color: 'white',
// // // // //         border: 'none',
// // // // //         padding: '14px',
// // // // //         fontSize: '16px',
// // // // //         cursor: loading ? 'wait' : 'pointer',
// // // // //         marginTop: '10px',
// // // // //         opacity: loading ? 0.8 : 1,
// // // // //         fontWeight: 'bold',
// // // // //         borderRadius: '8px',
// // // // //         letterSpacing: '1px',
// // // // //         boxShadow: '0 5px 15px rgba(3, 169, 244, 0.4)'
// // // // //     };

// // // // //     // --- MODAL STYLES ---
// // // // //     const modalOverlay = {
// // // // //         position: 'fixed',
// // // // //         top: 0, left: 0, right: 0, bottom: 0,
// // // // //         backgroundColor: 'rgba(0, 0, 0, 0.8)',
// // // // //         display: 'flex',
// // // // //         justifyContent: 'center',
// // // // //         alignItems: 'center',
// // // // //         zIndex: 9999,
// // // // //         padding: '20px'
// // // // //     };

// // // // //     const modalContent = {
// // // // //         backgroundColor: '#0a0a0a', 
// // // // //         borderRadius: '20px',
// // // // //         padding: '30px 20px',
// // // // //         width: '100%',
// // // // //         maxWidth: '380px',
// // // // //         position: 'relative',
// // // // //         fontFamily: "'Segoe UI', Tahoma, sans-serif"
// // // // //     };

// // // // //     const successCircle = {
// // // // //         width: '60px', height: '60px',
// // // // //         backgroundColor: '#4ade80', 
// // // // //         borderRadius: '50%',
// // // // //         display: 'flex', justifyContent: 'center', alignItems: 'center',
// // // // //         margin: '0 auto 15px', color: 'black', fontSize: '30px', fontWeight: 'bold'
// // // // //     };

// // // // //     const detailsBox = {
// // // // //         backgroundColor: '#171717', borderRadius: '12px', padding: '15px', marginBottom: '20px'
// // // // //     };

// // // // //     const dataRow = {
// // // // //         display: 'flex', justifyContent: 'space-between', padding: '10px 0',
// // // // //         borderBottom: '1px dashed #333', fontSize: '14px'
// // // // //     };

// // // // //     const labelStyle = { color: '#a3a3a3' }; 
// // // // //     const valueStyle = { color: '#ffffff', fontWeight: 'bold' }; 

// // // // //     const loginBtn = {
// // // // //         width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none',
// // // // //         padding: '12px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
// // // // //         cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
// // // // //     };

// // // // //     return (
// // // // //         <div style={containerStyle}>
// // // // //             <div style={registerBoxStyle}>
                
// // // // //                 <div style={topHeader}></div>

// // // // //                 <div style={contentWrapper}>
// // // // //                     <div style={{ textAlign: 'center', marginBottom: '25px', marginTop: '10px' }}>
// // // // //                         <img src="/logo.jpg" alt="World together" style={{ height: '55px', borderRadius: '8px', marginBottom: '10px' }} />
// // // // //                         <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '20px', margin: 0 }}>Create An Account</h3>
// // // // //                     </div>

// // // // //                     {error && (
// // // // //                         <div style={{ background: 'rgba(255, 60, 60, 0.2)', color: '#ffb3b3', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(255,0,0,0.3)', textAlign: 'center' }}>
// // // // //                             ⚠️ {error}
// // // // //                         </div>
// // // // //                     )}

// // // // //                     <form onSubmit={handleSubmit}>
                        
// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-user-circle" style={iconStyle}></i>
// // // // //                             <input type="text" name="sponsorId" value={formData.sponsorId} onChange={handleChange} placeholder="Sponsor ID *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-user" style={iconStyle}></i>
// // // // //                             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         {/* COUNTRY DROPDOWN (SEARCHABLE) */}
// // // // //                         <div style={{...inputGroupStyle, zIndex: 10}}>
// // // // //                             <i className="fa fa-globe" style={iconStyle}></i>
// // // // //                             <div 
// // // // //                                 onClick={() => setShowCountryDropdown(!showCountryDropdown)}
// // // // //                                 style={{
// // // // //                                     ...inputStyle, 
// // // // //                                     cursor: 'pointer', 
// // // // //                                     color: formData.country ? 'white' : 'rgba(255, 255, 255, 0.7)'
// // // // //                                 }}
// // // // //                             >
// // // // //                                 {formData.country || "Select Country *"}
// // // // //                             </div>

// // // // //                             {/* Dropdown Box */}
// // // // //                             {showCountryDropdown && (
// // // // //                                 <div style={{
// // // // //                                     position: 'absolute', top: '100%', left: 0, width: '100%',
// // // // //                                     background: '#1a1a1a', borderRadius: '8px', border: '1px solid #444',
// // // // //                                     boxShadow: '0 5px 15px rgba(0,0,0,0.5)', marginTop: '5px', overflow: 'hidden'
// // // // //                                 }}>
// // // // //                                     <input 
// // // // //                                         type="text" 
// // // // //                                         placeholder="Search your country..." 
// // // // //                                         value={searchCountry}
// // // // //                                         onChange={(e) => setSearchCountry(e.target.value)}
// // // // //                                         style={{
// // // // //                                             width: '100%', padding: '10px', background: '#222', border: 'none',
// // // // //                                             borderBottom: '1px solid #444', color: 'white', outline: 'none'
// // // // //                                         }}
// // // // //                                         autoFocus
// // // // //                                     />
// // // // //                                     <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
// // // // //                                         {filteredCountries.length > 0 ? filteredCountries.map((c, i) => (
// // // // //                                             <div 
// // // // //                                                 key={i} 
// // // // //                                                 onClick={() => handleCountrySelect(c)}
// // // // //                                                 onMouseOver={(e) => e.target.style.background = '#03a9f4'}
// // // // //                                                 onMouseOut={(e) => e.target.style.background = 'transparent'}
// // // // //                                                 style={{
// // // // //                                                     padding: '10px 15px', color: 'white', cursor: 'pointer', 
// // // // //                                                     borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s'
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 {c}
// // // // //                                             </div>
// // // // //                                         )) : (
// // // // //                                             <div style={{ padding: '10px 15px', color: '#999' }}>No country found</div>
// // // // //                                         )}
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>

// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-envelope" style={iconStyle}></i>
// // // // //                             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-phone" style={iconStyle}></i>
// // // // //                             <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No. *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         {/* 🔥 USDT BEP20 WALLET ADDRESS INPUT */}
// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-wallet" style={iconStyle}></i>
// // // // //                             <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleChange} placeholder="USDT (BEP-20) Wallet Address *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         <div style={inputGroupStyle}>
// // // // //                             <i className="fa fa-lock" style={iconStyle}></i>
// // // // //                             <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Set Login Password *" required style={inputStyle} />
// // // // //                         </div>

// // // // //                         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', marginTop: '15px' }}>
// // // // //                             <input 
// // // // //                                 type="checkbox" 
// // // // //                                 name="agreeTerms" 
// // // // //                                 id="terms" 
// // // // //                                 checked={formData.agreeTerms}
// // // // //                                 onChange={handleChange}
// // // // //                                 style={{ cursor: 'pointer', width: '16px', height: '16px', marginRight: '10px' }} 
// // // // //                             />
// // // // //                             <label htmlFor="terms" style={{ color: '#e0e0e0', fontSize: '14px', cursor: 'pointer' }}>I agree to the terms of service</label>
// // // // //                         </div>

// // // // //                         <button type="submit" disabled={loading} style={btnStyle}>
// // // // //                             {loading ? 'PROCESSING...' : 'REGISTER NOW'}
// // // // //                         </button>
// // // // //                     </form>

// // // // //                     <p style={{ textAlign: 'center', marginTop: '25px', color: '#ccc', fontSize: '14px' }}>
// // // // //                         Already have an account? <Link to="/login" style={{ color: '#03a9f4', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
// // // // //                     </p>

// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* SUCCESS MODAL POPUP */}
// // // // //             {showModal && modalData && (
// // // // //                 <div style={modalOverlay}>
// // // // //                     <div style={modalContent}>
// // // // //                         <button 
// // // // //                             onClick={() => navigate('/login')} 
// // // // //                             style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer' }}>
// // // // //                             ✕
// // // // //                         </button>
                        
// // // // //                         <div style={successCircle}>✓</div>
                        
// // // // //                         <h2 style={{ color: '#0ea5e9', textAlign: 'center', fontSize: '22px', margin: '0 0 5px 0' }}>Registration Successful!</h2>
// // // // //                         <p style={{ color: '#e5e5e5', textAlign: 'center', fontSize: '14px', margin: '0 0 20px 0' }}>Welcome to World together</p>

// // // // //                         <div style={detailsBox}>
// // // // //                             <div style={dataRow}>
// // // // //                                 <span style={labelStyle}>Full Name:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.name}</span>
// // // // //                             </div>
// // // // //                             <div style={dataRow}>
// // // // //                                 <span style={labelStyle}>User ID:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.userId}</span>
// // // // //                             </div>
// // // // //                             <div style={dataRow}>
// // // // //                                 <span style={labelStyle}>Password:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.password}</span>
// // // // //                             </div>
// // // // //                             <div style={dataRow}>
// // // // //                                 <span style={labelStyle}>Trx Password:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.trxPassword}</span>
// // // // //                             </div>
// // // // //                             <div style={dataRow}>
// // // // //                                 <span style={labelStyle}>Date:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.date}</span>
// // // // //                             </div>
// // // // //                             <div style={{...dataRow, borderBottom: 'none'}}>
// // // // //                                 <span style={labelStyle}>Email:</span> 
// // // // //                                 <span style={valueStyle}>{modalData.email}</span>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <button onClick={() => navigate('/login')} style={loginBtn}>
// // // // //                             ➜ Login to Your Account
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Register;














// // // // import React, { useState, useEffect } from 'react';
// // // // import api from '../../api/axios';
// // // // import { useNavigate, Link, useLocation } from 'react-router-dom';

// // // // // 🌍 Sabhi Countries ki List
// // // // const countryList = [
// // // //     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
// // // //     "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
// // // //     "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
// // // //     "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
// // // //     "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
// // // //     "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
// // // //     "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
// // // //     "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
// // // //     "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
// // // //     "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
// // // //     "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
// // // //     "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
// // // //     "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
// // // //     "Yemen", "Zambia", "Zimbabwe"
// // // // ];

// // // // const Register = () => {
// // // //     const navigate = useNavigate();
// // // //     const location = useLocation();
    
// // // //     const [formData, setFormData] = useState({
// // // //         sponsorId: '', 
// // // //         name: '',
// // // //         email: '',
// // // //         mobile: '',
// // // //         country: '',
// // // //         walletAddress: '', 
// // // //         password: '',
// // // //         agreeTerms: false
// // // //     });
    
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [error, setError] = useState('');
    
// // // //     // 🔥 NAYE STATES FOR SPONSOR NAME
// // // //     const [sponsorName, setSponsorName] = useState('');
// // // //     const [checkingSponsor, setCheckingSponsor] = useState(false);

// // // //     // Modal State
// // // //     const [showModal, setShowModal] = useState(false);
// // // //     const [modalData, setModalData] = useState(null);

// // // //     // Country Dropdown State
// // // //     const [showCountryDropdown, setShowCountryDropdown] = useState(false);
// // // //     const [searchCountry, setSearchCountry] = useState('');

// // // //     useEffect(() => {
// // // //         const params = new URLSearchParams(location.search);
// // // //         const ref = params.get('ref');
// // // //         if (ref) {
// // // //             setFormData(prev => ({ ...prev, sponsorId: ref }));
// // // //         }
// // // //     }, [location]);

// // // //     // 🔥 LIVE SPONSOR CHECK LOGIC (With Debounce to save API calls)
// // // //     useEffect(() => {
// // // //         const checkSponsor = async () => {
// // // //             if (formData.sponsorId && formData.sponsorId.length >= 5) {
// // // //                 setCheckingSponsor(true);
// // // //                 try {
// // // //                     // Yahan /auth/check-sponsor call ho raha hai
// // // //                     const res = await api.get(`/auth/check-sponsor/${formData.sponsorId}`);
// // // //                     setSponsorName(res.data.name);
// // // //                 } catch (err) {
// // // //                     setSponsorName('❌ Invalid Sponsor ID');
// // // //                 } finally {
// // // //                     setCheckingSponsor(false);
// // // //                 }
// // // //             } else {
// // // //                 setSponsorName('');
// // // //             }
// // // //         };

// // // //         const timeoutId = setTimeout(() => {
// // // //             checkSponsor();
// // // //         }, 500); // User ke type karne ke 0.5 sec baad API call hogi

// // // //         return () => clearTimeout(timeoutId);
// // // //     }, [formData.sponsorId]);

// // // //     const handleChange = (e) => {
// // // //         const { name, value, type, checked } = e.target;
// // // //         setFormData({
// // // //             ...formData,
// // // //             [name]: type === 'checkbox' ? checked : value
// // // //         });
// // // //     };

// // // //     const handleCountrySelect = (countryName) => {
// // // //         setFormData({ ...formData, country: countryName });
// // // //         setShowCountryDropdown(false);
// // // //         setSearchCountry('');
// // // //     };

// // // //     const filteredCountries = countryList.filter(c => 
// // // //         c.toLowerCase().includes(searchCountry.toLowerCase())
// // // //     );

// // // //     const handleSubmit = async (e) => {
// // // //         e.preventDefault();
        
// // // //         if (sponsorName.includes('❌')) {
// // // //             setError("Please enter a valid Sponsor ID.");
// // // //             return;
// // // //         }
// // // //         if (!formData.country) {
// // // //             setError("Please select your country.");
// // // //             return;
// // // //         }
// // // //         if (!formData.walletAddress) {
// // // //             setError("USDT BEP-20 Wallet Address is required.");
// // // //             return;
// // // //         }
// // // //         if (!formData.agreeTerms) {
// // // //             setError("Please agree to the terms of service.");
// // // //             return;
// // // //         }

// // // //         setLoading(true);
// // // //         setError('');
        
// // // //         try {
// // // //             const res = await api.post('/auth/register', formData);
            
// // // //             const today = new Date();
// // // //             const formattedDate = today.toISOString().split('T')[0]; 
            
// // // //             setModalData({
// // // //                 name: formData.name,
// // // //                 email: formData.email,
// // // //                 password: formData.password,
// // // //                 userId: res.data.userId,
// // // //                 trxPassword: res.data.transactionPassword || 'Check Email', 
// // // //                 date: formattedDate
// // // //             });

// // // //             setLoading(false);
// // // //             setShowModal(true); 
            
// // // //         } catch (err) {
// // // //             setError(err.response?.data?.message || "Registration failed. Check backend connection.");
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     // --- MAIN UI STYLES ---
// // // //     const containerStyle = {
// // // //         minHeight: '100vh',
// // // //         display: 'flex',
// // // //         justifyContent: 'center',
// // // //         alignItems: 'center',
// // // //         background: 'url("/background.jpg") no-repeat center center fixed', 
// // // //         backgroundSize: 'cover',
// // // //         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // // //         padding: '20px'
// // // //     };

// // // //     const registerBoxStyle = {
// // // //         background: 'rgba(50, 50, 50, 0.75)', 
// // // //         backdropFilter: 'blur(10px)',
// // // //         WebkitBackdropFilter: 'blur(10px)',
// // // //         borderRadius: '20px', 
// // // //         width: '100%',
// // // //         maxWidth: '450px', 
// // // //         boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
// // // //         overflow: 'hidden', 
// // // //         position: 'relative',
// // // //         border: '1px solid rgba(255,255,255,0.1)'
// // // //     };

// // // //     const topHeader = {
// // // //         width: '100%',
// // // //         height: '100px',
// // // //         background: 'linear-gradient(135deg, rgba(0, 180, 219, 0.8) 0%, rgba(0, 131, 176, 0.8) 100%)',
// // // //         clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
// // // //         position: 'absolute',
// // // //         top: 0,
// // // //         left: 0,
// // // //         zIndex: 0
// // // //     };

// // // //     const contentWrapper = {
// // // //         position: 'relative',
// // // //         zIndex: 1,
// // // //         padding: '30px 25px 25px 25px',
// // // //     };

// // // //     const inputGroupStyle = {
// // // //         position: 'relative',
// // // //         marginBottom: '20px',
// // // //     };

// // // //     const inputStyle = {
// // // //         width: '100%',
// // // //         background: 'transparent',
// // // //         border: 'none',
// // // //         borderBottom: '1px solid rgba(255, 255, 255, 0.5)', 
// // // //         padding: '8px 10px 5px 30px',
// // // //         color: 'white',
// // // //         fontSize: '15px',
// // // //         outline: 'none',
// // // //         boxSizing: 'border-box',
// // // //         transition: 'border-bottom 0.3s ease'
// // // //     };

// // // //     const iconStyle = {
// // // //         position: 'absolute',
// // // //         left: '0',
// // // //         top: '8px',
// // // //         color: '#03a9f4',
// // // //         fontSize: '16px'
// // // //     };

// // // //     const btnStyle = {
// // // //         width: '100%',
// // // //         background: 'linear-gradient(to right, #03a9f4, #0083b0)', 
// // // //         color: 'white',
// // // //         border: 'none',
// // // //         padding: '14px',
// // // //         fontSize: '16px',
// // // //         cursor: loading ? 'wait' : 'pointer',
// // // //         marginTop: '10px',
// // // //         opacity: loading ? 0.8 : 1,
// // // //         fontWeight: 'bold',
// // // //         borderRadius: '8px',
// // // //         letterSpacing: '1px',
// // // //         boxShadow: '0 5px 15px rgba(3, 169, 244, 0.4)'
// // // //     };

// // // //     // --- MODAL STYLES ---
// // // //     const modalOverlay = {
// // // //         position: 'fixed',
// // // //         top: 0, left: 0, right: 0, bottom: 0,
// // // //         backgroundColor: 'rgba(0, 0, 0, 0.8)',
// // // //         display: 'flex',
// // // //         justifyContent: 'center',
// // // //         alignItems: 'center',
// // // //         zIndex: 9999,
// // // //         padding: '20px'
// // // //     };

// // // //     const modalContent = {
// // // //         backgroundColor: '#0a0a0a', 
// // // //         borderRadius: '20px',
// // // //         padding: '30px 20px',
// // // //         width: '100%',
// // // //         maxWidth: '380px',
// // // //         position: 'relative',
// // // //         fontFamily: "'Segoe UI', Tahoma, sans-serif"
// // // //     };

// // // //     const successCircle = {
// // // //         width: '60px', height: '60px',
// // // //         backgroundColor: '#4ade80', 
// // // //         borderRadius: '50%',
// // // //         display: 'flex', justifyContent: 'center', alignItems: 'center',
// // // //         margin: '0 auto 15px', color: 'black', fontSize: '30px', fontWeight: 'bold'
// // // //     };

// // // //     const detailsBox = {
// // // //         backgroundColor: '#171717', borderRadius: '12px', padding: '15px', marginBottom: '20px'
// // // //     };

// // // //     const dataRow = {
// // // //         display: 'flex', justifyContent: 'space-between', padding: '10px 0',
// // // //         borderBottom: '1px dashed #333', fontSize: '14px'
// // // //     };

// // // //     const labelStyle = { color: '#a3a3a3' }; 
// // // //     const valueStyle = { color: '#ffffff', fontWeight: 'bold' }; 

// // // //     const loginBtn = {
// // // //         width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none',
// // // //         padding: '12px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
// // // //         cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
// // // //     };

// // // //     return (
// // // //         <div style={containerStyle}>
// // // //             <div style={registerBoxStyle}>
                
// // // //                 <div style={topHeader}></div>

// // // //                 <div style={contentWrapper}>
// // // //                     <div style={{ textAlign: 'center', marginBottom: '25px', marginTop: '10px' }}>
// // // //                         <img src="/logo.jpg" alt="World together" style={{ height: '55px', borderRadius: '8px', marginBottom: '10px' }} />
// // // //                         <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '20px', margin: 0 }}>Create An Account</h3>
// // // //                     </div>

// // // //                     {error && (
// // // //                         <div style={{ background: 'rgba(255, 60, 60, 0.2)', color: '#ffb3b3', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(255,0,0,0.3)', textAlign: 'center' }}>
// // // //                             ⚠️ {error}
// // // //                         </div>
// // // //                     )}

// // // //                     <form onSubmit={handleSubmit}>
                        
// // // //                         {/* SPONSOR ID FIELD */}
// // // //                         <div style={{...inputGroupStyle, marginBottom: sponsorName ? '5px' : '20px'}}>
// // // //                             <i className="fa fa-user-circle" style={iconStyle}></i>
// // // //                             <input type="text" name="sponsorId" value={formData.sponsorId} onChange={handleChange} placeholder="Sponsor ID *" required style={inputStyle} />
// // // //                         </div>

// // // //                         {/* 🔥 LIVE SPONSOR NAME DISPLAY HERE */}
// // // //                         {formData.sponsorId && sponsorName && (
// // // //                             <div style={{ 
// // // //                                 color: sponsorName.includes('❌') ? '#ff4d4d' : '#4ade80', 
// // // //                                 fontSize: '13px', 
// // // //                                 marginBottom: '20px', 
// // // //                                 paddingLeft: '30px', 
// // // //                                 fontWeight: 'bold' 
// // // //                             }}>
// // // //                                 {checkingSponsor ? '⏳ Checking...' : (sponsorName.includes('❌') ? sponsorName : `✅ Sponsor: ${sponsorName}`)}
// // // //                             </div>
// // // //                         )}

// // // //                         <div style={inputGroupStyle}>
// // // //                             <i className="fa fa-user" style={iconStyle}></i>
// // // //                             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={inputStyle} />
// // // //                         </div>

// // // //                         {/* COUNTRY DROPDOWN (SEARCHABLE) */}
// // // //                         <div style={{...inputGroupStyle, zIndex: 10}}>
// // // //                             <i className="fa fa-globe" style={iconStyle}></i>
// // // //                             <div 
// // // //                                 onClick={() => setShowCountryDropdown(!showCountryDropdown)}
// // // //                                 style={{
// // // //                                     ...inputStyle, 
// // // //                                     cursor: 'pointer', 
// // // //                                     color: formData.country ? 'white' : 'rgba(255, 255, 255, 0.7)'
// // // //                                 }}
// // // //                             >
// // // //                                 {formData.country || "Select Country *"}
// // // //                             </div>

// // // //                             {/* Dropdown Box */}
// // // //                             {showCountryDropdown && (
// // // //                                 <div style={{
// // // //                                     position: 'absolute', top: '100%', left: 0, width: '100%',
// // // //                                     background: '#1a1a1a', borderRadius: '8px', border: '1px solid #444',
// // // //                                     boxShadow: '0 5px 15px rgba(0,0,0,0.5)', marginTop: '5px', overflow: 'hidden'
// // // //                                 }}>
// // // //                                     <input 
// // // //                                         type="text" 
// // // //                                         placeholder="Search your country..." 
// // // //                                         value={searchCountry}
// // // //                                         onChange={(e) => setSearchCountry(e.target.value)}
// // // //                                         style={{
// // // //                                             width: '100%', padding: '10px', background: '#222', border: 'none',
// // // //                                             borderBottom: '1px solid #444', color: 'white', outline: 'none'
// // // //                                         }}
// // // //                                         autoFocus
// // // //                                     />
// // // //                                     <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
// // // //                                         {filteredCountries.length > 0 ? filteredCountries.map((c, i) => (
// // // //                                             <div 
// // // //                                                 key={i} 
// // // //                                                 onClick={() => handleCountrySelect(c)}
// // // //                                                 onMouseOver={(e) => e.target.style.background = '#03a9f4'}
// // // //                                                 onMouseOut={(e) => e.target.style.background = 'transparent'}
// // // //                                                 style={{
// // // //                                                     padding: '10px 15px', color: 'white', cursor: 'pointer', 
// // // //                                                     borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s'
// // // //                                                 }}
// // // //                                             >
// // // //                                                 {c}
// // // //                                             </div>
// // // //                                         )) : (
// // // //                                             <div style={{ padding: '10px 15px', color: '#999' }}>No country found</div>
// // // //                                         )}
// // // //                                     </div>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>

// // // //                         <div style={inputGroupStyle}>
// // // //                             <i className="fa fa-envelope" style={iconStyle}></i>
// // // //                             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id *" required style={inputStyle} />
// // // //                         </div>

// // // //                         <div style={inputGroupStyle}>
// // // //                             <i className="fa fa-phone" style={iconStyle}></i>
// // // //                             <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No. *" required style={inputStyle} />
// // // //                         </div>

// // // //                         {/* 🔥 USDT BEP20 WALLET ADDRESS INPUT */}
// // // //                         <div style={inputGroupStyle}>
// // // //                             <i className="fa fa-wallet" style={iconStyle}></i>
// // // //                             <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleChange} placeholder="USDT (BEP-20) Wallet Address *" required style={inputStyle} />
// // // //                         </div>

// // // //                         <div style={inputGroupStyle}>
// // // //                             <i className="fa fa-lock" style={iconStyle}></i>
// // // //                             <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Set Login Password *" required style={inputStyle} />
// // // //                         </div>

// // // //                         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', marginTop: '15px' }}>
// // // //                             <input 
// // // //                                 type="checkbox" 
// // // //                                 name="agreeTerms" 
// // // //                                 id="terms" 
// // // //                                 checked={formData.agreeTerms}
// // // //                                 onChange={handleChange}
// // // //                                 style={{ cursor: 'pointer', width: '16px', height: '16px', marginRight: '10px' }} 
// // // //                             />
// // // //                             <label htmlFor="terms" style={{ color: '#e0e0e0', fontSize: '14px', cursor: 'pointer' }}>I agree to the terms of service</label>
// // // //                         </div>

// // // //                         <button type="submit" disabled={loading || sponsorName.includes('❌')} style={btnStyle}>
// // // //                             {loading ? 'PROCESSING...' : 'REGISTER NOW'}
// // // //                         </button>
// // // //                     </form>

// // // //                     <p style={{ textAlign: 'center', marginTop: '25px', color: '#ccc', fontSize: '14px' }}>
// // // //                         Already have an account? <Link to="/login" style={{ color: '#03a9f4', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
// // // //                     </p>

// // // //                 </div>
// // // //             </div>

// // // //             {/* SUCCESS MODAL POPUP */}
// // // //             {showModal && modalData && (
// // // //                 <div style={modalOverlay}>
// // // //                     <div style={modalContent}>
// // // //                         <button 
// // // //                             onClick={() => navigate('/login')} 
// // // //                             style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#666', fontSize: '20px', cursor: 'pointer' }}>
// // // //                             ✕
// // // //                         </button>
                        
// // // //                         <div style={successCircle}>✓</div>
                        
// // // //                         <h2 style={{ color: '#0ea5e9', textAlign: 'center', fontSize: '22px', margin: '0 0 5px 0' }}>Registration Successful!</h2>
// // // //                         <p style={{ color: '#e5e5e5', textAlign: 'center', fontSize: '14px', margin: '0 0 20px 0' }}>Welcome to World together</p>

// // // //                         <div style={detailsBox}>
// // // //                             <div style={dataRow}>
// // // //                                 <span style={labelStyle}>Full Name:</span> 
// // // //                                 <span style={valueStyle}>{modalData.name}</span>
// // // //                             </div>
// // // //                             <div style={dataRow}>
// // // //                                 <span style={labelStyle}>User ID:</span> 
// // // //                                 <span style={valueStyle}>{modalData.userId}</span>
// // // //                             </div>
// // // //                             <div style={dataRow}>
// // // //                                 <span style={labelStyle}>Password:</span> 
// // // //                                 <span style={valueStyle}>{modalData.password}</span>
// // // //                             </div>
// // // //                             <div style={dataRow}>
// // // //                                 <span style={labelStyle}>Trx Password:</span> 
// // // //                                 <span style={valueStyle}>{modalData.trxPassword}</span>
// // // //                             </div>
// // // //                             <div style={dataRow}>
// // // //                                 <span style={labelStyle}>Date:</span> 
// // // //                                 <span style={valueStyle}>{modalData.date}</span>
// // // //                             </div>
// // // //                             <div style={{...dataRow, borderBottom: 'none'}}>
// // // //                                 <span style={labelStyle}>Email:</span> 
// // // //                                 <span style={valueStyle}>{modalData.email}</span>
// // // //                             </div>
// // // //                         </div>

// // // //                         <button onClick={() => navigate('/login')} style={loginBtn}>
// // // //                             ➜ Login to Your Account
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Register;






















// // // import React, { useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   Gamepad2,
// // //   UserRound,
// // //   Mail,
// // //   LockKeyhole,
// // //   Eye,
// // //   EyeOff,
// // //   ArrowRight,
// // //   ShieldCheck,
// // //   Zap,
// // //   CheckCircle2,
// // //   LoaderCircle,
// // //   ChevronLeft,
// // // } from "lucide-react";

// // // export default function Register() {
// // //   const [form, setForm] = useState({
// // //     username: "",
// // //     email: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //   });

// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirm, setShowConfirm] = useState(false);
// // //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");

// // //   const updateField = (e) => {
// // //     const { name, value } = e.target;
// // //     setForm((prev) => ({ ...prev, [name]: value }));
// // //     setError("");
// // //     setSuccess("");
// // //   };

// // //   const passwordChecks = [
// // //     { label: "At least 8 characters", valid: form.password.length >= 8 },
// // //     { label: "Contains an uppercase letter", valid: /[A-Z]/.test(form.password) },
// // //     { label: "Contains a number", valid: /\d/.test(form.password) },
// // //     { label: "Contains a special character", valid: /[^A-Za-z0-9]/.test(form.password) },
// // //   ];

// // //   const strength = passwordChecks.filter((item) => item.valid).length;

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");

// // //     if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) {
// // //       setError("Username must be 3–20 characters using letters, numbers or underscores.");
// // //       return;
// // //     }

// // //     if (strength < 3) {
// // //       setError("Please choose a stronger password.");
// // //       return;
// // //     }

// // //     if (form.password !== form.confirmPassword) {
// // //       setError("Your passwords do not match.");
// // //       return;
// // //     }

// // //     if (!acceptedTerms) {
// // //       setError("Please accept the Terms of Service and Privacy Policy.");
// // //       return;
// // //     }

// // //     // Connect the existing registration API here.
// // //     // Do not create a fake account or display a false success.
// // //     setError("Registration form is ready. Connect your existing backend API to create your account.");
// // //   }

// // //   return (
// // //     <div className="zoro-register min-h-screen overflow-hidden bg-[#08050F] text-white">
// // //       <style>{`
// // //         .zoro-register {
// // //           --purple: #A855F7;
// // //           --cyan: #67E8F9;
// // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // //         }

// // //         .zoro-register * { box-sizing: border-box; }
// // //         .zoro-register a { text-decoration: none; }

// // //         .register-grid {
// // //           background-image:
// // //             linear-gradient(#a855f70b 1px,transparent 1px),
// // //             linear-gradient(90deg,#a855f70b 1px,transparent 1px);
// // //           background-size: 40px 40px;
// // //           mask-image: linear-gradient(to bottom,black,transparent);
// // //         }

// // //         .register-glass {
// // //           background: linear-gradient(145deg,rgba(28,15,42,.97),rgba(11,8,18,.98));
// // //           border: 1px solid rgba(192,132,252,.24);
// // //           box-shadow: 0 30px 100px rgba(0,0,0,.48),0 0 50px rgba(168,85,247,.08);
// // //         }

// // //         .register-input {
// // //           width: 100%;
// // //           min-width: 0;
// // //           background: rgba(255,255,255,.025);
// // //           border: 1px solid rgba(255,255,255,.12);
// // //           color: white;
// // //           outline: none;
// // //           transition: border-color .2s,box-shadow .2s,background .2s;
// // //         }

// // //         .register-input:focus {
// // //           border-color: rgba(192,132,252,.8);
// // //           background: rgba(168,85,247,.04);
// // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // //         }

// // //         .register-input::placeholder { color: #777080; }

// // //         .register-button {
// // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // //           transition: transform .2s,box-shadow .2s;
// // //         }

// // //         .register-button:hover:not(:disabled) {
// // //           transform: translateY(-2px);
// // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // //         }

// // //         .register-heading {
// // //           background: linear-gradient(100deg,#fff,#e9d5ff 55%,#a855f7);
// // //           -webkit-background-clip: text;
// // //           background-clip: text;
// // //           color: transparent;
// // //         }

// // //         @media (prefers-reduced-motion: reduce) {
// // //           .zoro-register * { transition: none !important; }
// // //         }
// // //       `}</style>

// // //       {/* Background */}
// // //       <div className="pointer-events-none fixed inset-0">
// // //         <div className="register-grid absolute inset-0" />
// // //         <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // //       </div>

// // //       {/* Header */}
// // //       <header className="relative z-10 border-b border-white/[0.07]">
// // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // //           <Link to="/" className="flex items-center gap-3">
// // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // //               <Gamepad2 size={24} />
// // //             </span>
// // //             <span className="text-lg font-black tracking-tight">
// // //               ZORO<span className="text-purple-400"> GAMES</span>
// // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // //                 ENTER THE NEXT LEVEL
// // //               </span>
// // //             </span>
// // //           </Link>

// // //           <Link to="/" className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300">
// // //             <ChevronLeft size={16} /> BACK TO HOME
// // //           </Link>
// // //         </div>
// // //       </header>

// // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-14">
// // //         {/* Left hero panel */}
// // //         <section className="hidden lg:block">
// // //           <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // //             <div className="absolute inset-0">
// // //               <img
// // //                 src="/images/zoro-hero.png"
// // //                 alt=""
// // //                 className="h-full w-full object-cover opacity-75"
// // //               />
// // //               <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // //               <div className="absolute inset-0 bg-purple-950/20" />
// // //             </div>

// // //             <div className="relative flex min-h-[570px] flex-col justify-between p-9 xl:p-12">
// // //               <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // //                 <Zap size={14} className="text-cyan-300" />
// // //                 <span className="text-[10px] font-black tracking-[.2em]">
// // //                   YOUR JOURNEY STARTS HERE
// // //                 </span>
// // //               </div>

// // //               <div>
// // //                 <p className="mb-4 text-xs font-black tracking-[.3em] text-purple-300">
// // //                   CREATE YOUR PLAYER ID
// // //                 </p>

// // //                 <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // //                   JOIN THE
// // //                   <br />
// // //                   <span className="register-heading">NEXT LEVEL.</span>
// // //                 </h1>

// // //                 <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // //                   Create your ZORO GAMES account and get ready to explore,
// // //                   compete and build your own gaming journey.
// // //                 </p>

// // //                 <div className="mt-9 space-y-4 border-t border-white/15 pt-7">
// // //                   {[
// // //                     "Your own player account",
// // //                     "Access to available gaming features",
// // //                     "A foundation for future achievements",
// // //                   ].map((item) => (
// // //                     <div key={item} className="flex items-center gap-3 text-sm text-white/75">
// // //                       <CheckCircle2 size={17} className="shrink-0 text-cyan-300" />
// // //                       {item}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Registration form */}
// // //         <section className="mx-auto w-full max-w-[480px]">
// // //           <div className="register-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // //             <div className="mb-7">
// // //               <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300">
// // //                 <Gamepad2 size={29} />
// // //               </div>

// // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // //                 PLAYER REGISTRATION
// // //               </p>

// // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // //                 CREATE YOUR <span className="register-heading">ACCOUNT.</span>
// // //               </h2>

// // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // //                 Choose your identity. Enter the ZORO universe.
// // //               </p>
// // //             </div>

// // //             <form onSubmit={handleSubmit} className="space-y-5">
// // //               {/* Username */}
// // //               <div>
// // //                 <label htmlFor="reg-username" className="mb-2 block text-xs font-bold text-white/80">
// // //                   Player username
// // //                 </label>
// // //                 <div className="relative">
// // //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// // //                   <input
// // //                     id="reg-username"
// // //                     name="username"
// // //                     type="text"
// // //                     autoComplete="username"
// // //                     minLength={3}
// // //                     maxLength={20}
// // //                     pattern="[A-Za-z0-9_]+"
// // //                     required
// // //                     value={form.username}
// // //                     onChange={updateField}
// // //                     placeholder="Choose a gamer name"
// // //                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // //                   />
// // //                 </div>
// // //                 <p className="mt-2 text-[10px] text-white/35">
// // //                   3–20 characters · Letters, numbers and underscores
// // //                 </p>
// // //               </div>

// // //               {/* Email */}
// // //               <div>
// // //                 <label htmlFor="reg-email" className="mb-2 block text-xs font-bold text-white/80">
// // //                   Email address
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// // //                   <input
// // //                     id="reg-email"
// // //                     name="email"
// // //                     type="email"
// // //                     autoComplete="email"
// // //                     required
// // //                     value={form.email}
// // //                     onChange={updateField}
// // //                     placeholder="you@example.com"
// // //                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Password */}
// // //               <div>
// // //                 <label htmlFor="reg-password" className="mb-2 block text-xs font-bold text-white/80">
// // //                   Create password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// // //                   <input
// // //                     id="reg-password"
// // //                     name="password"
// // //                     type={showPassword ? "text" : "password"}
// // //                     autoComplete="new-password"
// // //                     minLength={8}
// // //                     required
// // //                     value={form.password}
// // //                     onChange={updateField}
// // //                     placeholder="Create a strong password"
// // //                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
// // //                   >
// // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // //                   </button>
// // //                 </div>

// // //                 {form.password.length > 0 && (
// // //                   <div className="mt-3">
// // //                     <div className="mb-2 flex gap-1.5">
// // //                       {[1, 2, 3, 4].map((n) => (
// // //                         <div
// // //                           key={n}
// // //                           className={`h-1 flex-1 rounded-full transition ${
// // //                             strength >= n
// // //                               ? strength >= 4
// // //                                 ? "bg-cyan-300"
// // //                                 : strength >= 3
// // //                                   ? "bg-purple-400"
// // //                                   : "bg-pink-500"
// // //                               : "bg-white/10"
// // //                           }`}
// // //                         />
// // //                       ))}
// // //                     </div>
// // //                     <div className="grid grid-cols-2 gap-2">
// // //                       {passwordChecks.map((item) => (
// // //                         <p key={item.label} className={`flex items-center gap-1.5 text-[10px] ${item.valid ? "text-cyan-300" : "text-white/35"}`}>
// // //                           <CheckCircle2 size={12} />
// // //                           {item.label}
// // //                         </p>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Confirm password */}
// // //               <div>
// // //                 <label htmlFor="reg-confirm" className="mb-2 block text-xs font-bold text-white/80">
// // //                   Confirm password
// // //                 </label>
// // //                 <div className="relative">
// // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// // //                   <input
// // //                     id="reg-confirm"
// // //                     name="confirmPassword"
// // //                     type={showConfirm ? "text" : "password"}
// // //                     autoComplete="new-password"
// // //                     required
// // //                     value={form.confirmPassword}
// // //                     onChange={updateField}
// // //                     placeholder="Enter password again"
// // //                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowConfirm(!showConfirm)}
// // //                     aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
// // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
// // //                   >
// // //                     {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
// // //                   </button>
// // //                 </div>

// // //                 {form.confirmPassword && (
// // //                   <p className={`mt-2 text-[10px] ${form.password === form.confirmPassword ? "text-cyan-300" : "text-pink-400"}`}>
// // //                     {form.password === form.confirmPassword
// // //                       ? "Passwords match"
// // //                       : "Passwords do not match"}
// // //                   </p>
// // //                 )}
// // //               </div>

// // //               {/* Terms */}
// // //               <label className="flex cursor-pointer items-start gap-3">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={acceptedTerms}
// // //                   onChange={(e) => setAcceptedTerms(e.target.checked)}
// // //                   className="mt-1 h-4 w-4 shrink-0 accent-purple-500"
// // //                 />
// // //                 <span className="text-xs leading-6 text-white/55">
// // //                   I agree to the{" "}
// // //                   <Link to="/terms" className="font-bold text-purple-300 hover:text-cyan-300">
// // //                     Terms of Service
// // //                   </Link>{" "}
// // //                   and{" "}
// // //                   <Link to="/privacy-policy" className="font-bold text-purple-300 hover:text-cyan-300">
// // //                     Privacy Policy
// // //                   </Link>.
// // //                 </span>
// // //               </label>

// // //               {/* Messages */}
// // //               {error && (
// // //                 <div role="alert" className="rounded-xl border border-pink-400/20 bg-pink-500/[0.07] p-4 text-xs leading-6 text-pink-200">
// // //                   {error}
// // //                 </div>
// // //               )}

// // //               {success && (
// // //                 <div role="status" className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-xs leading-6 text-cyan-200">
// // //                   {success}
// // //                 </div>
// // //               )}

// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="register-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <LoaderCircle size={17} className="animate-spin" />
// // //                     CREATING ACCOUNT...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     CREATE MY ACCOUNT <ArrowRight size={17} />
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </form>

// // //             <div className="my-7 flex items-center gap-4">
// // //               <div className="h-px flex-1 bg-white/10" />
// // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // //                 ALREADY A PLAYER?
// // //               </span>
// // //               <div className="h-px flex-1 bg-white/10" />
// // //             </div>

// // //             <Link
// // //               to="/login"
// // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // //             >
// // //               SIGN IN TO YOUR ACCOUNT <ArrowRight size={16} />
// // //             </Link>

// // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // //               <p className="text-[10px] leading-5 text-white/45">
// // //                 Your account must be created and validated by the ZORO GAMES
// // //                 server. Never share your password with anyone.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // //           </p>
// // //         </section>
// // //       </main>
// // //     </div>
// // //   );
// // // }





// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   Gamepad2,
// //   UserRound,
// //   Mail,
// //   LockKeyhole,
// //   Eye,
// //   EyeOff,
// //   ArrowRight,
// //   ShieldCheck,
// //   Zap,
// //   CheckCircle2,
// //   LoaderCircle,
// //   ChevronLeft,
// // } from "lucide-react";

// // export default function Register() {
// //   const [form, setForm] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirm, setShowConfirm] = useState(false);
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const updateField = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //     setError("");
// //     setSuccess("");
// //   };

// //   const passwordChecks = [
// //     { label: "At least 8 characters", valid: form.password.length >= 8 },
// //     { label: "Contains an uppercase letter", valid: /[A-Z]/.test(form.password) },
// //     { label: "Contains a number", valid: /\d/.test(form.password) },
// //     { label: "Contains a special character", valid: /[^A-Za-z0-9]/.test(form.password) },
// //   ];

// //   const strength = passwordChecks.filter((item) => item.valid).length;

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username)) {
// //       setError("Username must be 3–20 characters using letters, numbers or underscores.");
// //       return;
// //     }

// //     if (strength < 3) {
// //       setError("Please choose a stronger password.");
// //       return;
// //     }

// //     if (form.password !== form.confirmPassword) {
// //       setError("Your passwords do not match.");
// //       return;
// //     }

// //     if (!acceptedTerms) {
// //       setError("Please accept the Terms of Service and Privacy Policy.");
// //       return;
// //     }

// //     // Connect the existing registration API here.
// //     // Do not create a fake account or display a false success.
// //     setError("Registration form is ready. Connect your existing backend API to create your account.");
// //   }

// //   return (
// //     <div className="zoro-register min-h-screen overflow-hidden bg-[#08050F] text-white">
// //       <style>{`
// //         .zoro-register {
// //           --purple: #A855F7;
// //           --cyan: #67E8F9;
// //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// //         }

// //         .zoro-register * { box-sizing: border-box; }
// //         .zoro-register a { text-decoration: none; }

// //         .register-glass {
// //           background: linear-gradient(145deg,rgba(28,15,42,.97),rgba(11,8,18,.98));
// //           border: 1px solid rgba(192,132,252,.24);
// //           box-shadow: 0 30px 100px rgba(0,0,0,.48),0 0 50px rgba(168,85,247,.08);
// //         }

// //         .register-input {
// //           width: 100%;
// //           min-width: 0;
// //           background: rgba(255,255,255,.025);
// //           border: 1px solid rgba(255,255,255,.12);
// //           color: white;
// //           outline: none;
// //           transition: border-color .2s,box-shadow .2s,background .2s;
// //         }

// //         .register-input:focus {
// //           border-color: rgba(192,132,252,.8);
// //           background: rgba(168,85,247,.04);
// //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// //         }

// //         .register-input::placeholder { color: #777080; }

// //         .register-button {
// //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// //           transition: transform .2s,box-shadow .2s;
// //         }

// //         .register-button:hover:not(:disabled) {
// //           transform: translateY(-2px);
// //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// //         }

// //         .register-heading {
// //           background: linear-gradient(100deg,#fff,#e9d5ff 55%,#a855f7);
// //           -webkit-background-clip: text;
// //           background-clip: text;
// //           color: transparent;
// //         }

// //         @media (prefers-reduced-motion: reduce) {
// //           .zoro-register * { transition: none !important; }
// //         }
// //       `}</style>

// //       {/* Background */}
// //       <div className="pointer-events-none fixed inset-0">
// //         <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// //       </div>

// //       {/* Header */}
// //       <header className="relative z-10 border-b border-white/[0.07]">
// //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// //           <Link to="/" className="flex items-center gap-3">
// //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// //               <Gamepad2 size={24} />
// //             </span>
// //             <span className="text-lg font-black tracking-tight">
// //               ZORO<span className="text-purple-400"> GAMES</span>
// //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// //                 ENTER THE NEXT LEVEL
// //               </span>
// //             </span>
// //           </Link>

// //           <Link to="/" className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300">
// //             <ChevronLeft size={16} /> BACK TO HOME
// //           </Link>
// //         </div>
// //       </header>

// //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-14">
// //         {/* Left hero panel */}
// //         <section className="hidden lg:block">
// //           <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// //             <div className="absolute inset-0">
// //               <img
// //                 src="/images/zoro-hero.png"
// //                 alt=""
// //                 className="h-full w-full object-cover opacity-75"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// //               <div className="absolute inset-0 bg-purple-950/20" />
// //             </div>

// //             <div className="relative flex min-h-[570px] flex-col justify-between p-9 xl:p-12">
// //               <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// //                 <Zap size={14} className="text-cyan-300" />
// //                 <span className="text-[10px] font-black tracking-[.2em]">
// //                   YOUR JOURNEY STARTS HERE
// //                 </span>
// //               </div>

// //               <div>
// //                 <p className="mb-4 text-xs font-black tracking-[.3em] text-purple-300">
// //                   CREATE YOUR PLAYER ID
// //                 </p>

// //                 <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// //                   JOIN THE
// //                   <br />
// //                   <span className="register-heading">NEXT LEVEL.</span>
// //                 </h1>

// //                 <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// //                   Create your ZORO GAMES account and get ready to explore,
// //                   compete and build your own gaming journey.
// //                 </p>

// //                 <div className="mt-9 space-y-4 border-t border-white/15 pt-7">
// //                   {[
// //                     "Your own player account",
// //                     "Access to available gaming features",
// //                     "A foundation for future achievements",
// //                   ].map((item) => (
// //                     <div key={item} className="flex items-center gap-3 text-sm text-white/75">
// //                       <CheckCircle2 size={17} className="shrink-0 text-cyan-300" />
// //                       {item}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Registration form */}
// //         <section className="mx-auto w-full max-w-[480px]">
// //           <div className="register-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// //             <div className="mb-7">
// //               <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300">
// //                 <Gamepad2 size={29} />
// //               </div>

// //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// //                 PLAYER REGISTRATION
// //               </p>

// //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// //                 CREATE YOUR <span className="register-heading">ACCOUNT.</span>
// //               </h2>

// //               <p className="mt-3 text-sm leading-6 text-white/50">
// //                 Choose your identity. Enter the ZORO universe.
// //               </p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               {/* Username */}
// //               <div>
// //                 <label htmlFor="reg-username" className="mb-2 block text-xs font-bold text-white/80">
// //                   Player username
// //                 </label>
// //                 <div className="relative">
// //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// //                   <input
// //                     id="reg-username"
// //                     name="username"
// //                     type="text"
// //                     autoComplete="username"
// //                     minLength={3}
// //                     maxLength={20}
// //                     pattern="[A-Za-z0-9_]+"
// //                     required
// //                     value={form.username}
// //                     onChange={updateField}
// //                     placeholder="Choose a gamer name"
// //                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
// //                   />
// //                 </div>
// //                 <p className="mt-2 text-[10px] text-white/35">
// //                   3–20 characters · Letters, numbers and underscores
// //                 </p>
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label htmlFor="reg-email" className="mb-2 block text-xs font-bold text-white/80">
// //                   Email address
// //                 </label>
// //                 <div className="relative">
// //                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// //                   <input
// //                     id="reg-email"
// //                     name="email"
// //                     type="email"
// //                     autoComplete="email"
// //                     required
// //                     value={form.email}
// //                     onChange={updateField}
// //                     placeholder="you@example.com"
// //                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <label htmlFor="reg-password" className="mb-2 block text-xs font-bold text-white/80">
// //                   Create password
// //                 </label>
// //                 <div className="relative">
// //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// //                   <input
// //                     id="reg-password"
// //                     name="password"
// //                     type={showPassword ? "text" : "password"}
// //                     autoComplete="new-password"
// //                     minLength={8}
// //                     required
// //                     value={form.password}
// //                     onChange={updateField}
// //                     placeholder="Create a strong password"
// //                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     aria-label={showPassword ? "Hide password" : "Show password"}
// //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
// //                   >
// //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                   </button>
// //                 </div>

// //                 {form.password.length > 0 && (
// //                   <div className="mt-3">
// //                     <div className="mb-2 flex gap-1.5">
// //                       {[1, 2, 3, 4].map((n) => (
// //                         <div
// //                           key={n}
// //                           className={`h-1 flex-1 rounded-full transition ${
// //                             strength >= n
// //                               ? strength >= 4
// //                                 ? "bg-cyan-300"
// //                                 : strength >= 3
// //                                   ? "bg-purple-400"
// //                                   : "bg-pink-500"
// //                               : "bg-white/10"
// //                           }`}
// //                         />
// //                       ))}
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-2">
// //                       {passwordChecks.map((item) => (
// //                         <p key={item.label} className={`flex items-center gap-1.5 text-[10px] ${item.valid ? "text-cyan-300" : "text-white/35"}`}>
// //                           <CheckCircle2 size={12} />
// //                           {item.label}
// //                         </p>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm password */}
// //               <div>
// //                 <label htmlFor="reg-confirm" className="mb-2 block text-xs font-bold text-white/80">
// //                   Confirm password
// //                 </label>
// //                 <div className="relative">
// //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
// //                   <input
// //                     id="reg-confirm"
// //                     name="confirmPassword"
// //                     type={showConfirm ? "text" : "password"}
// //                     autoComplete="new-password"
// //                     required
// //                     value={form.confirmPassword}
// //                     onChange={updateField}
// //                     placeholder="Enter password again"
// //                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowConfirm(!showConfirm)}
// //                     aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
// //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
// //                   >
// //                     {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
// //                   </button>
// //                 </div>

// //                 {form.confirmPassword && (
// //                   <p className={`mt-2 text-[10px] ${form.password === form.confirmPassword ? "text-cyan-300" : "text-pink-400"}`}>
// //                     {form.password === form.confirmPassword
// //                       ? "Passwords match"
// //                       : "Passwords do not match"}
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Terms */}
// //               <label className="flex cursor-pointer items-start gap-3">
// //                 <input
// //                   type="checkbox"
// //                   checked={acceptedTerms}
// //                   onChange={(e) => setAcceptedTerms(e.target.checked)}
// //                   className="mt-1 h-4 w-4 shrink-0 accent-purple-500"
// //                 />
// //                 <span className="text-xs leading-6 text-white/55">
// //                   I agree to the{" "}
// //                   <Link to="/terms" className="font-bold text-purple-300 hover:text-cyan-300">
// //                     Terms of Service
// //                   </Link>{" "}
// //                   and{" "}
// //                   <Link to="/privacy-policy" className="font-bold text-purple-300 hover:text-cyan-300">
// //                     Privacy Policy
// //                   </Link>.
// //                 </span>
// //               </label>

// //               {/* Messages */}
// //               {error && (
// //                 <div role="alert" className="rounded-xl border border-pink-400/20 bg-pink-500/[0.07] p-4 text-xs leading-6 text-pink-200">
// //                   {error}
// //                 </div>
// //               )}

// //               {success && (
// //                 <div role="status" className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-xs leading-6 text-cyan-200">
// //                   {success}
// //                 </div>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="register-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <LoaderCircle size={17} className="animate-spin" />
// //                     CREATING ACCOUNT...
// //                   </>
// //                 ) : (
// //                   <>
// //                     CREATE MY ACCOUNT <ArrowRight size={17} />
// //                   </>
// //                 )}
// //               </button>
// //             </form>

// //             <div className="my-7 flex items-center gap-4">
// //               <div className="h-px flex-1 bg-white/10" />
// //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// //                 ALREADY A PLAYER?
// //               </span>
// //               <div className="h-px flex-1 bg-white/10" />
// //             </div>

// //             <Link
// //               to="/login"
// //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// //             >
// //               SIGN IN TO YOUR ACCOUNT <ArrowRight size={16} />
// //             </Link>

// //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// //               <p className="text-[10px] leading-5 text-white/45">
// //                 Your account must be created and validated by the ZORO GAMES
// //                 server. Never share your password with anyone.
// //               </p>
// //             </div>
// //           </div>

// //           <p className="mt-6 text-center text-[10px] text-white/35">
// //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// //           </p>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Gamepad2,
//   UserRound,
//   Mail,
//   Phone,
//   MapPin,
//   WalletCards,
//   Users,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   ShieldCheck,
//   Zap,
//   CheckCircle2,
//   LoaderCircle,
//   ChevronLeft,
// } from "lucide-react";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     country: "India",
//     walletAddress: "",
//     upi: "",
//     sponsorId: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const updateField = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError("");
//     setSuccess("");
//   };

//   const passwordChecks = [
//     { label: "At least 8 characters", valid: form.password.length >= 8 },
//     {
//       label: "Contains an uppercase letter",
//       valid: /[A-Z]/.test(form.password),
//     },
//     { label: "Contains a number", valid: /\d/.test(form.password) },
//     {
//       label: "Contains a special character",
//       valid: /[^A-Za-z0-9]/.test(form.password),
//     },
//   ];

//   const strength = passwordChecks.filter((item) => item.valid).length;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!/^[A-Za-z\s]{3,50}$/.test(form.name.trim())) {
//       setError(
//         "Name must be 3–50 characters and contain letters and spaces only."
//       );
//       return;
//     }

//     if (!/^[0-9]{10,15}$/.test(form.mobile.trim())) {
//       setError("Enter a valid mobile number using 10–15 digits.");
//       return;
//     }

//     if (!form.country.trim()) {
//       setError("Country is required.");
//       return;
//     }

//     if (!/^0x[a-fA-F0-9]{40}$/.test(form.walletAddress.trim())) {
//       setError(
//         "Enter a valid USDT BEP-20 wallet address (0x followed by 40 hexadecimal characters)."
//       );
//       return;
//     }

//     if (!/^[^\s@]+@gmail\.com$/i.test(form.email.trim())) {
//       setError("Please use a Gmail address to register.");
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     if (strength < 3) {
//       setError(
//         "Please choose a stronger password using at least three password requirements."
//       );
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       setError("Your passwords do not match.");
//       return;
//     }

//     if (!acceptedTerms) {
//       setError("Please accept the Terms of Service and Privacy Policy.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Default backend: http://localhost:5000/api/user/register
//       const apiBase = (
//         import.meta.env.VITE_API_URL || "http://localhost:5000/api"
//       ).replace(/\/$/, "");

//       const endpoint =
//         import.meta.env.VITE_REGISTER_ENDPOINT ||
//         `${apiBase}/auth/register`;

//       const payload = {
//         name: form.name.trim(),
//         mobile: form.mobile.trim(),
//         email: form.email.trim().toLowerCase(),
//         country: form.country.trim(),
//         walletAddress: form.walletAddress.trim(),
//         upi: form.upi.trim(),
//         password: form.password,
//         sponsorId: form.sponsorId.trim(),
//       };

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(
//           data.message || `Registration failed (${response.status}).`
//         );
//       }

//       const userIdText = data.userId
//         ? ` Your User ID is ${data.userId}.`
//         : "";

//       const txnPasswordText = data.transactionPassword
//         ? ` Your transaction password is ${data.transactionPassword}. Save it securely.`
//         : "";

//       setSuccess(
//         `${data.message || "Registration successful."}${userIdText}${txnPasswordText}`
//       );

//       setForm((prev) => ({
//         ...prev,
//         password: "",
//         confirmPassword: "",
//       }));
//     } catch (err) {
//       setError(
//         err.message || "Unable to register right now. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="zoro-register min-h-screen overflow-hidden bg-[#08050F] text-white">
//       <style>{`
//         .zoro-register {
//           --purple: #A855F7;
//           --cyan: #67E8F9;
//           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
//         }

//         .zoro-register * {
//           box-sizing: border-box;
//         }

//         .zoro-register a {
//           text-decoration: none;
//         }

//         .register-glass {
//           background: linear-gradient(145deg,rgba(28,15,42,.97),rgba(11,8,18,.98));
//           border: 1px solid rgba(192,132,252,.24);
//           box-shadow: 0 30px 100px rgba(0,0,0,.48),0 0 50px rgba(168,85,247,.08);
//         }

//         .register-input {
//           width: 100%;
//           min-width: 0;
//           background: rgba(255,255,255,.025);
//           border: 1px solid rgba(255,255,255,.12);
//           color: white;
//           outline: none;
//           transition: border-color .2s,box-shadow .2s,background .2s;
//         }

//         .register-input:focus {
//           border-color: rgba(192,132,252,.8);
//           background: rgba(168,85,247,.04);
//           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
//         }

//         .register-input::placeholder {
//           color: #777080;
//         }

//         .register-button {
//           background: linear-gradient(105deg,#9333EA,#6D28D9);
//           box-shadow: 0 0 25px rgba(147,51,234,.24);
//           transition: transform .2s,box-shadow .2s;
//         }

//         .register-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 0 35px rgba(147,51,234,.4);
//         }

//         .register-heading {
//           background: linear-gradient(100deg,#fff,#e9d5ff 55%,#a855f7);
//           -webkit-background-clip: text;
//           background-clip: text;
//           color: transparent;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .zoro-register * {
//             transition: none !important;
//           }
//         }
//       `}</style>

//       {/* Background */}
//       <div className="pointer-events-none fixed inset-0">
//         <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
//         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
//       </div>

//       {/* Header */}
//       <header className="relative z-10 border-b border-white/[0.07]">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
//           <Link to="/" className="flex items-center gap-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
//               <Gamepad2 size={24} />
//             </span>

//             <span className="text-lg font-black tracking-tight">
//               ZORO<span className="text-purple-400"> GAMES</span>
//               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
//                 ENTER THE NEXT LEVEL
//               </span>
//             </span>
//           </Link>

//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
//           >
//             <ChevronLeft size={16} />
//             BACK TO HOME
//           </Link>
//         </div>
//       </header>

//       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-14">
//         {/* Left hero panel */}
//         <section className="hidden lg:block">
//           <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
//             <div className="absolute inset-0">
//               <img
//                 src="/images/zoro-hero.png"
//                 alt=""
//                 className="h-full w-full object-cover opacity-75"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
//               <div className="absolute inset-0 bg-purple-950/20" />
//             </div>

//             <div className="relative flex min-h-[570px] flex-col justify-between p-9 xl:p-12">
//               <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
//                 <Zap size={14} className="text-cyan-300" />
//                 <span className="text-[10px] font-black tracking-[.2em]">
//                   YOUR JOURNEY STARTS HERE
//                 </span>
//               </div>

//               <div>
//                 <p className="mb-4 text-xs font-black tracking-[.3em] text-purple-300">
//                   CREATE YOUR PLAYER ID
//                 </p>

//                 <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
//                   JOIN THE
//                   <br />
//                   <span className="register-heading">NEXT LEVEL.</span>
//                 </h1>

//                 <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
//                   Create your ZORO GAMES account and get ready to explore,
//                   compete and build your own gaming journey.
//                 </p>

//                 <div className="mt-9 space-y-4 border-t border-white/15 pt-7">
//                   {[
//                     "Your own player account",
//                     "Access to available gaming features",
//                     "A foundation for future achievements",
//                   ].map((item) => (
//                     <div
//                       key={item}
//                       className="flex items-center gap-3 text-sm text-white/75"
//                     >
//                       <CheckCircle2
//                         size={17}
//                         className="shrink-0 text-cyan-300"
//                       />
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Registration form */}
//         <section className="mx-auto w-full max-w-[480px]">
//           <div className="register-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
//             <div className="mb-7">
//               <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300">
//                 <Gamepad2 size={29} />
//               </div>

//               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
//                 PLAYER REGISTRATION
//               </p>

//               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
//                 CREATE YOUR <span className="register-heading">ACCOUNT.</span>
//               </h2>

//               <p className="mt-3 text-sm leading-6 text-white/50">
//                 Choose your identity. Enter the ZORO universe.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full name */}
//               <div>
//                 <label
//                   htmlFor="reg-name"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Full name
//                 </label>

//                 <div className="relative">
//                   <UserRound
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     minLength={3}
//                     maxLength={50}
//                     pattern="[A-Za-z ]{3,50}"
//                     required
//                     value={form.name}
//                     onChange={updateField}
//                     placeholder="Enter your full name"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>

//                 <p className="mt-2 text-[10px] text-white/35">
//                   3–50 characters · Letters and spaces only
//                 </p>
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="reg-email"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Email address
//                 </label>

//                 <div className="relative">
//                   <Mail
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={form.email}
//                     onChange={updateField}
//                     placeholder="you@gmail.com"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label
//                   htmlFor="reg-mobile"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Mobile number
//                 </label>

//                 <div className="relative">
//                   <Phone
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-mobile"
//                     name="mobile"
//                     type="tel"
//                     inputMode="numeric"
//                     autoComplete="tel"
//                     minLength={10}
//                     maxLength={15}
//                     pattern="[0-9]{10,15}"
//                     required
//                     value={form.mobile}
//                     onChange={updateField}
//                     placeholder="10–15 digit mobile number"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Country */}
//               <div>
//                 <label
//                   htmlFor="reg-country"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Country
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-country"
//                     name="country"
//                     type="text"
//                     autoComplete="country-name"
//                     required
//                     value={form.country}
//                     onChange={updateField}
//                     placeholder="Enter your country"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Wallet address */}
//               <div>
//                 <label
//                   htmlFor="reg-wallet"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   USDT BEP-20 wallet address
//                 </label>

//                 <div className="relative">
//                   <WalletCards
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-wallet"
//                     name="walletAddress"
//                     type="text"
//                     autoComplete="off"
//                     required
//                     value={form.walletAddress}
//                     onChange={updateField}
//                     placeholder="0x followed by 40 hexadecimal characters"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm font-mono"
//                   />
//                 </div>

//                 <p className="mt-2 text-[10px] text-white/35">
//                   Check the network and address carefully before registering.
//                 </p>
//               </div>

//               {/* Optional UPI */}
//               <div>
//                 <label
//                   htmlFor="reg-upi"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   UPI ID{" "}
//                   <span className="font-normal text-white/35">(optional)</span>
//                 </label>

//                 <input
//                   id="reg-upi"
//                   name="upi"
//                   type="text"
//                   autoComplete="off"
//                   value={form.upi}
//                   onChange={updateField}
//                   placeholder="yourname@upi"
//                   className="register-input rounded-xl px-4 py-4 text-sm"
//                 />
//               </div>

//               {/* Sponsor ID */}
//               <div>
//                 <label
//                   htmlFor="reg-sponsor"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Sponsor ID{" "}
//                   <span className="font-normal text-white/35">
//                     (required after first account)
//                   </span>
//                 </label>

//                 <div className="relative">
//                   <Users
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-sponsor"
//                     name="sponsorId"
//                     type="text"
//                     autoComplete="off"
//                     value={form.sponsorId}
//                     onChange={updateField}
//                     placeholder="Enter your sponsor's ZG ID"
//                     className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="reg-password"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Create password
//                 </label>

//                 <div className="relative">
//                   <LockKeyhole
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     minLength={8}
//                     required
//                     value={form.password}
//                     onChange={updateField}
//                     placeholder="Create a strong password"
//                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={18} />
//                     ) : (
//                       <Eye size={18} />
//                     )}
//                   </button>
//                 </div>

//                 {form.password.length > 0 && (
//                   <div className="mt-3">
//                     <div className="mb-2 flex gap-1.5">
//                       {[1, 2, 3, 4].map((n) => (
//                         <div
//                           key={n}
//                           className={`h-1 flex-1 rounded-full transition ${
//                             strength >= n
//                               ? strength >= 4
//                                 ? "bg-cyan-300"
//                                 : strength >= 3
//                                   ? "bg-purple-400"
//                                   : "bg-pink-500"
//                               : "bg-white/10"
//                           }`}
//                         />
//                       ))}
//                     </div>

//                     <div className="grid grid-cols-2 gap-2">
//                       {passwordChecks.map((item) => (
//                         <p
//                           key={item.label}
//                           className={`flex items-center gap-1.5 text-[10px] ${
//                             item.valid ? "text-cyan-300" : "text-white/35"
//                           }`}
//                         >
//                           <CheckCircle2 size={12} />
//                           {item.label}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm password */}
//               <div>
//                 <label
//                   htmlFor="reg-confirm"
//                   className="mb-2 block text-xs font-bold text-white/80"
//                 >
//                   Confirm password
//                 </label>

//                 <div className="relative">
//                   <LockKeyhole
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
//                   />

//                   <input
//                     id="reg-confirm"
//                     name="confirmPassword"
//                     type={showConfirm ? "text" : "password"}
//                     autoComplete="new-password"
//                     required
//                     value={form.confirmPassword}
//                     onChange={updateField}
//                     placeholder="Enter password again"
//                     className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowConfirm(!showConfirm)}
//                     aria-label={
//                       showConfirm
//                         ? "Hide confirmation password"
//                         : "Show confirmation password"
//                     }
//                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
//                   >
//                     {showConfirm ? (
//                       <EyeOff size={18} />
//                     ) : (
//                       <Eye size={18} />
//                     )}
//                   </button>
//                 </div>

//                 {form.confirmPassword && (
//                   <p
//                     className={`mt-2 text-[10px] ${
//                       form.password === form.confirmPassword
//                         ? "text-cyan-300"
//                         : "text-pink-400"
//                     }`}
//                   >
//                     {form.password === form.confirmPassword
//                       ? "Passwords match"
//                       : "Passwords do not match"}
//                   </p>
//                 )}
//               </div>

//               {/* Terms */}
//               <label className="flex cursor-pointer items-start gap-3">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   className="mt-1 h-4 w-4 shrink-0 accent-purple-500"
//                 />

//                 <span className="text-xs leading-6 text-white/55">
//                   I agree to the{" "}
//                   <Link
//                     to="/terms"
//                     className="font-bold text-purple-300 hover:text-cyan-300"
//                   >
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     to="/privacy-policy"
//                     className="font-bold text-purple-300 hover:text-cyan-300"
//                   >
//                     Privacy Policy
//                   </Link>
//                   .
//                 </span>
//               </label>

//               {/* Error message */}
//               {error && (
//                 <div
//                   role="alert"
//                   className="rounded-xl border border-pink-400/20 bg-pink-500/[0.07] p-4 text-xs leading-6 text-pink-200"
//                 >
//                   {error}
//                 </div>
//               )}

//               {/* Success message */}
//               {success && (
//                 <div
//                   role="status"
//                   className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-xs leading-6 text-cyan-200"
//                 >
//                   {success}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="register-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={17} className="animate-spin" />
//                     CREATING ACCOUNT...
//                   </>
//                 ) : (
//                   <>
//                     CREATE MY ACCOUNT <ArrowRight size={17} />
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="my-7 flex items-center gap-4">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
//                 ALREADY A PLAYER?
//               </span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>

//             <Link
//               to="/login"
//               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
//             >
//               SIGN IN TO YOUR ACCOUNT <ArrowRight size={16} />
//             </Link>

//             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
//               <ShieldCheck
//                 size={19}
//                 className="mt-0.5 shrink-0 text-cyan-300"
//               />

//               <p className="text-[10px] leading-5 text-white/45">
//                 Your account must be created and validated by the ZORO GAMES
//                 server. Never share your password with anyone.
//               </p>
//             </div>
//           </div>

//           <p className="mt-6 text-center text-[10px] text-white/35">
//             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Gamepad2, UserRound, Mail, Phone, MapPin, WalletCards,
  Users, LockKeyhole, Eye, EyeOff, ArrowRight, ShieldCheck,
  Zap, CheckCircle2, LoaderCircle, ChevronLeft
} from "lucide-react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
  "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina",
  "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
  "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia",
  "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    walletAddress: "",
    sponsorId: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sponsorAutoDetected, setSponsorAutoDetected] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorLookupLoading, setSponsorLookupLoading] = useState(false);

  const [credentialsModal, setCredentialsModal] = useState({
    open: false,
    userId: "",
    loginPassword: "",
    transactionPassword: ""
  });

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "sponsorId") {
      setSponsorAutoDetected(false);
      setSponsorName("");
    }

    setError("");
  };

  const lookupSponsorName = async (rawSponsorId) => {
    const sponsorId = String(rawSponsorId || "").trim();

    if (!sponsorId) {
      setSponsorName("");
      return;
    }

    setSponsorLookupLoading(true);
    setSponsorName("");

    try {
      const apiBase = (
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api"
      ).replace(/\/$/, "");

      const response = await fetch(
        `${apiBase}/user/check-sponsor/${encodeURIComponent(sponsorId)}`
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Sponsor not found");
      }

      setSponsorName(
        data.name ||
        data.user?.name ||
        data.sponsor?.name ||
        ""
      );
    } catch (err) {
      console.error("Sponsor lookup failed:", err);
      setSponsorName("");
    } finally {
      setSponsorLookupLoading(false);
    }
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);

    const hashQuery = window.location.hash.includes("?")
      ? window.location.hash.split("?").slice(1).join("?")
      : "";

    const hashParams = new URLSearchParams(hashQuery);

    const referralKeys = [
      "sponsorId",
      "sponsor_id",
      "sponsor",
      "ref",
      "referral",
      "referralCode",
      "invite"
    ];

    let referralCode = "";

    for (const key of referralKeys) {
      referralCode =
        search.get(key) ||
        hashParams.get(key) ||
        "";

      if (referralCode.trim()) break;
    }

    if (referralCode.trim()) {
      const detectedCode = referralCode.trim();

      setForm(prev => ({
        ...prev,
        sponsorId: prev.sponsorId || detectedCode
      }));

      setSponsorAutoDetected(true);
      lookupSponsorName(detectedCode);
    }
  }, []);

  const passwordChecks = [
    {
      label: "At least 8 characters",
      valid: form.password.length >= 8
    },
    {
      label: "Contains an uppercase letter",
      valid: /[A-Z]/.test(form.password)
    },
    {
      label: "Contains a number",
      valid: /\d/.test(form.password)
    },
    {
      label: "Contains a special character",
      valid: /[^A-Za-z0-9]/.test(form.password)
    }
  ];

  const strength = passwordChecks.filter(item => item.valid).length;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!/^[A-Za-z\s]{3,50}$/.test(form.name.trim())) {
      setError("Name must be 3–50 characters and contain letters and spaces only.");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(form.mobile.trim())) {
      setError("Enter a valid mobile number using 10–15 digits.");
      return;
    }

    if (!form.country.trim()) {
      setError("Please select your country.");
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(form.walletAddress.trim())) {
      setError("Enter a valid USDT BEP-20 wallet address.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(form.email.trim())) {
      setError("Please use a Gmail address to register.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (strength < 3) {
      setError("Please choose a stronger password using at least three password requirements.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const apiBase = (
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api"
      ).replace(/\/$/, "");

      const endpoint =
        import.meta.env.VITE_REGISTER_ENDPOINT ||
        `${apiBase}/auth/register`;

      const payload = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim().toLowerCase(),
        country: form.country.trim(),
        walletAddress: form.walletAddress.trim(),
        password: form.password,
        sponsorId: form.sponsorId.trim()
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || `Registration failed (${response.status}).`
        );
      }

      const createdUserId =
        data.userId ||
        data.user?.userId ||
        data.data?.userId ||
        "";

      const createdTransactionPassword =
        data.transactionPassword ||
        data.txnPassword ||
        data.user?.transactionPassword ||
        data.data?.transactionPassword ||
        data.data?.txnPassword ||
        "";

      setCredentialsModal({
        open: true,
        userId: String(createdUserId),
        loginPassword: form.password,
        transactionPassword: String(createdTransactionPassword)
      });

    } catch (err) {
      setError(
        err.message || "Unable to register right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="zoro-register min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro-register {
          --purple: #A855F7;
          --cyan: #67E8F9;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .zoro-register * {
          box-sizing: border-box;
        }

        .zoro-register a {
          text-decoration: none;
        }

        .register-glass {
          background: linear-gradient(145deg,rgba(28,15,42,.97),rgba(11,8,18,.98));
          border: 1px solid rgba(192,132,252,.24);
          box-shadow: 0 30px 100px rgba(0,0,0,.48),0 0 50px rgba(168,85,247,.08);
        }

        .register-input {
          width: 100%;
          min-width: 0;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.12);
          color: white;
          outline: none;
          transition: border-color .2s,box-shadow .2s,background .2s;
        }

        .register-input:focus {
          border-color: rgba(192,132,252,.8);
          background: rgba(168,85,247,.04);
          box-shadow: 0 0 0 3px rgba(168,85,247,.10);
        }

        .register-input::placeholder {
          color: #777080;
        }

        .register-button {
          background: linear-gradient(105deg,#9333EA,#6D28D9);
          box-shadow: 0 0 25px rgba(147,51,234,.24);
          transition: transform .2s,box-shadow .2s;
        }

        .register-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(147,51,234,.4);
        }

        .register-heading {
          background: linear-gradient(100deg,#fff,#e9d5ff 55%,#a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .zoro-register * {
            transition: none !important;
          }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
              <Gamepad2 size={24} />
            </span>

            <span className="text-lg font-black tracking-tight">
              ZORO<span className="text-purple-400"> GAMES</span>
              <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
                ENTER THE NEXT LEVEL
              </span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
          >
            <ChevronLeft size={16} />
            BACK TO HOME
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-14">
        {/* Left hero panel */}
        <section className="hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
            <div className="absolute inset-0">
              <img
                src="/images/zoro-hero.png"
                alt=""
                className="h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
              <div className="absolute inset-0 bg-purple-950/20" />
            </div>

            <div className="relative flex min-h-[570px] flex-col justify-between p-9 xl:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
                <Zap size={14} className="text-cyan-300" />
                <span className="text-[10px] font-black tracking-[.2em]">
                  YOUR JOURNEY STARTS HERE
                </span>
              </div>

              <div>
                <p className="mb-4 text-xs font-black tracking-[.3em] text-purple-300">
                  CREATE YOUR PLAYER ID
                </p>

                <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
                  JOIN THE
                  <br />
                  <span className="register-heading">NEXT LEVEL.</span>
                </h1>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                  Create your ZORO GAMES account and get ready to explore,
                  compete and build your own gaming journey.
                </p>

                <div className="mt-9 space-y-4 border-t border-white/15 pt-7">
                  {[
                    "Your own player account",
                    "Access to available gaming features",
                    "A foundation for future achievements"
                  ].map(item => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/75"
                    >
                      <CheckCircle2 size={17} className="shrink-0 text-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration form */}
        <section className="mx-auto w-full max-w-[480px]">
          <div className="register-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300">
                <Gamepad2 size={29} />
              </div>

              <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
                PLAYER REGISTRATION
              </p>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                CREATE YOUR <span className="register-heading">ACCOUNT.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Choose your identity. Enter the ZORO universe.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Sponsor ID - first field */}
              <div>
                <label
                  htmlFor="reg-sponsor"
                  className="mb-2 block text-xs font-bold text-white/80"
                >
                  Sponsor ID  
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
                  />

                  <input
                    id="reg-sponsor"
                    name="sponsorId"
                    type="text"
                    autoComplete="off"
                    value={form.sponsorId}
                    onChange={updateField}
                    onBlur={() => lookupSponsorName(form.sponsorId)}
                    placeholder="Enter your sponsor's ZG ID"
                    className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
                  />
                </div>

                {sponsorAutoDetected && (
                  <p className="mt-2 text-xs font-semibold text-cyan-300">
                    Referral code detected automatically from your link.
                  </p>
                )}

                {sponsorLookupLoading && (
                  <p className="mt-2 text-xs text-white/50">
                    Checking sponsor...
                  </p>
                )}

                {sponsorName && (
                  <p className="mt-2 text-sm font-semibold text-emerald-300">
                    Sponsor Name: {sponsorName}
                  </p>
                )}
              </div>

              {/* Full name */}
              <div>
                <label htmlFor="reg-name" className="mb-2 block text-xs font-bold text-white/80">
                  Full name
                </label>
                <div className="relative">
                  <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    minLength={3}
                    maxLength={50}
                    pattern="[A-Za-z ]{3,50}"
                    required
                    value={form.name}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
                  />
                </div>
                <p className="mt-2 text-[10px] text-white/35">
                  3–50 characters · Letters and spaces only
                </p>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="mb-2 block text-xs font-bold text-white/80">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@gmail.com"
                    className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="reg-mobile" className="mb-2 block text-xs font-bold text-white/80">
                  Mobile number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    minLength={10}
                    maxLength={15}
                    pattern="[0-9]{10,15}"
                    required
                    value={form.mobile}
                    onChange={updateField}
                    placeholder="10–15 digit mobile number"
                    className="register-input rounded-xl py-4 pl-12 pr-4 text-sm"
                  />
                </div>
              </div>

              {/* Country - no default */}
              <div>
                <label htmlFor="reg-country" className="mb-2 block text-xs font-bold text-white/80">
                  Country
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <select
                    id="reg-country"
                    name="country"
                    required
                    value={form.country}
                    onChange={updateField}
                    className="register-input appearance-none rounded-xl py-4 pl-12 pr-4 text-sm"
                  >
                    <option value="" className="bg-[#140d20]">
                      Select your country
                    </option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country} className="bg-[#140d20]">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Wallet address */}
              <div>
                <label htmlFor="reg-wallet" className="mb-2 block text-xs font-bold text-white/80">
                  USDT BEP-20 wallet address
                </label>
                <div className="relative">
                  <WalletCards size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-wallet"
                    name="walletAddress"
                    type="text"
                    autoComplete="off"
                    required
                    value={form.walletAddress}
                    onChange={updateField}
                    placeholder="0x followed by 40 hexadecimal characters"
                    className="register-input rounded-xl py-4 pl-12 pr-4 text-sm font-mono"
                  />
                </div>
                <p className="mt-2 text-[10px] text-white/35">
                  Check the network and address carefully before registering.
                </p>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="reg-password" className="mb-2 block text-xs font-bold text-white/80">
                  Create password
                </label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={form.password}
                    onChange={updateField}
                    placeholder="Create a strong password"
                    className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {form.password.length > 0 && (
                  <div className="mt-3">
                    <div className="mb-2 flex gap-1.5">
                      {[1, 2, 3, 4].map(n => (
                        <div
                          key={n}
                          className={`h-1 flex-1 rounded-full transition ${
                            strength >= n
                              ? strength >= 4
                                ? "bg-cyan-300"
                                : strength >= 3
                                  ? "bg-purple-400"
                                  : "bg-pink-500"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {passwordChecks.map(item => (
                        <p
                          key={item.label}
                          className={`flex items-center gap-1.5 text-[10px] ${
                            item.valid ? "text-cyan-300" : "text-white/35"
                          }`}
                        >
                          <CheckCircle2 size={12} />
                          {item.label}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="reg-confirm" className="mb-2 block text-xs font-bold text-white/80">
                  Confirm password
                </label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                  <input
                    id="reg-confirm"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.confirmPassword}
                    onChange={updateField}
                    placeholder="Enter password again"
                    className="register-input rounded-xl py-4 pl-12 pr-12 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 hover:text-purple-300"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {form.confirmPassword && (
                  <p className={`mt-2 text-[10px] ${
                    form.password === form.confirmPassword
                      ? "text-cyan-300"
                      : "text-pink-400"
                  }`}>
                    {form.password === form.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-purple-500"
                />
                <span className="text-xs leading-6 text-white/55">
                  I agree to the{" "}
                  <Link to="/terms" className="font-bold text-purple-300 hover:text-cyan-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="font-bold text-purple-300 hover:text-cyan-300">
                    Privacy Policy
                  </Link>.
                </span>
              </label>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-pink-400/20 bg-pink-500/[0.07] p-4 text-xs leading-6 text-pink-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="register-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    CREATING ACCOUNT...
                  </>
                ) : (
                  <>
                    CREATE MY ACCOUNT <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
                ALREADY A PLAYER?
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Link
              to="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
            >
              SIGN IN TO YOUR ACCOUNT <ArrowRight size={16} />
            </Link>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
              <p className="text-[10px] leading-5 text-white/45">
                Your account must be created and validated by the ZORO GAMES
                server. Never share your password with anyone.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] text-white/35">
            © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
          </p>
        </section>
      </main>

      {/* Registration credentials popup */}
      {credentialsModal.open && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-success-title"
            className="w-full max-w-md rounded-2xl border border-purple-300/25 bg-[#140d20] p-6 shadow-2xl sm:p-7"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 size={30} />
            </div>

            <h2 id="registration-success-title" className="text-center text-2xl font-black text-white">
              Registration Successful!
            </h2>

            <p className="mt-2 text-center text-sm text-white/60">
              Save your login details safely. You will need them to sign in.
            </p>

            <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  User ID
                </p>
                <p className="mt-1 break-all text-base font-bold text-cyan-300">
                  {credentialsModal.userId || "Not returned by server"}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Login Password
                </p>
                <p className="mt-1 break-all text-base font-semibold text-white">
                  {credentialsModal.loginPassword}
                </p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Transaction Password
                </p>
                <p className="mt-1 break-all text-base font-semibold text-white">
                  {credentialsModal.transactionPassword || "Not returned by server"}
                </p>
              </div>
            </div>

            {!credentialsModal.transactionPassword && (
              <p className="mt-3 text-xs leading-5 text-amber-300">
                Server ne transaction password response mein nahi bheja.
                Backend registration route mein ise return karna zaroori hai.
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                setCredentialsModal({
                  open: false,
                  userId: "",
                  loginPassword: "",
                  transactionPassword: ""
                });
                navigate("/login");
              }}
              className="register-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em]"
            >
              OK · GO TO LOGIN <ArrowRight size={17} />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}