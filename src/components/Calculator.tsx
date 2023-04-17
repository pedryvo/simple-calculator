import React, { useState } from 'react';
import styled from 'styled-components';

interface CalculatorProps {
  className?: string;
}

interface ButtonProps {
  operator?: boolean;
  onClick: () => void;
}

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 86%;
  height: 60px;
  padding: 0 20px;
  font-size: 30px;
  background-color: white;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  flex: 1;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ operator }) =>
      operator ? '#f37e22' : 'linear-gradient(#f5f5f5, #e0e0e0)'};
    color: ${({ operator }) => (operator ? 'white' : 'black')};
  }

  ${({ operator }) =>
    operator &&
    `
    background-color: #f5a623;
    color: white;
    `}
`;

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [result, setResult] = useState<string>('');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setResult('');
    } else if (value === '=') {
      try {
        setResult(eval(result).toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      setResult(result + value);
    }
  };

  const buttons = [
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '÷', value: '/', operator: true },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '×', value: '*', operator: true },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '-', value: '-', operator: true },
    { label: 'C', value: 'C' },
    { label: '0', value: '0' },
    { label: '=', value: '=', operator: true },
    { label: '+', value: '+', operator: true },
  ];

  return (
    <CalculatorContainer className={className}>
      <ResultContainer>{result}</ResultContainer>
      <ButtonContainer>
        {buttons.map(({ label, value, operator }) => (
          <Button
            key={label}
            operator={operator}
            onClick={() => handleButtonClick(value)}
          >
            {label}
          </Button>
        ))}
      </ButtonContainer>
    </CalculatorContainer>
  );
};

export default Calculator