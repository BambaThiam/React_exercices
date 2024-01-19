import React from 'react'
import Style from './Button.module.css'

export const Button = ({children, onClick, type}) => {
  return (
    // <button onClick={onClick} className={Style.btn}>{children}</button>
    <button onClick={onClick} className={`button ${Style[type]}`}>{children}</button>
  )
}
