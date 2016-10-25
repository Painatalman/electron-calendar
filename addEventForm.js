let {ipcRenderer} = require('electron');

let addForm = document.getElementById('add-event-form');

addForm && addForm.addEventListener('submit', function(e){
  e.preventDefault;

  let form = e.target;
  let data = {
    'year': form.year.value,
    'month': form.month.value,
    'day': form.day.value,
    'title': form.title.value,
    'description': form.description.value,
    'isYearly': form.isYearly.checked
  }

  ipcRenderer.send('add-event', data);
});
