import encryptBase64String from '../Base64Encryptor';

describe('encryptBase64String', () => {
  it('should encrypt base64 string using sha256', () => {
    const base64String = 'SGVsbG8sIFdvcmxkIQ==';
    const expectedOutput = 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f';

    const result = encryptBase64String(base64String);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    const base64String = '';
    const expectedOutput = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    const result = encryptBase64String(base64String);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle special characters', () => {
    const base64String = 'SGVsbG8sIEBXb3JsZCE=';
    const expectedOutput = 'e0dd438c770fe08758b8a63f69e4ecd6ebadde1474c40d474b2303577ba2f369';

    const result = encryptBase64String(base64String);

    expect(result).toEqual(expectedOutput);
  });
});
