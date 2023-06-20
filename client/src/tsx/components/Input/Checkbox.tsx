import styled from "styled-components";
import {ChangeEvent} from "react";


const Input = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`
const Span = styled.span`
  width: 20px;height: 20px;
  border: 1px solid #fff;
  position: absolute;
  top: 0;
  left: -20px;
  cursor: pointer;
`
const Label = styled.label`
  position: relative;
  ${Input}:checked + ${Span}:after{
    content: "✓";
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
interface CheckboxI {
    onChange: (value: boolean) => void,
    value: boolean
}
const Checkbox = ({onChange, value}: CheckboxI) => {
    // @ts-ignore
    return <Label>
        <Input type="checkbox" checked={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}/>
        <Span></Span>
    </Label>
}
export default Checkbox