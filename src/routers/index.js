import { HeaderOnly } from '~/components/Layouts';
import Folowing from '~/pages/Folowing';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
//Public router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/folowing', component: Folowing },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

//Private router
const privatecRoutes = [];

export { publicRoutes, privatecRoutes };
