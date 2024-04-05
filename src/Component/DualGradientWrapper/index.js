import React from "react";

function DualGradientWrapper ({children}) {
  return (
      <div className='!h-[100vh] seller-onboarding-background-container'>
        {children}
      </div>
  )
}

export default DualGradientWrapper;