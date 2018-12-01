const btn_load = document.getElementById('btn_load');
const list_div = document.getElementById('todolist');

btn_load.addEventListener('click', () => {
    axios.get('http://localhost:8000/api/v1/load')
    .then(function (response) {

        // Delete All things, first
        while (list_div.hasChildNodes()) {
            list_div.removeChild(list_div.firstChild);
        }

        // Then show data
        const data = response.data;
        for(let i=0; i<data.length; i++) {
            let new_div = document.createElement("div");
            new_div.className = "todo";
            new_div.textContent = `${data[i].name}님이 ${data[i].date.slice(0, 10)}에 ${data[i].todo}라는 일정이 있습니다`
            list_div.appendChild(new_div);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
})