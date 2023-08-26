import Blog01 from "./Blog01";
import Blog02 from "./Blog02";
import BlogDetails01 from "./BlogDetails01";
import BlogDetails02 from "./BlogDetails02";
import Collection from "./Collection";
import Contact from "./Contact";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Explore01 from "./Explore01";
import Explore02 from "./Explore02";
import Explore03 from "./Explore03";
import Explore04 from "./Explore04";
import Faqs from "./Faqs";
import HelpCenter from "./HelpCenter";
import Home01 from "./Home01";
import Home02 from "./Home02";
import Tienda from "./Tienda";
import Home04 from "./Home04";
import Mint from "./Mint";
import Inicio from "./Inicio";
import Swap from "./Swap";

import Auth from "./Auth";
import ProductDetail from "./ProductDetail";
import Carrito from "./Carrito";
import CheckOut from "./CheckOut";
import Orders from "./Orders";
import Pagos from "./Pagos";







import ItemDetails01 from "./ItemDetails01";
import ItemDetails02 from "./ItemDetails02";
import LiveAutions01 from "./LiveAutions01";
import LiveAutions02 from "./LiveAutions02";
import Login from "./Login";
import Ranking from "./Ranking";
import SignUp from "./SignUp";
import Wallet from "./Wallet";
import AdminProduct from "./Admin";




const routes = [
  // { path: '/', component: <Home01 />},
  { path: '/', component: <Inicio />},
  { path: '/home-v2', component: <Home02 />},
  { path: '/tienda', component: <Tienda />},
  { path: '/home-v4', component: <Home04 />},
  { path: '/mint', component: <Mint />},
  { path: '/swap', component: <Swap />},

  { path: '/sesion', component: <Auth />},
  { path: '/producto/:id', component: <ProductDetail />},
  { path: '/carro-compras', component: <Carrito />},
  { path: '/checkout', component: <CheckOut />},
  { path: '/ordenes', component: <Orders />},
  { path: '/admin', component: <AdminProduct />},
  { path: '/retiro', component: <Pagos />},







  { path: '/explore-v1', component: <Explore01 />},
  { path: '/explore-v2', component: <Explore02 />},
  { path: '/explore-v3', component: <Explore03 />},
  { path: '/explore-v4', component: <Explore04 />},
  { path: '/coleccion', component: <Collection />},
  { path: '/live-auctions-v1', component: <LiveAutions01 />},
  { path: '/live-auctions-v2', component: <LiveAutions02 />},
  { path: '/item-details-v1', component: <ItemDetails01 />},
  { path: '/item-details-v2', component: <ItemDetails02 />},
  { path: '/dashboard', component: <Dashboard />},
  { path: '/ranking', component: <Ranking />},
  { path: '/help-center', component: <HelpCenter />},
  { path: '/faqs', component: <Faqs />},
  { path: '/wallet', component: <Wallet />},
  { path: '/login', component: <Login />},
  { path: '/signup', component: <SignUp />},
  { path: '/create', component: <Create />},
  { path: '/blog-v1', component: <Blog01 />},
  { path: '/blog-v2', component: <Blog02 />},
  { path: '/blog-details-v1', component: <BlogDetails01 />},
  { path: '/blog-details-v2', component: <BlogDetails02 />},
  { path: '/contact', component: <Contact />},



]

export default routes;