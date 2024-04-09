import type { Preview } from "@storybook/preact";
import 'tailwindcss/tailwind.css'
import '../src/custom.css'


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
