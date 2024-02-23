/*******************************/
/*** SharpSpring Widget v0.1 ***/
/*******************************/


/*********************/
/*** Custom Form ***/
/*****************/

// Function to create a new field for the custom form.
let fieldCount = 0;
document.getElementById('newField').addEventListener('click', function(event) {
    let newFieldSnippet = `
        <div class="field-section">
            <label for="gravityFormFieldID${fieldCount}">Custom Field ID:</label>
            <input type="text" id="gravityFormFieldID${fieldCount}" name="gravityFormFieldID${fieldCount}"><br><br>

            <label for="gravityFormFieldName${fieldCount}">Custom Field Name:</label>
            <input type="text" id="gravityFormFieldName${fieldCount}" name="gravityFormFieldName${fieldCount}"><br><br>
        </div>
    `;

    // Print the result on the page.
    function addNewField() {
        let result = document.getElementById("fieldArea").innerHTML += newFieldSnippet;
        fieldCount += 1;
        console.log("New Field Count: " + fieldCount);
    };

    addNewField();
});

// Custom form submission function.
document.getElementById('customWidgetForm').addEventListener('submit', function(event) {

    // Prevent form submission.
    event.preventDefault();
    
    // Get form data.
    var formTitle = document.getElementById('customFormTitle').value;
    var baseURI = document.getElementById('customBaseURI').value;
    var endpoint = document.getElementById('customEndpoint').value;
    var gravityFormID = document.getElementById('customGravityFormID').value;

    // TODO - add a for loop here to loop through the custom form fields.
    for (let i = 1; i <= fieldCount; i++) {
        // Add loop stuff here
        console.log(i);
    }
    
    // Print form data to console.
    console.log('Webinar Title:', formTitle);
    console.log('baseURI:', baseURI);
    console.log('endpoint:', endpoint);
    console.log('gravityFormID:', gravityFormID);

    // Format the input into the code snippet.
    let widgetOutput = `
    <pre><code>

// ${formTitle}
add_action( 'gform_after_submission_${gravityFormID}', 'post_to_third_party_${gravityFormID}', 10, 2 );

function post_to_third_party_${gravityFormID}( $entry, $form ) {
    $baseURI = '${baseURI}';
    $endpoint = '${endpoint}';
    $post_url = $baseURI . $endpoint;
    $body = array(
        'First Name' => rgar( $entry, '1' ),
        'Last Name' => rgar( $entry, '3' ),
        'Email' => rgar( $entry, '4' ),
        'Company' => rgar( $entry, '5' ),
        'Industry' => rgar( $entry, '7' ),
        'trackingid__sb' => $_COOKIE['__ss_tk']
    );
    $request = new WP_Http();
    $response = $request->post( $post_url, array( 'body' => $body ) );
}

    </code></pre>
    <p>To use the form again, please reload the page.</p>
    `;
    console.log(widgetOutput)

    // Print the result on the page.
    function printResult() {
        let result = document.getElementById("widgetContainer").innerHTML = widgetOutput;
    };

    printResult()
});


/*******************/
/*** Base Form ***/
/***************/

// Base form submission function.
document.getElementById('widgetForm').addEventListener('submit', function(event) {

    // Prevent form submission.
    event.preventDefault();
    
    // Get form data.
    var formTitle = document.getElementById('formTitle').value;
    var baseURI = document.getElementById('baseURI').value;
    var endpoint = document.getElementById('endpoint').value;
    var gravityFormID = document.getElementById('gravityFormID').value;
    
    // Print form data to console.
    console.log('Webinar Title:', formTitle);
    console.log('baseURI:', baseURI);
    console.log('endpoint:', endpoint);
    console.log('gravityFormID:', gravityFormID);

    // Format the input into the code snippet.
    let widgetOutput = `
    <pre><code>

// ${formTitle}
add_action( 'gform_after_submission_${gravityFormID}', 'post_to_third_party_${gravityFormID}', 10, 2 );

function post_to_third_party_${gravityFormID}( $entry, $form ) {
    $baseURI = '${baseURI}';
    $endpoint = '${endpoint}';
    $post_url = $baseURI . $endpoint;
    $body = array(
        'First Name' => rgar( $entry, '1' ),
        'Last Name' => rgar( $entry, '3' ),
        'Email' => rgar( $entry, '4' ),
        'Company' => rgar( $entry, '5' ),
        'Industry' => rgar( $entry, '7' ),
        'trackingid__sb' => $_COOKIE['__ss_tk']
    );
    $request = new WP_Http();
    $response = $request->post( $post_url, array( 'body' => $body ) );
}

    </code></pre>
    <p>To use the form again, please reload the page.</p>
    `;
    console.log(widgetOutput)

    // Print the result on the page.
    function printResult() {
        let result = document.getElementById("widgetContainer").innerHTML = widgetOutput;
    };

    printResult()
});
