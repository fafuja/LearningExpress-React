import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Login } from "./pages/login/" //Because it has only index.js, u can ignore it.
import { Dashboard } from "./pages/dashboard/"
import { Register } from "./pages/register/" 

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/dashboard' exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}
