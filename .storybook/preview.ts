import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/',
        query: {},
        push: async () => Promise.resolve(true),
        replace: async () => Promise.resolve(true),
        prefetch: async () => Promise.resolve(),
        back: () => {},
        reload: () => {},
        route: '/',
        asPath: '/',
        isReady: true,
        isPreview: false,
        isLocaleDomain: false,
        events: {
          on: () => {},
          off: () => {},
          emit: () => {},
        },
      },
    },
    docs: {
      iframeHeight: 800,
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};
export default preview;
