import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../library.js';

const detailsTemplate = (shoePair, hasUser, isPoster, onDeleting) => html`<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoePair.imageUrl} alt="shoes-example" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoePair.brand}</span></p>
            <p>
                Model: <span id="details-model">${shoePair.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoePair.release}</span></p>
            <p>Designer: <span id="details-designer">${shoePair.designer}</span></p>
            <p>Value: <span id="details-value">${shoePair.value}</span></p>
        </div>
        ${shoesControls(shoePair, hasUser, isPoster, onDeleting)}
    </div>
</section>`;

function shoesControls(shoePair, hasUser, isPoster, onDeleting) {
    if (hasUser == false) {
        return nothing;
    }
    if (isPoster) {
        return html`<div id="action-buttons">
    <a href="/edit/${shoePair._id}" id="edit-btn">Edit</a>
    <a @click=${onDeleting} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>`;
    }
}

export async function displayDetails(ctx) {
    const id = ctx.params.id;

    const hasUser = Boolean(ctx.user);

    const shoePair = await getById(id);

    const isPoster = hasUser && ctx.user._id == shoePair._ownerId;

    ctx.render(detailsTemplate(shoePair, hasUser, isPoster, onDeleting));

    async function onDeleting() {
        const choice = confirm('Are you sure you want to delete this offer?');

        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}