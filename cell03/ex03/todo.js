const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new');
let todoList = [];

function newTodo() {
    let name = prompt("Name the todo.");
    if (name && name.trim().length > 0) {
        todoList.unshift(name.trim());
        render();
    }
}

ftList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        let yes = confirm('Are you sure to remove?');
        if (yes) {
            const index = event.target.getAttribute('data-index');
            todoList.splice(index, 1);
            render();
        }
    }
});

function render() {
    ftList.innerHTML = '';
    
    for (let index = 0; index < todoList.length; index++) {
        const text = todoList[index];
        
        const element = document.createElement('div');
        element.classList.add('todo');
        
        element.innerHTML = `
            <p>${text}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        ftList.appendChild(element);
    }
    
    saveToCookie();
}

function saveToCookie() {
    const jsonStr = encodeURIComponent(JSON.stringify(todoList));
    document.cookie = `todoList=${jsonStr}; path=/; max-age=31536000`;
}

window.onload = function () {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todoList='));
    
    if (todoCookie) {
        try {
            const rawValue = decodeURIComponent(todoCookie.split('=')[1]);
            todoList = JSON.parse(rawValue);
            render();
        } catch (e) {
            todoList = [];
        }
    }
};

newBtn.addEventListener('click', newTodo);