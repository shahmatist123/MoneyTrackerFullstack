import React, {useState} from 'react';
import Input from "../components/Input/Input";
import formAddInputs from "const/constFormAddInputs";
import {P} from "../types/inputI";
import styled from "styled-components";
import {add} from "../api/MoneyApi/MoneyApi";
export const purchasesPath = "add-purchase"

const FormWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`
const AddPurchases = () => {
    const getInputs = (): JSX.Element[] => {
        return formAddInputs.map((input: P, i: React.Key | null | undefined) => {
            if (input.type === "submit") {
                return (<Input onSubmit={onSubmit} onChangeInput={getValue} key={i} {...input}/>);
            }
            return (<Input onChangeInput={getValue} key={i} onChange={(e) => getValue(input.name, e.target.value)} {...input}/>);
        });
    }
    const [valueForm, setValueForm] = useState<any>({});
    const getValue = (name: string | undefined, value: string | number[] | number) => {
        if (name) valueForm[name] = value;
        setValueForm({...valueForm});
    }

    const onSubmit = () => {
        add({...valueForm}).then((r: any) => {
        });
    }
    return (
        <>
            <FormWrapper>
                {getInputs()}
            </FormWrapper>
        </>
    );
}
export default AddPurchases