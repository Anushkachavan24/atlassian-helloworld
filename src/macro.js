import ForgeUI, {
  render,
  Macro,
  MacroConfig,
  Text,
  TextField,
  useConfig
} from "@forge/ui";

const defaultConfig = {
  name: "Unnamed Pet",
  age: "0"
};

const App = () => {
  // Retrieve the configuration
  const config = useConfig() || defaultConfig;

  // Use the configuration values
  return <Text>{config.name} is {config.age} years old.</Text>;
};

export const run = render(
  <Macro app={<App />} />
);

// Function that defines the configuration UI
const Config = () => {
  return (
    <MacroConfig>
      <TextField name="name" label="Pet name" defaultValue={defaultConfig.name} />
      <TextField name="age" label="Pet age" defaultValue={defaultConfig.age} />
    </MacroConfig>
  );
};

export const config = render(<Config />);
