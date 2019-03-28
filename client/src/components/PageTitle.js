import React from 'react';

function PageTitle(props) {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h2>{props.title}</h2>
    </div>
  );
}

export default PageTitle;
