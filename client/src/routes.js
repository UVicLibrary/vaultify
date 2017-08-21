import React from 'react';
import { BrowserRouter, Route, Switch , Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import LandingContainer from './containers/LandingContainer.jsx'; 
import UploadContainer from './containers/UploadContainer.jsx';
import TranslateContainer from './containers/TranslateContainer.jsx';
import ExportContainer from './containers/ExportContainer.jsx';

const routes = (
    
    <BrowserRouter>
    <MuiThemeProvider>
        <Switch>
            <Route exact path='/' component={LandingContainer} />
            <Route path='/upload' component={UploadContainer} />
            <Route path='/translate' component={TranslateContainer} />
            <Route path='/export' component={ExportContainer} />
            <Redirect from='*' to='/' />
        </Switch>
    </MuiThemeProvider>
    </BrowserRouter>   
    
)
export default routes;
