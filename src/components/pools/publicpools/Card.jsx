import React from 'react'

function Card (data){
  return (
    <div className='cardpool'>
        <div className='cardpool-info'>
            <span>
                0/100
            </span>
            <span>
                {data.stakeApr}%
            </span>
        </div>

        <div className='cardpool-input'>
            <input type="text"
             value={"0"}   
            /><span>
                /100
            </span>
        </div>

        <div className='cardpool-action'>
            <button type="button">
                Accion
            </button>
        </div>
    </div>
  )
}

export default Card