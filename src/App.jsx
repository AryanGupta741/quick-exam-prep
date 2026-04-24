import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Quizs from "./Components/Quizs"
import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import CategoryDashboard from "./Components/CategoryDashboard" 
import CreateCategory from "./Components/CreateCategory"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ThemeProviderWrapper } from "./context/ThemeContext"
import { CssBaseline } from "@material-ui/core"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useAuth();
    
    if (loading) return null; 

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

const App = () => {
    return (
        <ThemeProviderWrapper>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <ProtectedRoute path="/dashboard" component={CategoryDashboard} />
                        <ProtectedRoute path="/create-category" component={CreateCategory} />
                        <ProtectedRoute path="/quiz/:category" component={Quizs} />
                        <Route exact path="/">
                            <Redirect to="/dashboard" />
                        </Route>
                    </Switch>
                </Router>
            </AuthProvider>
        </ThemeProviderWrapper>
    )
}

export default App  