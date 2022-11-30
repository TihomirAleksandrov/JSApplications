import { getAll } from '../api/data.js';
import { html, render } from '../lib.js';

const catalogTemplate = (offers) => html`
<section id="dashboard">
    ${offers.length !== 0 ? html`<h2>Job Offers</h2> ${offers.map(offerTemplate)}` : html`<h2>No offers yet.</h2>`};
</section>`;

const offerTemplate = (offer) => html`<div class="offer">
    <img src=${offer.imageUrl} alt="example" />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/catalog/${offer._id}">Details</a>
</div>`;

export async function showCatalog(ctx) {
    const offers = await getAll()
    ctx.render(catalogTemplate(offers));
}