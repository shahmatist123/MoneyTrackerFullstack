import React, {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components'
import {P} from "../../types/inputI";
import axios from "axios";
import {addFile} from "../../api/MoneyApi/MoneyApi";

const Input = styled.input`
  margin-top: 40px;
`
const Span = styled.span`
  display: inline-block;
  margin-top: 10px;
`

const FileInput = (props: P) => {
    const fileLoad = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const data = new FormData()
        const file = event.target.files || []
        if (file[0]) {
            data.append("JSON_file", file[0])
        }
        addFile(data)
    }

    return(
        <>
            <label>
                <Input type="file" name={props.name} multiple={false} accept={"application/json"} onChange={fileLoad}/>
                <Span>{props.placeholder}</Span>
            </label>
        </>
    )
}

export default FileInput;
