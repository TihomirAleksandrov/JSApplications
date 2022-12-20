import { html, render } from '../library.js';
import { login } from '../api/user.js';
import { submitHandler } from '../utility.js';

const loginTemplate = (onLoggingIn) => html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onLoggingIn} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`;

export function displayLogin(ctx) {
    ctx.render(loginTemplate(submitHandler(onLoggingIn)));

    async function onLoggingIn({ email, password }) {
        if (email == '' || password == '') {
            return alert('All fields must be filled!')
        }

        await login(email, password);
        ctx.updateNavigation();
        ctx.page.redirect('/catalog')
    }
}