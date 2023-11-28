import convertToBase64 from '../Base64Converter';

describe('convertToBase64', () => {
  it('should convert input string to base64', () => {
    const input = 'Hello, World!';
    const expectedOutput = 'SGVsbG8sIFdvcmxkIQ==';

    const result = convertToBase64(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty input', () => {
    const input = '';
    const expectedOutput = '';

    const result = convertToBase64(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle special characters', () => {
    const input = 'Hello, @World!';
    const expectedOutput = 'SGVsbG8sIEBXb3JsZCE=';

    const result = convertToBase64(input);

    expect(result).toEqual(expectedOutput);
  });
});
