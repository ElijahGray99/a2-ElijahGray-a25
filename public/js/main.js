// FRONT-END (CLIENT) JAVASCRIPT HERE

let homework_table;
let delete_button;

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault();

    const ID = document.querySelector("#ID").value
    const subject = document.querySelector("#subject").value
    const expectedtime = document.querySelector("#expectedtime").value
    const date = document.querySelector("#date").value

    // get info from the user's inputs
    const fields = {
        ID: ID,
        subject: subject,
        expectedtime: expectedtime,
        date: date,
    }

    // format data
    const body = JSON.stringify(fields)

    const response = await fetch( "/submit", {
        method:"POST", body
    })

    // get server response
    const text = await response.text();

    const data = JSON.parse(text);
    render_table(data);

    //console.log("main-text:", text);
    //alert("submit" + text);

}

// prepare elements for when the web-page loads!
window.onload = function() {

    homework_table = document.querySelector( "#homework-table-body" )

    const button = document.querySelector("button");
    delete_button = document.querySelector("#delete-button");

    delete_button.onclick = delete_item;
    button.onclick = submit;

    // once we get data back we then render the data.
    // automatically load the most updated data when we first
    // connect to the server!
    // I was able to use this to pull up my new data on my phone.
    load_table().then(result => render_table(result));

}


function render_table(data) {

    // sort data from server
    data.sort((a, b) => b.stress_score - a.stress_score);

    // clear the table
    homework_table.innerHTML = "";

    // add the table content
    data.forEach(element => {
        // make a row
        const row = document.createElement("tr");

        // provide info for the cells
        row.innerHTML = `
            <td>${element.ID}</td>
            <td>${element.subject}</td>
            <td>${element.expectedtime}</td>
            <td>${element.date}</td>
            <td>${element.stress_score}</td>
        `;

        // add row to the table
        homework_table.appendChild(row)
    })


}

// get the latest info from the server
const load_table = async function() {
    const response = await fetch( "/data");

    const text = await response.text();

    const data = JSON.parse(text);

    //alert(text);

    render_table(data);
}

// make a request to delete an item from the server.
const delete_item = async function( event ) {
    event.preventDefault();

    const ID_to_Delete = document.querySelector("#delete-id").value
    //alert(ID_to_Delete)

    // made it its own line to make it more clear what is happening.
    let body = JSON.stringify({ID: ID_to_Delete})

    let new_table = await fetch( "/delete", {
        method:"POST",
        headers: {"Content-Type": "text/plain"},
        body
    });

    // get server response
    const text = await new_table.text();

    const data = JSON.parse(text);
    //alert("delete item:" + text);
    render_table(data);


}



