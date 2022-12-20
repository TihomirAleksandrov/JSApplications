import { getAll } from '../api/data.js';
import { html, render } from '../library.js';

const catalogTemplate = (albums) => html`<section id="dashboard">
    ${albums.length !== 0 ? html`<h2>Albums</h2>
    <ul class="card-wrapper">
        ${albums.map(albumTemplate)}
    </ul>` : html`<h2>There are no albums added yet.</h2>`}
</section>`;

const albumTemplate = (album) => html`<li class="card">
    <img src=${album.imageUrl} alt="cover-photo" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/catalog/${album._id}">Details</a>
</li>`;

export async function displayCatalog(ctx) {
    const albums = await getAll()
    ctx.render(catalogTemplate(albums));
}