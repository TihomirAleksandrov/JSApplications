import { register } from "../api/user.js";
import { html } from "../library.js";
import { submitHandler } from "../utility.js";

const registerTemplate = (onRegistration) => html`<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegistration} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function displayRegister(ctx) {
    ctx.render(registerTemplate(submitHandler(onRegistration)));

    async function onRegistration({ email, password }) {
        const repeatPassword = document.getElementById('repeat-password').value;

        if (email == '' || password == '') {
            return alert('All fields are required!')
        }
        if (password != repeatPassword) {
            return alert("Passwords don't match")
        }

        await register(email, password);
        ctx.updateNavigation();
        ctx.page.redirect('/catalog')
    }
}