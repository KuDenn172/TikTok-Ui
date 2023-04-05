import { HeaderOnly } from '~/layouts';
import { MainLayoutMax } from '~/layouts/MainLayout';

import config from '~/config';

// Layouts
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Login from '~/components/Login';

//Public router
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile, layout: MainLayoutMax },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    // { path: '*', component: Login, layout: null },
];

//Private router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
