import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routers';
import { DefaultLayout } from '~/components/Layouts';
import { Fragment } from 'react';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((router, index) => {
                        const Page = router.component;
                        let Layout = DefaultLayout;

                        if (router.layout) {
                            Layout = router.layout;
                        } else if (router.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
