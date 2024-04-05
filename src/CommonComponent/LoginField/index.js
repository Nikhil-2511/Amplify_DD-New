import React from "react";
import './style.scss';


function LoginField ({className, icon, type, value, placeholder, error, onChange}) {
  return (
    <div className={'relative padding-b25 ' + (className ? className : '')}>
      <div className={"login-field-container grad-3 " + (error ? 'error-field' : '')}>
        {
          icon &&
          <div className="inline-block login-field-icon-container"><img src={icon} /></div>
        }
        <div className={"login-field-input-container flex-1 " + (icon ? 'padding-l17' : '')}>
          <input className="login-field-input" onChange={onChange} value={value} type = {type || 'text'} placeholder={placeholder || ""} />
        </div>
      </div>
        {
          error &&
          <div className="text-danger text-14 font-600 padding-l5 padding-t5 absolute">{error}</div>
        }
    </div>
  )
}

export default LoginField;