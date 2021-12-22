import "./App.scss";
import { Route, Switch } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Superadmin from "./Pages/Superadmin/Sueradmin";
import Orders from "./Pages/Orders/Orders";
import Adminclinics from "./Pages/Adminclinics/Adminclinics";
import Admin from "./Pages/Admin/Admin";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/superadmin" component={Superadmin} />
        <Route exact path="/adminclinics" component={Adminclinics} />
        <Route exact path="/admin" component={Admin} />


      </Switch>
    </>
  );
}

export default App;
