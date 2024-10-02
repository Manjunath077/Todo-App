import React, { useRef, useState } from 'react'
import '../css/Todo.css'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

function Todo() {
    let [item, setItem] = useState('')
    let [items, setItems] = useState([])
    let [edit,setEdit] = useState(false)
    let [itemIndex,setItemIndex] = useState(null)
    let ref = useRef('')

    
    let getItem = (e) => {
        setItem(e.target.value)
    }
    let storeItems = () => {
        if(item){
            setItems([...items, item])
            setItem("")
        }else{
            alert("Item Cannot be null")
        }
    }

    let deleteCurrent = (e) => {
        let card = e.target.closest('.cardcontainer')
        let h4 = card.querySelector('.heading')
        let name = h4.innerText
        checkAndRemove(name)
    }
    let checkAndRemove = (name)=>{
        let newItems = items.filter((ele)=>{
            return ele !== name
        })
        setItems(newItems)
    }

    let editCurrent = (e)=>{
        let card = e.target.closest('.cardcontainer')
        let h4 = card.querySelector('.heading')
        let name = h4.innerText
        let index = items.indexOf(name)
        setItemIndex(index)
        setEdit(!edit)
        ref.current.focus()
        setItem(name)
    }
    let updateCurrent = ()=>{
        items[itemIndex] = item
        setItems([...items])
        setEdit(!edit)
        setItem('')
    }

    return (
        <section className='todocontainer'>
            <div className='innercontainer'>
                <h2>Today's Agenda</h2>
                <div className='todocard'>
                    <input ref={ref} placeholder='Enter an item' value={item} onChange={getItem} />
                    <button onClick={storeItems}>Add Item</button>
                    {edit? <button onClick={updateCurrent}>Update</button>:""}
                </div>
                <div className='todocardedit'>
                    <input />
                    <button>Edit item</button>
                </div>
                <div className='itemscontainer'>
                    {items && items.length > 0?
                        (items.map((ele, index) => {
                            return (
                                <div key={index} className='card'>
                                    <div className='cardcontainer'>
                                        <h4 className='heading'>{ele}</h4>
                                        <button onClick={editCurrent}><FiEdit /></button>
                                        <button onClick={deleteCurrent}><RiDeleteBin5Fill /></button>
                                    </div>
                                </div>
                            )
                        })) :
                        (<h4>No items add one !</h4>) 
                    }
                </div>
            </div>
        </section>
    )
}

export default Todo

