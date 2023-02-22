import { HeaderOnly } from '~/components/Layouts';
import Folowing from '~/pages/Folowing';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import routesConfig from '~/config/routes';

//Public router
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.folowing, component: Folowing },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];

//Private router
const privatecRoutes = [];

export { publicRoutes, privatecRoutes };
