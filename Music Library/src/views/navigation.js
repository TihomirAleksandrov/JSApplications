import { html, render, page } from "../library.js";
import { getUserData } from "../utility.js";
import { logout } from '../api/user.js';

const nav = document.querySelector('header');
const navTemplate = (hasUser) => html`<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
    <div>
        <a href="/catalog">Dashboard</a>
    </div>

    ${hasUser ? html`<div class="user">
        <a href="/create">Add Album</a>
        <a @click=${onLoggingOut} href="javascript:void(0)">Logout</a>
    </div>` : html`<div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export function updateNavigation() {
    const user = getUserData();

    render(navTemplate(user), nav);
}

function onLoggingOut() {
    logout();
    updateNavigation();
    page.redirect('/catalog');
}