import { Alert } from "./alert/Alert";
import Navbar from "./navbar/Navbar";
import SideBar from "./sidebar/SideBar";
import { ToastContainer } from "react-toastify";
const Layout = ({ children }) => {
  return (
    <>
      <Alert></Alert>
      <Navbar></Navbar>
      <SideBar />
    

      {children}
    </>
  );
};

export default Layout;
