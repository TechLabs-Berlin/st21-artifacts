import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import NotFoundPage from "../components/NotFoundPage";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";

// dynamic routing with :id

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
