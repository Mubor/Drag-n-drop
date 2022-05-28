const former = (form, active) => {
    const createListItem = (text) => {
        const li = document.createElement('li');
        li.innerHTML = text;
        li.setAttribute('draggable', 'true');
        return li;
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const textToInsert = form.text.value;
        active.appendChild(createListItem(textToInsert));
    });
}

const setDrop = (list) => { 
    const storage = new Map();

    ['drop', 'dragover', 'dragleave', 'dragenter'].forEach(event => {
        list.addEventListener(event, e => e.preventDefault(), false);
    });
    
    document.addEventListener('dragstart', e => {
        const{ target: item, dataTransfer} = e;
        const id = new Date().getTime().toString();

        storage.set(id, item);

        dataTransfer.setData('text/plain', id);
    });

    list.addEventListener('drop', e => {
        const { target, dataTransfer } = e;
        const id = dataTransfer.getData('text/plain');
        const item = storage.get(id);
        
        if( target.tagName === 'LI' ) {
            console.log(list)
            console.log(target)
            console.log(item)
            list.insertBefore(item, target);
            return
        }

        list.append(item);
    })
}


former(document.forms.creation, document.querySelector('.active'));
setDrop(document.querySelector('.done'));



