import React from 'react';
import { Route } from "react-router-dom";
import PickMovie from './pages/PickMovie';

function App() {
  return (
      <>
        <Route path="/" exact component={PickMovie} />
      </>
  );
}

export default App;
