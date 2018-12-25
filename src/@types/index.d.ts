import * as nunjucks from 'nunjucks'
declare module 'nunjucks'{
  export const parser: {
    parse(templateString: string): any
  }
}
