import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/screen/Home";
import NotFoundScreen from "./components/screen/NotFoundScreen";
import AdminScreen from "./components/screen/Admin/AdminScreen";
import AdminLogin from "./components/screen/AdminLogin";
import Footer from "./components/layout/Footer";
import Loading from "./components/widgets/Loading";
import Blogs from "./components/screen/Blog";
import BlogsDetail from "./components/screen/BlogsDetail";
import { useDispatch, useSelector } from "react-redux";
import Collections from "./components/screen/Collections";
import { useToast } from "@chakra-ui/react";
import ProductDetail from "./components/screen/ProductDetail";
import Cart from "./components/screen/Cart";
import Info from "./components/screen/Info";
import { showToast } from "./Redux/Ducks/notyfyDux";

function App() {
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.notify.visible);
  const toastContent = useSelector((state) => state.notify.toast);
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showToast(null));
  }, [dispatch]);

  useEffect(() => {
    if (toastContent !== null) {
      toast(toastContent);
    }
  }, [toastContent, toast]); //TODO ??

  return (
    <Router>
      <Header />
      <Loading isOpen={loading} />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/candle/:id" element={<ProductDetail />} />
        <Route path="/collections/:cat/:skip" index element={<Collections />} />
        <Route path="*" element={<NotFoundScreen title={"404 Not found!"} />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/news/find/:id" element={<BlogsDetail />} />
        <Route path="/info/:routeName" element={<Info />} />

        {token !== null ? (
          <Route
            path="/administrator/:name/:skip/:limit"
            element={<AdminScreen />}
          />
        ) : null}
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
