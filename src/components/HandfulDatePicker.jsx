import React, { useState } from "react"
import { Input } from "antd"
import { dateRegex, logSomething } from "../utils/utils"



const HandfulDatePicker = ({key = '', onTrigger}) => {

    let placeHolder = 'مثال 08/02/1401'

    // empty, 'warning', 'error'
    const [status, setStatus] = useState('')

    const onChangeHandler = (event)=>{
            const dateValue = event.target.value
            if ( dateValue?.length > 0) {
                if (dateValue.match(dateRegex)) {
                    onTrigger(dateValue, true)
                    setStatus('')
                } else {
                    onTrigger(dateValue, false)
                    setStatus('error')
                }
            } else {
                onTrigger(dateValue, false)
                setStatus('')
            }
    }


    return (<Input key={key}
        onChange={onChangeHandler}
        status={status}
        placeholder={placeHolder} />)

}


export default HandfulDatePicker