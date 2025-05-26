// const [token, setToken] = useState(() => localStorage.getItem("token"));
// const [open, setOpen] = useState(false);
// const [user, setUser] = useState(null);
// const navigate = useNavigate();
//
//
//
// useEffect(() => {
//     if (token) {
//         localStorage.setItem("token", token);
//         setOpen(true);
//         try {
//             const decoded = jwtDecode(token);
//             setUser({
//                 email: decoded.email,
//                 username: decoded.sub || decoded.username || decoded.name
//             });
//         } catch (e) {
//             setUser(null);
//         }
//
//     } else {
//         localStorage.removeItem("token");
//         setUser(null);
//     }
// }, [token]);
//
// if (!token) {
//     return (
//
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/register" element={<Register onRegister={setToken} />} />
//                 <Route path="*" element={<Login onLogin={setToken} />} />
//                 <Route path="/dex-charts" element={<DexProtocolDetailedChartsPage />} />
//
//             </Routes>
//         </BrowserRouter>
//     );
// }