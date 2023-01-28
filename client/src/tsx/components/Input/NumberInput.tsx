import React, {ChangeEvent, useEffect, useState} from 'react'
import {StyledComponent} from "styled-components";

interface NumberInputP {
    value?: number,
    setFormValue: (value: number) => void,
    StyledInput: StyledComponent<any, any>
}

const NumberInput = ({value, setFormValue, StyledInput}: NumberInputP) => {
    const [newValue, setNewValue] = useState(value || 0)
    useEffect(() => {
        setNewValue(value || 0)
    }, [value])
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0
        setNewValue(value)
        setFormValue(value)
    }
    return <StyledInput value={newValue} onChange={onChange} type="text"/>
}
export default NumberInput