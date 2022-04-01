"use strict"; // Javascript Es-6 version


// Searching for single name

let submit = document.getElementById('searchForm');
submit.addEventListener("submit", onFormSubmit);


function onFormSubmit(submit) {
    submit.preventDefault();


    let personName = document.getElementById('searchName').value;


    async function getCountryName() {
        try {
            const response = await fetch(`https://api.nationalize.io?name=${personName}`);
            const countryData = await response.json();
            const res = await fetch(`https://restcountries.com/v2/all`);
            const restCountryData = await res.json();

            // Function to Print Data
            function printData(data) {

                //To populate card
                let result = document.getElementById('results');
                result.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-header" id="personName">
                         <h4>${data.name}</h4>    
                    </div>
                    <div class="card-header" >  
                        <h6 class="card-subtitle mb-2">Possible Nationalities</h6>
                    </div>
                    <ul class="list-group list-group-flush" id="listItems">
        
                    </ul>
                </div>
                `;

                //To populate data within card
                let listContainer = document.getElementById('listItems');
                let listli = "";
                for (const key in data.country) {
                    restCountryData.forEach(element => {
                        if (element.alpha2Code === data.country[key].country_id) {
                            return listli += `Country Name: ${element.name}<br>Country Code: ${data.country[key].country_id}<br>Probability: ${(data.country[key].probability * 100).toFixed(2)}%`;
                        }
                    })
                }

                listContainer.innerHTML = listli;

            }
            printData(countryData);
        } catch (err) {
            console.error(err);
        }
    }

    getCountryName();
}

function Reset() {
    let result = document.getElementById('results');
    result.innerHTML = " ";
}


//Searching for Multiple Names

let submit2 = document.getElementById('searchForm2');
submit2.addEventListener("submit", onFormSubmit2);


//When Form is Submitted
function onFormSubmit2(submit) {
    submit.preventDefault();

    let peopleNames = document.getElementById('searchName2').value.replace(/\s+/g, '').split(',');



    async function getCountryName2() {
        try {
            // Making url with String operation:
            let str = '';
            for (let i = 0; i < peopleNames.length; i++) {
                str += `name=${peopleNames[i]}&`
            }
            let url = `https://api.nationalize.io?${str}`;


            // Fetching the data from 
            const response = await fetch(url);
            const countryData2 = await response.json();
            const res2 = await fetch(`https://restcountries.com/v2/all`)
            const restCountryData2 = await res2.json();

            // Function To Print Data
            function printData(data) {
                let result2 = document.getElementById('results2')
                result2.innerHTML = ""

                //To Populate cards for each persons data
                data.forEach((element, index) => {
                    result2.innerHTML += `
                    <div class="card1" style="width: 18rem;">
                      <div class="card-header">
                        <h5 class="card-title">${element.name}</h5>
                        <div class="card-header" >  
                        <h6 class="card-subtitle mb-2">Possible Nationalities</h6>
                        </div>
                        <p class="card-text" id="${index}">
                         <ul class="list-group list-group-flush" id="listItems">
        
                    </ul></p>
                      </div>
                    </div>
                    `
                    //To print the data for each card
                    let nationality = element.country
                    let cardelement = document.getElementById(`${index}`)

                    for (let i = 0; i < nationality.length; i++) {
                        if (nationality.length < 2) {
                            //Place the data in Card
                            cardelement.innerHTML = `Country Code: ${nationality[i].country_id}<br>Probability: ${(nationality[i].probability * 100).toFixed(2)}%`

                        } else {
                            for (const key in restCountryData2) {
                                if (restCountryData2[key].alpha2Code === nationality[0].country_id) {
                                    var countryname1 = restCountryData2[key].name
                                }
                                if (restCountryData2[key].alpha2Code === nationality[1].country_id) {
                                    var countryname2 = restCountryData2[key].name
                                }
                                //Place the data in card
                                cardelement.innerHTML = `Country Name: ${countryname1}<br>Country Code: ${nationality[0].country_id}<br>Probability: ${(nationality[0].probability * 100).toFixed(2)}%<br><br>Country Name: ${countryname2}<br>Country Code: ${nationality[1].country_id}<br>Probability: ${(nationality[1].probability * 100).toFixed(2)}%`
                            }
                        }
                    }
                })
            }
            printData(countryData2)

        } catch (err) {
            console.error(err)
        }
    }
    getCountryName2();

}

// Function to clear the data
function clear2() {
    let result2 = document.getElementById('results2')
    result2.innerHTML = " "
}
