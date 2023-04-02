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
const InputCheckbox = styled.input`
  outline: none;
  padding: 10px 30px;
  width: 14px;
  margin-right: 15px;
  cursor: pointer;
`

const SpanCheckbox = styled.span`
  color: #fff;
`
const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
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
            return <InputSubmit onClick={props.onSubmit} {...props}/>
        case "inputSumm":
            return <SumInput {...props}/>
        case "file":
            return <FileInput {...props}/>
        case "checkbox":
            return <>
                <LabelCheckbox>
                    <InputCheckbox {...props}/>
                    <SpanCheckbox>{props.placeholder}</SpanCheckbox>
                </LabelCheckbox>
            </>
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
