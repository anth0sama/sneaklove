const service = axios.create({
    baseURL: "http://localhost:8888"
});

const tagInput = document.getElementById("new_tag_name");
const button = document.getElementById("btn_new_tag");
const field = document.getElementById("tag-field");

function createTag(payload) {
    console.log(payload)
    service.post(`/tag-add`, {payload})
    .then(apiRes => renderTag(apiRes))
    .catch(apiErr => console.error(apiErr));
}

function deleteStyle(id) {
    service.delete(`${service.baseURL}/tag-delete/${id}`)
    .then(apiRes => deleteTag(apiRes.data))
    .catch(apiErr => console.error(apiErr));
}

function resetField(){
    tagInput.value = ""
}

function renderTag(newTag){
    field.innerHTML += `<div data-type-id="${newTag.data._id}" class="tag-box">
    <div class="tag-box-name">${newTag.data.label}</div>
  </div>`
}

button.onclick = () => {
    createTag(tagInput.value);
    resetField();
}

