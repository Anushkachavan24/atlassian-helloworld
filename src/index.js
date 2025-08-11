import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  console.log("hello world");
  console.log("hello world 2");
  console.log("hello world 3");
  return 'welcome';
  
});


export const handler = resolver.getDefinitions();
