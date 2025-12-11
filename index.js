document.addEventListener("DOMContentLoaded", () => {
            let todoInput = document.getElementById("input");
            let addTodobutton = document.getElementById("add-btn");
            let showtodos = document.getElementById("todos-container");
            let todo;
            let todoList = [];

            // Function to generate unique ID
            function uuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
                    let number = Math.random() * 16 | 0;
                    let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
                    return randomNumber.toString(16);
                });
            }

            // Add todo
            addTodobutton.addEventListener("click", (e) => {
                e.preventDefault();
                todo = todoInput.value.trim();
                if (todo.length > 0) {
                    todoList.push({ id: uuid(), todo, iscompleted: false });
                }
                rendertodoList(todoList);
                localStorage.setItem("todo",JSON.stingify(todoList));
                todoInput.value = "";

            });

            // Handle checkbox and delete button clicks
            showtodos.addEventListener("click", (e) => {
                // Ensure we get the correct element even if <span> inside button is clicked
                let deleteButton = e.target.closest("button[data-todokey]");
                let checkbox = e.target.closest("input[type='checkbox'][data-key]");

                if (checkbox) {
                    let key = checkbox.dataset.key;
                    todoList = todoList.map(todo =>
                        todo.id === key ? { ...todo, iscompleted: !todo.iscompleted } : todo
                    );
                }

                if (deleteButton) {
                    let detTodokeye = deleteButton.dataset.todokey;
                    todoList = todoList.filter(todo => todo.id !== detTodokeye);
                }

                rendertodoList(todoList);
            });

            function rendertodoList(todoList) {
                showtodos.innerHTML = todoList.map(({ id, todo, iscompleted }) =>
                    `<div>
                        <input id="item-${id}" class="t-checkbox t-pointer" type="checkbox" data-key=${id} ${iscompleted ? "checked" : ""}>
                        <label id="form-${id}" data-key=${id}>${todo}</label>
                        <button class="absolute right-0 button curser" data-todokey=${id}>
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>`
                ).join('');
            }

            rendertodoList(todoList);
        });