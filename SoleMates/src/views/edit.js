import { getById, editShoes } from "../api/data.js";
import { submitHandler } from "../utility.js";
import { html } from "../library.js";

const editTemplate = (shoePair, onEditing) => html`<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onEditing} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${shoePair.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${shoePair.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${shoePair.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${shoePair.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${shoePair.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${shoePair.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`;


export async function displayEdit(ctx) {
    const id = ctx.params.id;
    const shoePair = await getById(id);

    ctx.render(editTemplate(shoePair, submitHandler(onEditing)));

    async function onEditing({ brand, model, imageUrl, release, designer, value }, form) {
        if (brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '') {
            return alert('All fields are required!');
        }

        await editShoes(id, {
            brand,
            model, 
            imageUrl, 
            release, 
            designer, 
            value
        });

        form.reset();
        ctx.page.redirect('/catalog/' + id);
    }
}