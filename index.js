const ConsommationApi=async()=>{
    try {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Tunisia,tn&APPID=93665eb44589d9bca1af78752790efa5')
        const dataM = await res.json()
        console.log(dataM)
        const tempp = document.querySelector('#tempp')
        tempp.innerText = Math.trunc(dataM.main.temp-272.15)
        const city = document.querySelector('.city')
        city.innerText = dataM.name
        const dateP = document.querySelector('.date')

        const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()
        const day = String(today.getDate()).padStart(2, '0');
        dateP.innerText = `${day}-${months[month]}-${year}`;

        // var currentDate = new Date()
        // var currentMonth = currentDate.getMonth()
      

        // console.log(months[currentMonth])
        // console.log(currentDate.getUTCDate())
        // console.log(currentDate.getFullYear())
        // console.log(`${currentDate.getUTCDate()} ${months[currentMonth]} ${currentDate.getFullYear()}`)
    } catch (error) {
        console.log(error)
    }
}

ConsommationApi()

const fullURL = window.location.pathname;
console.log(fullURL);

const reCreateMainDivTask = () => {
    var tasksDiv = document.querySelector('#tasks');
    console.log(tasksDiv);
    tasksDiv.innerHTML = '';
};

//function to create the task
const createTaskElement = (task, tasksDiv) => {
    var newDiv = document.createElement('div');  
    var divT = document.createElement('div');  
    var newContent = document.createElement('h3');
    
    var divDateTime = document.createElement('div'); 
    var newTime = document.createElement('h4');
    newTime.innerText = task.timeDo;
    var newDate = document.createElement('h4');
    newDate.innerText = task.dateDo;
    var newCheck = document.createElement('i');
    
    newContent.innerText = task.content;
    if(task.checked){
        newContent.setAttribute('class','done');
        newCheck.setAttribute('class', "fa-solid fa-circle");
    }
    else{
        newCheck.setAttribute('class', "fa-regular fa-circle");
    }
    
    newCheck.addEventListener('click',function(){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.map((el) => el.id == task.id ? {...el, checked: !el.checked} : el);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        reCreateMainDivTask();
        displayTasks();
    });

    var newDelete = document.createElement('i');
    newDelete.setAttribute('class','fa-solid fa-trash felsa');
    newDelete.addEventListener('click', function(){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.filter((el) => el.id != task.id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        reCreateMainDivTask();
        displayTasks();
    });

    divT.appendChild(newCheck);
    divT.appendChild(newContent);
    divT.setAttribute('class','posCon');
    newDiv.appendChild(divT);
    
    divDateTime.appendChild(newDate);
    divDateTime.appendChild(newTime);
    divDateTime.appendChild(newDelete);
    divDateTime.setAttribute('class', 'TimeDateTrash');
    newDiv.appendChild(divDateTime);
    newDiv.setAttribute('class','Onetask');

    const taskDateTime = new Date(`${task.dateDo}T${task.timeDo}`);
    const now = new Date();

    if (now >= taskDateTime && !task.checked) {
        const overdueContainer = document.createElement('div');
        overdueContainer.setAttribute('class', 'overdue-container');

        const overdueMsg = document.createElement('div');
        overdueMsg.innerText = 'Task overdue!';
        overdueMsg.setAttribute('class', 'overdue');
        newDiv.insertBefore(overdueMsg, newDiv.firstChild);

        overdueContainer.appendChild(overdueMsg);
        tasksDiv.appendChild(overdueContainer);
    }

    tasksDiv.appendChild(newDiv);
};

//function to display the function
const displayTasks = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Outputs something like "2024-08-07"

    var tasksDiv = document.querySelector('#tasks');
    var titr = document.createElement('h3');

    if (localStorage.getItem('tasks') == null || JSON.parse(localStorage.getItem('tasks')).length == 0) {
        titr.setAttribute('id', 'msgTitre');
    
        if (window.location.pathname == "/Today.html") {
            titr.innerText = "No tasks for today";
        } else {
            titr.innerText = "No tasks";
        }
    
        tasksDiv.appendChild(titr);
    } else {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        titr.remove();
        
        for (let i = 0; i < tasks.length; i++) { 
            if (window.location.pathname == "/Today.html") {
                if(tasks[i].dateDo == formattedDate){
                    createTaskElement(tasks[i], tasksDiv);
                }
            } else {
                createTaskElement(tasks[i], tasksDiv);
            }
        }
    }
};

displayTasks();

var Add = document.querySelector('#Add');

Add.addEventListener('click', function(){
    var inputAdd = document.querySelector('#inputAdd');
    var timeToDo = document.querySelector('#timeToDo');
    var dateToDo = document.querySelector('#dateToDo');

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log('current date', formattedDate);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    console.log('Current Time', formattedTime);

    const selectedDateTime = new Date(`${dateToDo.value}:${timeToDo.value}`);
    const currentDateTime = new Date(`${formattedDate}:${formattedTime}`);
    console.log(selectedDateTime);
    console.log(currentDateTime);

    if(inputAdd.value == "" || timeToDo.value == '' || dateToDo.value == ""){
        alert('Please provide: task name, date and time!');
    } else if(selectedDateTime <= currentDateTime){
        alert("Please select a valid date and time!");
    } else {
        console.log("test get", localStorage.getItem('nour'));
        reCreateMainDivTask();

        if(localStorage.getItem('tasks') == null){            
            localStorage.setItem('tasks', JSON.stringify([{content: inputAdd.value, checked: false, id: Math.random(), timeDo: timeToDo.value, dateDo: dateToDo.value}]));
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks = [...tasks, {content: inputAdd.value, checked: false, id: Math.random(), timeDo: timeToDo.value, dateDo: dateToDo.value}];
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }       
        console.log(tasks);
        displayTasks();
        inputAdd.value = "";
    }
});







