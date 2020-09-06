import { parse } from "../lib";

const getParserWithCode = code => () => parse(code, { sourceType: "module" });

describe("handle keyword", () => {
  it("Should parse a handle block", () => {
    const parser = getParserWithCode(`
      handle (A) {
        const x = 0;
      }
    `);

    expect(parser()).toMatchSnapshot();
  });

  it("Should parse a handle block as expression", () => {
    const parser = getParserWithCode(`
        const f = handle () {
          return null;
        };
    `);

    expect(parser()).toMatchSnapshot();
  });

  it("Should parse a nested handle block", () => {
    const parser = getParserWithCode(`
        const f = handle () {
          return handle () {

          }
        };
    `);

    expect(parser()).toMatchSnapshot();
  });
});

describe("perform keyword", () => {
  it("Should parse", () => {
    const parser = getParserWithCode(`
      function main(){
        perform Effect();
      }
    `);
    expect(parser()).toMatchSnapshot();
  });
});

describe("effect / recall keyword", () => {
  it("Should parse a handle keyword", () => {
    const parser = getParserWithCode(`
        const y = effect (x) => {

        }
   `);
    expect(parser()).toMatchSnapshot();
  });

  it("Should parse a recall keyword within the scope of an effect", () => {
    const parser = getParserWithCode(`
      const z = effect () => {
        recall "Hello"
      }
    `);

    expect(parser()).toMatchSnapshot();
  });

  it("Should parse a function statement as an effect", () => {
    const parser = getParserWithCode(`
      effect function A() {
        recall "Hi";
      }

      const B = effect function(){
        recall "Yo";
      }
    `);

    expect(parser()).toMatchSnapshot();
  });

  it("Should not parse a recall keyword outside the scope of an effect", () => {
    const parser = getParserWithCode(`
      recall "bad";
    `);

    expect(parser).toThrowError();
  });
});
