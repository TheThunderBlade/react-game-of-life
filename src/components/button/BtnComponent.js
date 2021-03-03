import React from 'react'

const Button = props => (
    <div className="but btn-group btn-success p-2 m-1" style={{borderRadius: '5px'}} onClick={props.onClickHandler()} >{props.BtnName}</div>
)

export default Button