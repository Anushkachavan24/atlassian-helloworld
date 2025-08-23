import ForgeUI, { MacroConfig, TextField, Box, Blockquote } from '@forge/ui';

export const Config = () => {
  return (
    <MacroConfig>
      {/* Form components */}
      <TextField name="age" label="Pet age" />
    </MacroConfig>
  );
};