import React, {useState, useEffect} from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = ()=>{
    let list = JSON.parse(localStorage.getItem('list'))
    if (list){
        return list
    }
    return []
}

function App() {
    const [name, setName] = useState('')
    const [list, setList] = useState(getLocalStorage())
    const [isEditing, setIsEditing] = useState(false)
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        type: 'success'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            showAlert(true, 'please add some item', 'danger')
        } else if (name && isEditing) {
           setList( list.map(item=>{
               if(item.id ===editID){
                   return {...item,title:name}
               }
               return item
           }))
            setName('')
            setEditID(null)
            setIsEditing(false)
            showAlert(true, 'new item was updated', 'success')

        } else {
            showAlert(true, 'new item was added', 'success')
            let newName = {id: new Date().getTime().toString(), title: name}
            setList([...list, newName])
            setName('')
        }

    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        showAlert(true, 'items was deleted', 'danger')
    }
    const editItem = (id) => {
        const newEdit = list.find(item => item.id === id)

        setName(newEdit.title)
        setIsEditing(true)
        setEditID(id)

    }

    const showAlert = (show = false, msg = '', type = 'danger') => {
        return setAlert({show, msg, type})
    }

    const clearAllItems = () => {
        setList([])
        showAlert(true, 'all items was deleted', 'danger')
    }

    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify( list))
    },[list])

    return (
        <section className='section-center'>
            <form action="" className='grocery-form' onSubmit={handleSubmit}>
                {alert.show && <Alert removeAlert={showAlert} {...alert} list={list}/>}
                <h3>grosery bud</h3>
                <div className="form-control">
                    <input
                        type="text"
                        className='grocery'
                        placeholder='e.g.eggs'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className='submit-btn' type='submit'>{isEditing ? 'edit' : 'add'}</button>
                </div>
            </form>
            {
                list.length > 0 && (
                    <div className="grocery-container">
                        <List items={list} removeItem={removeItem} editItem={editItem}/>

                        <button className="clear-btn" onClick={clearAllItems}>
                            Clear items
                        </button>
                    </div>
                )
            }
        </section>
    )
}
export default App