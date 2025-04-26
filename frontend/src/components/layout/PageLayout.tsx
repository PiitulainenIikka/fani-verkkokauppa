import React from 'react';

const PageLayout:React.FC<React.PropsWithChildren> = ({ children }) => {

  return (
    <div className=''>
      {children}
    </div>
  );
};
export default PageLayout;