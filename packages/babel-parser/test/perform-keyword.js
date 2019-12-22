import { parse } from "../lib";

const getParserWithCode = code => () => parse(code, { sourceType: "module" });

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

describe("try/handle keyword", () => {
  it("Should parse", () => {
    const parser = getParserWithCode(`
      function main(){
        try{
          main();
        } handle (e){

        }
      }
    `);

    expect(parser()).toMatchSnapshot();
  });
});

describe("resume/with keywords", () => {
  it("Should parse", () => {
    const parser = getParserWithCode(`
      function handler(){
        resume ({a : 'a'});
        resume true;
      }
    `);

    expect(parser()).toMatchSnapshot();
  });
});
