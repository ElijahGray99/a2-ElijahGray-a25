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

    console.log("main-text:", text);
    //alert(text);

}

// prepare elements for when the web-page loads!
window.onload = function() {

    homework_table = document.querySelector( "#homework-table-body" )

    const button = document.querySelector("button");
    delete_button = document.querySelector("#delete-button");

    delete_button.onclick = delete_item;
    button.onclick = submit;

    load_table().then(result => render_table(result));

}


function render_table(data) {

    data.sort((a, b) => b.stress_score - a.stress_score);

    homework_table.innerHTML = "";

    data.forEach(element => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${element.ID}</td>
            <td>${element.subject}</td>
            <td>${element.expectedtime}</td>
            <td>${element.date}</td>
            <td>${element.stress_score}</td>
        `;

        homework_table.appendChild(row)
    })


}

const load_table = async function( event ) {
    const response = await fetch( "/data");
    return await response.json();
}

const delete_item = async function( event ) {
    event.preventDefault();
    const ID_to_Delete = document.querySelector("#delete-id").value

    const response = await fetch( "/delete", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ID: ID_to_Delete})
    })

    load_table().then(result => render_table(result));

}



