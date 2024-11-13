import { useRef, useState } from "react";

function Search({setLocationId}){
    const [error, setError] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) =>{
        e.preventDefault()
        const id = parseInt(inputRef.current.value)

        if(isNaN(id)){
            setError('❌❌Introduce a valid integer❌❌')
            setTimeout(() => {
                setError('')
            },4000)
            return

        } else if(id < 1 || id > 126){
            setError('❌❌Hey you have to enter an integer among 1 and 126 (valid IDs)❌❌')
            setTimeout(() => {
                setError('')
            },4000)
            return
        }

        setLocationId(id)
        e.target.reset()
    }
    return(
        <form onSubmit={onSubmit} className="search__box">
            <input ref={inputRef} type='text' placeholder="Enter the planet ID" className="input__box"/>
            <button className="btn">Search</button>
            <p><b>{error && error}</b></p>
        </form>
    )
}

export default Search;