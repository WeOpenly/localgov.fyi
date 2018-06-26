import React from 'react';

import Footer from '../components/Footer';

export default ({ children }) => (
  <div>
    {children()}
    <Footer />
  </div>
);
