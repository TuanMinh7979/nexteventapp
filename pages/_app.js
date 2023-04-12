import "@/styles/globals.css";
import reduxStore from "@/redux/store";
import { Provider } from "react-redux";
import ThemeContextProvider from "@/context/ThemeContextProvider";
import AuthContextProvider from "@/context/AuthContextProvider";
import GlobalContextProvider from "@/context/GlobalContextProvider";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <GlobalContextProvider>
            <>
              <Layout>
                <Component {...pageProps} />

              </Layout>
              <ToastContainer
                position="bottom-right" // or "bottom-center"
                autoClose={30000}
                hideProgressBar={false}
                newestOnTop={true} // display newest toast on top
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </>
          </GlobalContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}
