// 1. Initial fetch() dogs and populate the table.
//      Each dog should be a table row(<tr>) and each item an item  of       table data (<td>)
//      When populating, add event AudioListener(s) to edit         button for each dog
// 2. Clicking on the edit button populates the Edit Existing Dog or "dog-form" and when changed, sends a PATCH request to the db.json, then another GET fetch()to pull down the updated data.  Therefore, the fetch() should be in a function to enable it to be called in two different places?
// 3.Also add a new dog should work as well? (my addition, but should not be difficult?)


document.addEventListener('DOMContentLoaded', () => {
    
    const base_url = "http://localhost:3000/dogs/";
    let dogsId = 1;
    // let patchData = {};

    let doggos = [];
    const dogTableBody = document.getElementById("table-body");
    const dogForm = document.getElementById("dog-form");

    fetchMeDogs();
    
    function fetchMeDogs() {
        fetch(`${base_url}`)
        .then(response=>{
            if(response.ok) {
                return results = response.json();
            } else {
                throw error(response.statusText);
            }
        }).then(results=>{
            doggos = results;
            console.log(doggos);
            dogTableBody.innerHTML = " ";
            doggos.forEach(dog => {
                renderDogTable(dog);
            });
        }).catch(error=>console.log(error));
    }

    function patchMeDogs(patchData) {
        fetch(`${base_url}${dogsId}`, {
            method: "PATCH",
            body:JSON.stringify(patchData),
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        .then(response=>{
            if(response.ok) {
                return results = response.json();
            } else {
                throw error(response.statusText);
            }
        }).then(results=>{
            let dog = results;
            console.log(dog);
            dogTableBody.innerHTML = " ";
            console.log(dogTableBody.innerHTML);
            fetchMeDogs();
            // renderOneDog(dog); ///// Invocation of function on Line 118 alternate rendering of single line instead of re-running initial fetchMeDogs()
        }).catch(error=>console.log(error));
    }

    function renderDogTable(dog) { 
        let tableRow = document.createElement("tr");
        tableRow.id = dog.id;
        let tableDataName = document.createElement("td");
        tableDataName.textContent = dog.name;
        let tableDataBreed = document.createElement("td");
        tableDataBreed.textContent = dog.breed;
        let tableDataSex = document.createElement("td");
        tableDataSex.textContent = dog.sex;
        let tableDataBtnBox = document.createElement("td");
        let editDogBtn = document.createElement("button");
        editDogBtn.innerHTML = "Edit Dogger";
        editDogBtn.addEventListener("click", ()=>{
            // pass the id of the dog selected so the form can look up the name, breed and sex to populate the form
            renderEditDogForm(tableRow);
            })
        tableDataBtnBox.appendChild(editDogBtn);  
            
        tableRow.append(tableDataName, tableDataBreed, tableDataSex, editDogBtn);
         
        dogTableBody.append(tableRow);
    }


        function renderEditDogForm(tableRow) {
            dogsId = tableRow.id;
            const dogNameInput = document.getElementsByName("name")[0];
            const dogBreedInput = document.getElementsByName("breed")[0];
            const dogSexInput = document.getElementsByName("sex")[0];

            const cells = tableRow.getElementsByTagName("td");
            const dogNameCell = cells[0];
            const dogBreedCell = cells[1];
            const dogSexCell = cells[2];

            const dogName = dogNameCell.textContent;
            const dogBreed = dogBreedCell.textContent;
            const dogSex = dogSexCell.textContent;

            dogNameInput.value = dogName;
            dogBreedInput.value = dogBreed;
            dogSexInput.value = dogSex;

            dogForm.addEventListener("submit", (event)=> {
                event.preventDefault();
                let patchData = {
                    name: dogNameInput.value,
                    breed: dogBreedInput.value,
                    sex: dogSexInput.value,
                };  
                console.log(patchData);
                patchMeDogs(patchData);             
            })
        }

        /* /////////////////////////////////////////////////////////////////////
        Alternate function instead of re-running initial fetchMeDogs() invocation commented out on Line 57 and associated variable on Lines 53 and 54

        function renderOneDog(dog) {
            let tableRow = document.createElement("tr");
            let tableDataName = document.createElement("td");
            tableDataName.textContent = dog.name;
            let tableDataBreed = document.createElement("td");
            tableDataBreed.textContent = dog.breed;
            let tableDataSex = document.createElement("td");
            tableDataSex.textContent = dog.sex;
            let tableDataBtnBox = document.createElement("td");
            let editDogBtn = document.createElement("button");
            editDogBtn.innerHTML = "Edit Dogger";
            editDogBtn.addEventListener("click", ()=>{
                // pass the id of the dog selected so the form can look up the name, breed and sex to populate the form
                renderEditDogForm(tableRow);
                })
            tableDataBtnBox.appendChild(editDogBtn);  
               
            tableRow.append(tableDataName, tableDataBreed, tableDataSex, editDogBtn);
            tableRow.id = dog.id;
            let dogTableRow = document.getElementById(`${tableRow.id}`);
            dogTableRow.innerHTML = " ";
            dogTableRow.append(tableDataName, tableDataBreed, tableDataSex, editDogBtn);
        }
        *///////////////////////////////////////////////////////////////////////


    // End of DOMContentLoaded EventListener
})