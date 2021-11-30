import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'
import Header from './views/components/Header'
import AdminNavBar from './views/components/AdminNavBar'
import { Home } from './views/components/Home'
import {Login} from './views/containers/Login'
import { Compteslist } from './views/containers/Comptes-list';
import Comptedetail from './views/containers/CompteDetail';
import { CompteCreation } from './views/containers/CompteCreation';
import { CompteModification } from './views/containers/CompteModification'
import { Formationslist } from './views/containers/Formations-list';
import { FormationDetail } from './views/containers/FormationDetail';
import { FormationCreation } from './views/containers/FormationCreation'
import { FormationModification } from './views/containers/FormationModification'
import { Seanceslist } from './views/containers/Seances-list';
import { SeanceDetail } from './views/containers/SeanceDetail';
import { SeanceCreation } from './views/containers/SeanceCreation';
import { SeanceModification } from './views/containers/SeanceModification';
import { SeancePDF } from './views/containers/SeancePDF';
import StagiairesList from './views/containers/Stagiaires-list';


function App() {
  return (

    <ApolloProvider client={client}>
     
        <Router basename="react/app">
          <Header />
          <AdminNavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/comptes" component={Compteslist} />
            <Route path="/compte/:id" component={Comptedetail} />
            <Route path="/compteModification/:id" component={CompteModification} />
            <Route path="/compteCreation" component={CompteCreation} />
            <Route path="/formations" component={Formationslist} />
            <Route path="/formation/:id" component={FormationDetail} />
            <Route path="/formationCreation" component={FormationCreation} />
            <Route path="/formationModification/:id" component={FormationModification} />
            <Route path="/login" component={Login} />
            <Route path="/seances" component={Seanceslist} />
            <Route path="/seance/:id" component={SeanceDetail} />
            <Route path="/seanceCreation" component={SeanceCreation} />
            <Route path="/seanceModification/:id" component={SeanceModification} />
            <Route path="/seancePdf/:id" component={SeancePDF} />
            <Route path="/stagiaires" component={StagiairesList} />
          </Switch>
        </Router>
     
    </ApolloProvider>

  );
}

export default App;
