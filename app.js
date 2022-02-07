const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn'); 

const database = firebase.database();
const usersRef = database.ref('/users');
const normalUsersRef = usersRef.child('normal_users');
const superUsersRef = usersRef.child('super_users');

//insert data
addBtn.addEventListener('click', e => {
  e.preventDefault();
  //auto increment//  const autoId = usersRef.push().key
  usersRef.child(userId.value).set({
    first_name: firstName.value,
    last_name: lastName.value,
    age: age.value
  });
});

//update data
updateBtn.addEventListener('click', e => {
  e.preventDefault();
  const newData = {
      first_name: firstName.value,
      last_name: lastName.value,
      age: age.value
  };
  usersRef.child(userId.value).update(newData);
});

//delete data
removeBtn.addEventListener('click', e => {
    e.preventDefault();
    usersRef.child(userId.value).remove()
    .then(()=> { alert('User Deleted !'); })
    .catch(error => { console.error(error); });
});

//read data
usersRef.on('child_added', snapshot => {
    console.log(snapshot.val().first_name+ " "+snapshot.val().last_name)
});