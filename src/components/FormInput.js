import { useState } from "react"
import "./FormInput.css"

const FormInput = (props) => {
    const [focused, setFocused] = useState(false)
    const { id, label, onChangeHandler, errorMessage, ...inputProps } = props

    const handleFocus = (e) => {
        setFocused(true)
    }

    return (
        <div className="formInput">
            <label htmlFor={id}>{label}</label>
            <input id={id} {...inputProps} onChange={onChangeHandler} onBlur={handleFocus} onFocus={() => inputProps.name === "city" && setFocused(true)} focused={focused.toString()} />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput