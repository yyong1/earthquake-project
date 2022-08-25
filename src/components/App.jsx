import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Details from './Details';

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
