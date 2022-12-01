import { createShoes } from '../api/data.js';
import { html, render } from '../library.js';
import { submitHandler } from '../utility.js';

const createTemplate = (onCreation) => html`<section id="create">
    <div class="form">
        <h2>Add item</h2>
        <form @submit=${onCreation} class="create-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export function displayCreate(ctx) {
    ctx.render(createTemplate(submitHandler(onCreation)));

    async function onCreation({ brand, model, imageUrl, release, designer, value }) {
        if (brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '') {
            return alert('All fields are required!');
        }

        await createShoes({
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        });

        ctx.page.redirect('/catalog');
    }
}