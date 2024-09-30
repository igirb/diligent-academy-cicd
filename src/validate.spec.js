import {validateAddParams, validateCompleteParams} from "./validate";

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })


})

describe('ValidateCompleteParams', () => {
  it('should pass and return the params in number type', () => {
    const params = [ '4' ];
    const expected = 4;

    const current = validateCompleteParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return the original params', () => {
    const params = [ 4 ];
    const expected = 4;

    const current = validateCompleteParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple number is given', () => {
    const params = [4, 5, 3];

    expect(() => validateCompleteParams(params))
        .toThrow('Provide one number as ID.');
  })

  it('should throw when not a number or a number with string type is given', () => {
    const params = [ 'eleven' ];

    expect(() => validateCompleteParams(params))
        .toThrow('Invalid input. Please provide a number as an ID!');
  })

  it('should throw when the param is empty', () => {
    const params = [];

    expect(() => validateCompleteParams(params))
        .toThrow('Provide one number as ID.');
  })
})