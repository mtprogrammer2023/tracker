import React, { Component } from 'react';
import Login from './components/Login';
import { Route, Routes, Navigate } from 'react-router-dom' ;
import Dashboard from './components/dashboard';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <>    
                <Routes>
                    <Route path='/' Component={Login} />   
                    <Route path='/dashboard' Component={Dashboard}  />
                </Routes>
            </>
        );
    }
}
 
export default App;