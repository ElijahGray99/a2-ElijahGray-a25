

const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000


class Homework {
    constructor(ID, homeworkname, subject, expectedtime, date, stress_score) {
        this.ID = ID;
        this.subject = subject;
        this.expectedtime = expectedtime;
        this.date = date;
        this.stress_score = stress_score;
    }
}

let homework_table_data = new Map()

function add_homework(Homework_object) {

    if (!homework_table_data.has(Homework_object.ID)) {
        homework_table_data.set(Homework_object.ID, Homework_object)
        return true
    }
    return false

}

function update_homework(Homework_object) {

    if (homework_table_data.has(Homework_object.ID)) {
        homework_table_data.set(Homework_object.ID, Homework_object)
        return true
    }
    return false

}

function compute_stress_score(homework_date, homework_time) {
    const current_time = new Date();
    const due_date = new Date(homework_date);
    const time_left = (due_date.getTime() - current_time.getTime())
        / (1000 * 3600);
    let output = (homework_time * 100) - time_left;
    return Math.max(0,Math.floor(output));
}

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice(1)

    if (request.url === "/") {
        sendFile(response, "public/index.html")
    } else if (request.url === "/data") { // my first request!
        response.writeHead(200, "OK", {"Content-Type": "application/json"});
        let updated_table = JSON.stringify([...homework_table_data.values()]);
        response.end(updated_table);
    }  else {
        sendFile( response, filename )
    }

}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

      let JSONObject = JSON.parse( dataString )

    // ... do something with the data here!!!

      switch (request.url) {
        case "/submit":
            handle_new_data(JSONObject);
            break;
        case "/delete":
            delete_data(JSONObject);
            break;
      }


     response.writeHead(200, "OK", {"Content-Type": "text/plain"});
     let updated_table = JSON.stringify([...homework_table_data.values()]);
     response.end(updated_table);

  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

const handle_new_data = function(JSONObject) {

    let date = JSONObject.date;
    let time_expected = JSONObject.expectedtime;
    let ID = JSONObject.ID

    // if it exists, we update the item, if it doesn't we add it to the map.
    if (!homework_table_data.has(ID)) {
        add_homework(
            new Homework(
                ID,
                JSONObject.homeworkname,
                JSONObject.subject,
                time_expected,
                date,
                compute_stress_score(date, time_expected) // calculate stress-score.
            )
        )
    } else {
        update_homework(
            new Homework(
                ID,
                JSONObject.homeworkname,
                JSONObject.subject,
                time_expected,
                date,
                compute_stress_score(date, time_expected) // calculate stress-score.
            )
        )
    }
}

const delete_data = function(dataJSON) {
    let ID = dataJSON.ID
    // if it exists, we delete it.
    if (homework_table_data.has(ID)) {
        homework_table_data.delete(ID)
    }

}



server.listen( process.env.PORT || port )

