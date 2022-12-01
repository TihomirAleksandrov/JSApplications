import { updateNavigation } from './views/navigation.js';
import {page, render} from './library.js';
import { getUserData } from './utility.js';
import { displayHome } from './views/home.js';
import { displayLogin } from './views/login.js';
import { displayRegister } from './views/register.js';
import { displayCatalog } from './views/catalog.js';
import { displayDetails } from './views/details.js';
import { displayCreate } from './views/create.js';
import { displayEdit } from './views/edit.js';


const main = document.getElementById('content');

page(decorateContext);
page('/', displayHome);
page('/catalog',displayCatalog);
page('/catalog/:id',displayDetails);
page('/edit/:id',displayEdit);
page('/login',displayLogin);
page('/register',displayRegister);
page('/create',displayCreate);
page('/search',() => console.log('search'));

updateNavigation();
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNavigation = updateNavigation;

    const user = getUserData()
    if (user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content){
    render(content, main);
}