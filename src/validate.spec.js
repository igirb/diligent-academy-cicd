import {validateAddParams, validateCompleteParams, validateTodoExists} from "./validate";
import {jest} from '@jest/globals';

function createMockStore(data) {
    return {
        get: jest.fn(() => data),
        set: jest.fn()
    }
}

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
        const params = ['4'];
        const expected = 4;

        const current = validateCompleteParams(params);

        expect(current).toStrictEqual(expected);
    })

    it('should pass and return the original params', () => {
        const params = [4];
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
        const params = ['eleven'];

        expect(() => validateCompleteParams(params))
            .toThrow('Invalid input. Please provide a number as an ID!');
    })

    it('should throw when the param is empty', () => {
        const params = [];

        expect(() => validateCompleteParams(params))
            .toThrow('Provide one number as ID.');
    })
})

describe('validateTodoExists', () => {
    it('should return the correct todo when the ID exists', () => {
        const id = 1;
        const mockStore = createMockStore([
            {title: 'todo title', id: 1, done: true},
            {title: 'todo title 2', id: 2, done: false}
        ])
        const expected = {title: 'todo title', id: 1, done: true};

        const current = validateTodoExists(mockStore, id);

        expect(current).toStrictEqual(expected);
    });

    it('should return the correct todo when we have an unordered ID list', () => {
        const id = 2;
        const mockStore = createMockStore([
            {title: 'todo title', id: 1, done: true},
          {title: 'todo title', id: 31, done: true},
            {title: 'todo title 2', id: 2, done: false}
        ])
        const expected = {title: 'todo title 2', id: 2, done: false};

        const current = validateTodoExists(mockStore, id);

        expect(current).toStrictEqual(expected);
    });

    it('should throw an error when the ID does not exist', () => {
        const id = 3;
        const mockStore = createMockStore([
            {title: 'todo title', id: 1, done: true},
            {title: 'todo title 2', id: 2, done: false}
        ])

        expect(() => validateTodoExists(mockStore, id))
            .toThrow(`Todo with ID ${id} not found.`);
    });

    it('should throw an error when an invalid ID type is provided', () => {
        const id = 'invalid-id';
        const mockStore = createMockStore([
            {title: 'todo title', id: 1, done: true},
            {title: 'todo title 2', id: 2, done: false}
        ])

        expect(() => validateTodoExists(mockStore, id))
            .toThrow(`Todo with ID ${id} not found.`);
    });

    it('should handle an empty todo list and throw an error', () => {
        const id = 1;
        const emptyStore = createMockStore([])

        expect(() => validateTodoExists(emptyStore, id))
            .toThrow(`Todo with ID ${id} not found.`);
    });
});

describe("validateFindById", () => {
  it("should pass and return the numeric ID when a valid numeric ID is provided", () => {
    const params = ["4"];
    const expected = 4;

    const current = validateFindById(params);

    expect(current).toStrictEqual(expected);
  });

  it("should throw an error when a non-numeric ID is provided", () => {
    const params = ["abc"]; // non-numeric ID

    expect(() => validateFindById(params)).toThrow(
      "The ID must be a numeric value."
    );
  });

  it("should throw an error when no ID is provided", () => {
    const params = [];

    expect(() => validateFindById(params)).toThrow(
      'Invalid number of parameters for "find-by-id". Expected 1 parameter.'
    );
  });

  it("should throw an error when multiple parameters are provided", () => {
    const params = ["1", "2"];

    expect(() => validateFindById(params)).toThrow(
      'Invalid number of parameters for "find-by-id". Expected 1 parameter.'
    );
  });
});