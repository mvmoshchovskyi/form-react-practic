import React from 'react'

const List = ({items,editItem,removeItem}) => {
    return (<div className='grocery-container'>
        {
            items.map(item => {
                const {id, title} = item
                return (
                    <article key={id} className='grocery-item'>
                        <p className='title'>{title}</p>
                        <button className='btn-container'>
                            <button type='button' className='edit-btn' onClick={()=>editItem(id)}>
                               edit
                            </button>
                            <button type='button' className='delete-btn' onClick={()=>removeItem(id)}>
                                remove
                            </button>
                        </button>
                    </article>
                )
            })
        }
    </div>)
}

export default List
