/*******************************/
/*** SharpSpring Widget v0.1 ***/
/*******************************/

/*
// Primary widget function.
function sharpspringWidget() {
    // Collected user input.
    let webinarTitle = prompt("What is the short title of the webinar?");
    let baseURI = prompt("Please enter your SharpSpring form baseURI.");
    let endpoint = prompt("Please enter your SharpSpring form endpoint.");
    let gravityFormID = prompt("Please enter the ID of your chosen Gravity Form.");

    console.log(baseURI, endpoint, gravityFormID);

    // Format the input into the code snippet.
    let widgetOutput = `
    <pre><code>

// ${webinarTitle} - Webinar
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
    `;
    console.log(widgetOutput)

    // Print the result on the page.
    function printResult() {
        let result = document.getElementById("output").innerHTML = widgetOutput;
    };

    printResult()
};
*/

// Testing form submission function
document.getElementById('widgetForm').addEventListener('submit', function(event) {

    // Prevent form submission.
    event.preventDefault();
    
    // Get form data.
    var webinarTitle = document.getElementById('webinarTitle').value;
    var baseURI = document.getElementById('baseURI').value;
    var endpoint = document.getElementById('endpoint').value;
    var gravityFormID = document.getElementById('gravityFormID').value;
    
    // Print form data to console.
    console.log('Webinar Title:', webinarTitle);
    console.log('baseURI:', baseURI);
    console.log('endpoint:', endpoint);
    console.log('gravityFormID:', gravityFormID);

    // Format the input into the code snippet.
    let widgetOutput = `
    <pre><code>

// ${webinarTitle} - Webinar
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
        let result = document.getElementById("widgetForm").innerHTML = widgetOutput;
    };

    printResult()
});
