import axios from "axios"
import { useState } from "react"
import "./App.css"
import FormInput from "./FormInput"


const App = () => {

    const [values, setValues] = useState({
        initials:"",
        insertion:"",
        lastName:"",
        postcode:"",
        houseNumber:"",
        street:"",
        city:"",
        email:"",
    })
    const [isPostcodeValid, setIsPostcodeValid] = useState(false)

    const inputs = [
        {
            id:1,
            name:"initials",
            type:"text",
            placeholder:"i.e. OJ",
            errorMessage: "Initials should be 1 or 2 word characters NOT separated by a space and shouldn't include any special character!",
            label:"Initials",
            required: true,
            pattern: "^[A-Za-z]{1,2}$"
        },
        {
            id:2,
            name:"insertion",
            type:"text",
            placeholder:"i.e Van",
            label:"Insertion",
        },
        {
            id:3,
            name:"lastName",
            type:"text",
            placeholder:"i.e. Aicardi",
            errorMessage: "Last name should be 3-16 characters and shouldn't include any special character!",
            label:"Last Name",
            required: true,
            pattern: "^[A-Za-z]{3,16}$"
        },
        {
            id:4,
            name:"email",
            type:"email",
            placeholder:"i.e. octi.aicardi@gmail.com",
            errorMessage: "It should be a valid email address",
            label:"Email",
            required: true
        },
        {
            id:5,
            name:"postcode",
            type:"text",
            placeholder:"i.e. 1083 HD",
            errorMessage: "It should be a valid Dutch postcode",
            label:"Postcode",
            required: true,
            pattern: "^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Za-z]{2}$"
        },
        {
            id:6,
            name:"houseNumber",
            type:"text",
            placeholder:"House Number",
            errorMessage: "House number is required",
            label:"House Number",
            required: true
        },
        {
            id:7,
            name:"street",
            type:"text",
            placeholder:"Street",
            label:"Street",
        },
        {
            id:8,
            name:"city",
            type:"text",
            placeholder:"City",
            label:"City",
        },
        
    ]

    const handelSubmit = (e) => {
        e.preventDefault()
        
    }

    const onChangeHandler = (e) => {
        const {name, value, validity} = e.target
        // console.log(name, value)
        setValues({...values, [name]: value})
        console.log(values)
        if(name === 'postcode'){
            if(validity.valid){
                // console.log(validity.valid)
                setIsPostcodeValid(true)
                // console.log(isPostcodeValid)
                // console.log(values.houseNumber.length)
                if(values.houseNumber.length > 0){
                    //call API
                    // console.log(values.postcode)
                    console.log(values)
                    setTimeout(() => {
                        callApi()
                    }, 1000);
                }
            }
            else{
                setIsPostcodeValid(false)
                // console.log(validity.valid)
                // console.log(isPostcodeValid)
            }
        }
        if(name === 'houseNumber' && isPostcodeValid){
            // console.log(isPostcodeValid)
            // call Api
            setTimeout(() => {
                callApi()
            }, 1000);
        }
    }

    const callApi = ()=>{
        console.log(values.houseNumber, values.postcode)
        axios.get('https://api.myptv.com/geocoding/v1/locations/by-text', {
            params:{
                searchText: `${values.houseNumber} ${values.postcode} `,
                // searchText: `41 1083HD`,
                apiKey: "RVVfODUyZDE1OWJjMzgwNDdjMDlkNmMxMTQ3NjI4YmFhN2U6YjI4Mzc0NjctODJhMS00ZTgyLTk3M2UtMTUwMzgzZTUxZGI0"
            }
        }).then(response=> {
            const data = response.data.locations[0].address
            // console.log(data)
            // console.log(data.street)
            // console.log(data.city)
            setValues({...values, city: data.city, street: data.street})
        })
    }
    // console.log(values)

    return (
        <div className="app">
            <form onSubmit={handelSubmit}>
                <h1>Incentro Form</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChangeHandler}/>
                ))}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default App