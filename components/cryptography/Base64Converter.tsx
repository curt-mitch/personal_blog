"use client";

import React, { useState } from 'react';
import Base64Converter from '../../utils/cryptography/Base64Converter';

const Base64ConverterComponent: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [base64Output, setBase64Output] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleConvertClick = () => {
    const convertedText = Base64Converter(inputText);
    setBase64Output(convertedText);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleConvertClick}>Convert to Base64</button>
      <div>{base64Output}</div>
    </div>
  );
};

export default Base64ConverterComponent;
