import React, {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react';
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
    const fileInput = useRef(null);
    const fileLoad = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (!fileInput.current) return null
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const files = fileInput.current.files
        const data = new FormData()
        const file = files || []
        if (file[0]) {
            data.append("JSON_file", file[0])
        }
        addFile(data)
    }

    return(
        <>
            <label>
                <Input ref={fileInput} type="file" id="fileInput" name={props.name} multiple={false} accept={"application/json"}/>
                <Span>{props.placeholder}</Span>
            </label>
            <input type="submit" placeholder={'отправить'} onClick={fileLoad}/>

        </>
    )
}

export default FileInput;
