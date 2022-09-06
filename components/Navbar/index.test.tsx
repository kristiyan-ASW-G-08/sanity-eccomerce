// import React from 'react';
// import { render } from '@testing-library/react';
// import Navbar from '.';
// import fileMock from '../../mocks/fileMock';
// import { Provider } from 'react-redux';
// import { RouterContext } from 'next/dist/shared/lib/router-context';
// import createMockRouter from '../../testUtilities/createMockRouter';
// import Store from '@/store/index';
// import { login } from '@/slices/AuthSlice';

// describe('Navbar', () => {
//   afterEach(() => jest.resetAllMocks());
//   afterAll(() => jest.restoreAllMocks());
//   it('render unauthenticated ', async () => {
//     const { container } = render(<Navbar />, {
//       wrapper: ({ children }) => (
//         <Provider store={Store}>
//           <RouterContext.Provider value={createMockRouter({})}>
//             {children}
//           </RouterContext.Provider>
//         </Provider>
//       ),
//     });

//     expect(container).toBeTruthy();
//     expect(container).toMatchSnapshot();
//   });
//   it('render authenticated ', async () => {
//     Store.dispatch(
//       //@ts-ignore
//       login({
//         token: '',
//         //@ts-ignore
//         user: {},
//       }),
//     );
//     const { container } = render(<Navbar />, {
//       wrapper: ({ children }) => (
//         <Provider store={Store}>
//           <RouterContext.Provider value={createMockRouter({})}>
//             {children}
//           </RouterContext.Provider>
//         </Provider>
//       ),
//     });

//     expect(container).toBeTruthy();
//     expect(container).toMatchSnapshot();
//   });
// });
