import React, {Dispatch, useEffect, useState} from 'react';
import styled from 'styled-components'
import {labels} from "../../../const/labels";
import {P} from "../../types/inputI";
import {useSelector} from "react-redux";

interface LabelObjI {
    id: number,
    name: string
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 5px;
  transform: translateY(100%);
  z-index: 10;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 0 5px ${props => props.theme.borderColor};
  border: 1px solid ${props => props.theme.borderColor};
`
const Container = styled.div`
  position: relative;
`
const Input = styled.div`
  padding: 10px 20px;
  margin: 10px 0;
  display: block;
  width: 100%;
  height: 42px;
  box-shadow: 0 0 5px ${props => props.theme.borderColor};
  border: 1px solid ${props => props.theme.borderColor};
  text-align: start;
  cursor: pointer;
  color: ${props => props.theme.textColor};
  border-radius: 10px;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  width: 100%;
  cursor: pointer;
`

const DropDownInput = (props: P) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [checkboxState, setCheckboxState] = useState<number>();
    const value: {id: number, name: string}[] = useSelector(props.values)
    const getLabels = (): JSX.Element[] => {
        return value.map((label: LabelObjI) => {
            return (
                <Label key={label.id}>
                    <span>
                        {label.name}
                    </span>
                    {props.type === "dropDownC" ? (
                        <input onChange={() => checkboxClick(label.id)} checked={checkboxState === label.id} type="checkbox"/>
                    ) : (
                        <input onChange={() => radioClick(label.id)} checked={checkboxState === label.id} type="radio"/>
                    )}

                </Label>
            )
        })
    }

    const getName = (): string => {
        if (checkboxState) {
            return value.find((label: LabelObjI) => label.id === checkboxState)?.name || "";
        }
        return props.placeholder || "";
    }

    const checkboxClick = (id: number) => {
        openModal();

        setCheckboxState(id);
    }
    const radioClick = (id: number) => {
        openModal();
        setCheckboxState(id);
    }

    const openModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    useEffect(() => {
        checkboxState && props.onChangeInput && props.onChangeInput(props.name, checkboxState);
    }, [checkboxState])
    return (
        <Container>
            <Input onClick={openModal}>{getName()}</Input>
            {isModalVisible && (
                <Wrapper>
                    {getLabels()}
                </Wrapper>)
            }
        </Container>
    )
}

export default DropDownInput;
