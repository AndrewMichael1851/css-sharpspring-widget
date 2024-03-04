/*******************************/
/*** SharpSpring Widget v0.1 ***/
/*******************************/

// Global Variables

let fieldCount = 0;

/*********************/
/*** Custom Form ***/
/*****************/

// Function to create a new field for the custom form.
document.getElementById('newField').addEventListener('click', function(event) {

    // Add 1 to the total number of custom fields.
    fieldCount += 1;

    // Declare the temporary variable for adding the HTML to the page.
    let newFieldSnippet = `
        <div class="field-section">
            <div class=field-section-item>
                <label for="gravityFormFieldID${fieldCount}">Custom Field ${fieldCount} ID:</label>
                <input type="text" id="gravityFormFieldID${fieldCount}" name="gravityFormFieldID${fieldCount}">
            </div>

            <div class=field-section-item>
                <label for="gravityFormFieldName${fieldCount}">Custom Field ${fieldCount} Name:</label>
                <input type="text" id="gravityFormFieldName${fieldCount}" name="gravityFormFieldName${fieldCount}">
            </div>
        </div>
    `;

    // Function to print the result on the page.
    function addNewField() {
        let result = document.getElementById("fieldArea").innerHTML += newFieldSnippet;
    };

    addNewField();
});

// Custom form submission function.
document.getElementById('customWidgetForm').addEventListener('submit', function(event) {

    // Prevent default form submission.
    event.preventDefault();
    
    // Get base form data.
    var formTitle = document.getElementById('customFormTitle').value;
    var baseURI = document.getElementById('customBaseURI').value;
    var endpoint = document.getElementById('customEndpoint').value;
    var gravityFormID = document.getElementById('customGravityFormID').value;

    // Prepare for loop.
    let customFieldIDs = [];
    let customFieldNames = [];

    // Loop through the custom form fields and add the results to the above arrays.
    // Note that i must equal 1 to align with the shift for fieldCount since it's shown on the frontend.
    for (let i = 1; i <= fieldCount; i++) {
        let tempFieldID = document.getElementById(`gravityFormFieldID${i}`).value;
        let tempFieldName = document.getElementById(`gravityFormFieldName${i}`).value;

        customFieldIDs.push(tempFieldID);
        customFieldNames.push(tempFieldName);
    };
    
    // Print form data to console for testing.
    console.log('Webinar Title:', formTitle);
    console.log('baseURI:', baseURI);
    console.log('endpoint:', endpoint);
    console.log('gravityFormID:', gravityFormID);
    console.log(customFieldIDs);
    console.log(customFieldNames);

    // Build the body array.
    let bodyArray = "";
    for (let i = 0; i < fieldCount; i++) {
        if (i < fieldCount - 1) {
            bodyArray += `        '${customFieldNames[i]}' => rgar( $entry, '${customFieldIDs[i]}' ),` + "</br>";
        } else {
            bodyArray += `        '${customFieldNames[i]}' => rgar( $entry, '${customFieldIDs[i]}' ),`;
        };
    };

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
${bodyArray}
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
