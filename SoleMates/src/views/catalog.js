import { getAll } from '../api/data.js';
import { html, render } from '../library.js';

const catalogTemplate = (shoes) => html`<section id="dashboard">
    ${shoes.length !== 0 ? html`<h2>Collectibles</h2>
    <ul class="card-wrapper">
        ${shoes.map(shoesTemplate)}
    </ul>` : html`<h2>There are no items added yet.</h2>`}
</section>`;

const shoesTemplate = (shoes) => html`<li class="card">
    <img src=${shoes.imageUrl} alt="shoes-example" />
    <p>
        <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoes.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
    <a class="details-btn" href="/catalog/${shoes._id}">Details</a>
</li>`;

export async function displayCatalog(ctx) {
    const shoes = await getAll()
    ctx.render(catalogTemplate(shoes));
}