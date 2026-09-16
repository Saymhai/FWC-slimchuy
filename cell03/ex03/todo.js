const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('btn'); // แก้ ID ให้ตรงกับ HTML (id="btn")
let todoList = [];

function render() {
    ftList.innerHTML = '';
    
    for (let index = 0; index < todoList.length; index++) { // แก้ไข todoList.length
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

function newTodo() {
    let name = prompt("Name the todo.");
    // เช็คว่ามีค่า และผู้ใช้ไม่ได้กด Cancel หรือใส่ช่องว่างทิ้งไว้
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
            todoList.splice(index, 1); // ลบตามตำแหน่ง index
            render();
        }
    }
});

function saveToCookie() {
    const jsonStr = encodeURIComponent(JSON.stringify(todoList));
    document.cookie = `todoList=${jsonStr}; path=/; max-age=31536000`; // บันทึก 1 ปี
}

// ดึงข้อมูลจาก Cookie เมื่อเปิดหน้าเว็บ
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