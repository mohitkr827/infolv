import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, onValue, get } from 'firebase/database';

const firebaseApp=initializeApp({
   //Replace with Firebase WebApp Config token
});

const db = getDatabase(firebaseApp);

//-------------------------------------------------//

var tbody=document.getElementById('tbody1');
function AddItemToTable(id,roomno,stat){
    let trow=document.createElement('tr');
    let td1=document.createElement('td');
    let td2=document.createElement('td');
    let td3=document.createElement('td');


    td1.innerHTML=id;
    td2.innerHTML=roomno;
    td3.innerHTML=stat;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(Room){
    tbody.innerHTML="";
    Room.forEach(element => {
        AddItemToTable(element.id,element.room,element.status)
    });
}

function GetAllDataOnce(){
    const dbRef=ref(db);
    

    get(child(dbRef,"roomdata"))
    .then((snapshot)=>{
        var recs=[];

        snapshot.forEach(childSnapshot => {
            recs.push(childSnapshot.val());
        });
        AddAllItemsToTable(recs);
    })


}

function GetAllDataRealTime(){
    const dbRef=ref(db,"roomdata");
    onValue(dbRef,(snapshot)=>{
        var recs=[];

        snapshot.forEach(childSnapshot => {
            recs.push(childSnapshot.val());
        });
        AddAllItemsToTable(recs);
    })
}

window.onload=GetAllDataRealTime;
