import React, {useState} from 'react';
import Input from "../Input/Input";
import formAddInputs from "../../../const/constFormAddInputs";
import {P} from "../../types/inputI";
import styled from "styled-components";
import {config} from "../../../config/config";
import {add} from "../../api/MoneyApi/MoneyApi";
import {Link} from "react-router-dom";

const FormWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`
const EditSendType = styled.div`
  margin: 0 auto;
  background: #000;
  border-radius: 3px;
  display: inline-block;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
`

const FormAddSumm = () => {
    const getInputs = (): JSX.Element[] => {
        return formAddInputs.map((input: P, i) => {
            if (input.type === "submit") {
                return (<Input onSubmit={onSubmit} onChangeInput={getValue} key={i} {...input}/>);
            }
            return (<Input onChangeInput={getValue} key={i} {...input}/>);
        });
    }
    const [valueForm, setValueForm] = useState<any>({});
    const [sendType, setSendType] = useState<boolean>(false);
    const getValue = (name: string, value: string|number[]|number) => {
        valueForm[name] = value;
        setValueForm({...valueForm});
        console.log(valueForm)
    }

    const onSubmit = () => {
        add({...valueForm}).then(r => {
            console.log(r)
        });
    }

    const editSendType = () => {
        setSendType(!sendType)
    }

    return (
        <>
            <FormWrapper>
                {!sendType && (<>
                    <EditSendType onClick={() => editSendType()}>
                        Ручной ввод
                    </EditSendType>
                    <Input onChangeInput={getValue} type="file" placeholder={`Прикрепить JSON файл`} name=''></Input>
                </>)}
                {sendType && (<>
                    <EditSendType onClick={() => editSendType()}>
                        Автоматический ввод
                    </EditSendType>
                    {getInputs()}
                </>)}
            </FormWrapper>
        </>
    );
}

export default FormAddSumm;
