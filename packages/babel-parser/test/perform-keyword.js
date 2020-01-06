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

describe("resume keyword", () => {
  it("Should parse", () => {
    const parser = getParserWithCode(`
      function handler(){
        recall ({a : 'a'});
        recall true;
      }
    `);

    expect(parser()).toMatchSnapshot();
  });
});
