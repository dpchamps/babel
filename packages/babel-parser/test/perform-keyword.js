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
  it("Should parse basic handler case", () => {
    const parser = getParserWithCode(`
      function main(){
        try{
          main();
        } handle 'someEffect' with (e){

        }
      }
    `);

    expect(parser()).toMatchSnapshot();
  });

  it("Should parse alternate handler case ", () => {
    const parser = getParserWithCode(`
    try{

    }handle 'someEffect' with (e){

    }handle 'anotherEffect' with (e){

    }`);

    expect(parser()).toMatchSnapshot();
  });

  it("Should parse a default handler case", () => {
    const parser = getParserWithCode(`
    try{

    }handle someVar with (e) {

    } handle Symbol('effect') with (e){

    } handle default with (e){

    }`);

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
