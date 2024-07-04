import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputNumber from "../InputNumber";
import { InputNumberProps } from "../InputNumber/InputNumber";

interface Props extends InputNumberProps {
  max?: number;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onType?: (value: number) => void;
  classNameWrapper?: string;
}

function QuantityController(props: Props) {
  const { max, onIncrease, onDecrease, onType, classNameWrapper = " ml-10", value, ...rest } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (max !== undefined && value > max) {
      value = max;
    } else if (value < 1) {
      value = 1;
    }
    onType && onType(value);
  };

  const handelInCrease = () => {
    let _value = Number(value) + 1;
    if (max !== undefined && _value > max) {
      _value = max;
    }
    onIncrease && onIncrease(_value);
  };
  const handelDeCrease = () => {
    let _value = Number(value) - 1;
    if (_value < 1) {
      _value = 1;
    }
    onDecrease && onDecrease(_value);
  };
  return (
    <div className={"flex items-center" + classNameWrapper}>
      <button
        className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 tex-fray-600 px-2'
        onClick={handelDeCrease}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <InputNumber
        value={value}
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 outline-none text-center p-1'
        onChange={handleOnChange}
        {...rest}
      />
      <button
        className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 tex-fray-600 px-2'
        onClick={handelInCrease}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default QuantityController;
