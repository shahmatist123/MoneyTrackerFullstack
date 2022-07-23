import React, {useEffect, useState} from 'react';
import {P} from "../../types/inputI";
import styled from "styled-components";

interface sumValueI{
    value: number,
    id: number
}

const Input = styled.input`
  outline: none;
  padding: 10px 20px;
  margin: 10px 0;
  display: block;
  width: 100%;
  border: 1px solid #282c34;
`
const MoneyList = styled.div`
  position: absolute;
  right: -30px;
  top: 0;
  transform: translateX(100%);
 
  max-width: 500px;
  grid-column-gap: 20px;
`
const MoneyListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`
const MoneyItem = styled.span`
  display: flex;
  font-size: 14px;
  padding: 4px 0;
  cursor: pointer;
`
const MoneyItemHeader = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 4px 15px;
  color: #fff;
  background: #000;
`
const InputWrapper = styled.div`
  position: relative;
`
const SumInput = (props: P) => {
    const [value, setValue] = useState<string>("")
    const [sumValue, setSumValue] = useState<sumValueI[]>([])
    const [allSum, setAllSum] = useState<number>(0)

    useEffect(() => {
        const tempValue = parseInt(value) ? parseInt(value) : 0
        const result = allSum === 0 ? parseInt(value) : tempValue + allSum
        props.onChangeInput && props.onChangeInput(props.name, result);
    }, [value, allSum])

    const setValueI = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!parseInt(value) || isNaN(parseInt(value))) {
            setValue("")
            return
        }
        setValue(parseInt(value) + "")
    }
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" && value) {
            const prevId = sumValue[sumValue.length - 1] && sumValue[sumValue.length - 1].id
            const newId = prevId ? prevId + 1 : 1
            setAllSum(allSum + parseInt(value))
            setSumValue([...sumValue, {value: parseInt(value), id: newId}])
            setValue("")
        }
    }

    const deleteMoneyItem = (item: sumValueI) => {
        setAllSum(allSum - item.value)
        setSumValue([...sumValue.filter(moneyValue => item.id !== moneyValue.id)])
    }
    const getMoneyList = (): JSX.Element[] => {
        return sumValue.map(item => {
            return (
                <MoneyItem onClick={() => deleteMoneyItem(item)} key={item.id}>
                    {item.value}
                </MoneyItem>
            )
        })
    }

    return (
        <InputWrapper>
            <Input value={value} type="text" placeholder={props.placeholder} onChange={setValueI}
                   onKeyDown={onEnterPress}/>
            {sumValue.length !== 0 && (
                <MoneyList>
                    <MoneyItemHeader>
                        {allSum}
                    </MoneyItemHeader>
                    <MoneyListGrid>
                        {getMoneyList()}
                    </MoneyListGrid>
                </MoneyList>
            )}
        </InputWrapper>
    );
};

export default SumInput;
