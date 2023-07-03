import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {

  const {data} = req.payload
  console.log(data);

  return 'welcome';
  
});


export const handler = resolver.getDefinitions();
