import React, {useState} from 'react';
import Input from "./../components/Input/Input";
import styled from "styled-components";
export const ticketPath = "add-ticket"
const FormWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`

const AddTickets = () => {
    const [valueForm, setValueForm] = useState<any>({});
    const getValue = (name: string | undefined, value: string | number[] | number) => {
        if (name) {
            valueForm[name] = value;
        }
        setValueForm({...valueForm});
    }
    return (
        <>
            <FormWrapper>
                <Input onChangeInput={getValue} type="file" placeholder={`Прикрепить JSON файл`} name=''></Input>
            </FormWrapper>
        </>
    );
}
export default AddTickets