import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {P} from "../../types/inputI";

const Input = styled.input`
  outline: none;
  padding: 10px 20px;
  margin: 10px 0;
  display: block;
  width: 100%;
  border: 1px solid #282c34;
`
const TextInput = (props: P) => {
    const [value, setValue] = useState("");
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeInput && props.onChangeInput(props.name, e.target.value as string);
    }
    return(
        <Input type="text" onChange={inputChange} name={props.name} placeholder={props.placeholder} id=""/>
    )
}

export default TextInput;
