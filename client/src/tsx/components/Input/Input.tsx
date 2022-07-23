import React, {useState} from 'react';
import TextInput from "./TextInput";
import DropDownInput from "./DropDownInput";
import {P} from "../../types/inputI";
import styled from "styled-components";
import SumInput from "./SumInput";
import FileInput from "./FileInput";
const InputSubmit = styled.input`
  outline: none;
  padding: 10px 30px;
  margin: 10px 0;
  display: block;
  width: 100%;
  cursor: pointer;
`

const getCurrentInput = (props: P): JSX.Element | undefined => {
    switch (props.type) {
        case "text":
            return <TextInput {...props}/>
        case "dropDownC":
            return <DropDownInput {...props}/>
        case "dropDownR":
            return <DropDownInput {...props}/>
        case "submit":
            return <InputSubmit onClick={props.onSubmit} type="submit"/>
        case "inputSumm":
            return <SumInput {...props}/>
        case "file":
            return <FileInput {...props}/>
    }
}

const Input = (props: P) => {
    const input = getCurrentInput(props)
    return(
        <>
            {input && input}
        </>
    )
}

export default Input;
