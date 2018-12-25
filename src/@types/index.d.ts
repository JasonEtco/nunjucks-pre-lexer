import * as nunjucks from 'nunjucks'

// Extend the Nunjucks typings to define the `parser` object
declare module 'nunjucks'{
  export const parser: {
    parse(templateString: string): any
  }
}
