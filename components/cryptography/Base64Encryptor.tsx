"use client";

import { useState } from 'react';
import encryptBase64String from '../../utils/cryptography/Base64Encryptor';

const Base64Encryptor = () => {
  const [base64String, setBase64String] = useState('');
  const [encryptedString, setEncryptedString] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBase64String(event.target.value);
  };

  const handleEncrypt = () => {
    const encrypted = encryptBase64String(base64String);
    setEncryptedString(encrypted);
  };

  return (
    <div>
      <input type="text" value={base64String} onChange={handleInputChange} />
      <button onClick={handleEncrypt}>Encrypt</button>
      <div>{encryptedString}</div>
    </div>
  );
};

export default Base64Encryptor;
