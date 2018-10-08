import React from 'react';
import ReactDOM from 'react-dom';
import Testimonial from './components/testimonial.jsx';
import CTA from './components/cta.jsx';
import Content from './components/filterable-content.jsx'

const App = () => {
  return (
    <div>
      <Testimonial />
      <CTA />
      <Content />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
