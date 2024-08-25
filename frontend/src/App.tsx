import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { generateRoutesAndLinks } from './utils';

const { routes } = generateRoutesAndLinks();

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;