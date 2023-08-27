import React from 'react'

const Card = () => {
    return (
        <div className='my-cardpool'>
            <div className='my-cardpool-item'>

                <div>
                    <p><span>2% Apr</span></p>
                </div>

                <div>
                    <p><span>2 Tokens</span></p>
                </div>

            </div>

            <div className='my-cardpool-item'>


                <div>
                    <p><span>2</span></p>
                    <p><span>Acumulado</span></p>
                </div>

                <div>
                    <p><span>2</span></p>
                    <p><span>Tiempo restante</span></p>
                </div>


            </div>

            <div className='my-cardpool-item'>


                <div>
                    <p><span>100 Cap</span></p>
                </div>

                <div>
                    <p><span>2</span></p>
                    <p><span>Bloqueados</span></p>
                </div>


            </div>

            <div className='my-cardpool-item'>
                <button type="button">  
                    Reclamar
                </button>
                <button type="button">
                    Retirar
                </button>
            </div>
        </div>
    )
}

export default Card