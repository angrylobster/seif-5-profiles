import '../styles/globals.css';
import 'antd/dist/antd.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default', 
    values: [
      {
        name: 'default',
        value: '#f0f2f5',
      },
    ],
  }
}