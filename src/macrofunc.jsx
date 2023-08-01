import api from "@forge/api";
import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  useProductContext,
  useState,
  Button
} from "@forge/ui";




const App = () => {
 
  console.log(`Number of comments on this page`);
  const handleClick = () => {
    console.log("Button clicked!"); // This will be printed in the console when the button is clicked
  };

  return (
    <Fragment>
    <Text>Hello world!</Text>
    <Text>
      Number of comments on this page: 
    </Text>
    <Button text="Insert" onClick={handleClick}></Button>
    </Fragment>
  );
};

export const run = render(
  <Macro
    app = {
    < App />}
  />
);