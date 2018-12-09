$(document).ready(init_page);

var GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbw0HdsoFMFoiKpBzcAXiPrS1u1XdjIXKmmdie8NDJAvgQqFUbGe/exec';

var FIELDS = ['name1', 'name2', 'name3','phone1', 'phone2', 'phone3',
		  'classroom1', 'classroom2', 'classroom3', 'description', 'requests']

var REQUIRED_FIELDS = ['name1', 'phone1', 'classroom1', 'description'];

function init_page(){
    $('.spinner').hide()
    $('button#signup').click(function(){return on_submit_signup();});
    $('.modals .btn.ok').click(signup_restore);
}

// If you click "OK" in error/success alert boxes, dismiss them.
function signup_restore(){
    $('.modals').hide(200);
    $('.is-invalid').removeClass('is-invalid');
    return false;
}


// returns object with form values as {key:value}
// If any required fields are missing, the returned object contains only those instead,
// along with {"error":"incomplete}
function gather_data(){
    var result = {};
    var valid = true;
    result['needElectric'] = $('#needElectric').is(":checked")
    for (var i in FIELDS){
	var field = FIELDS[i];
	var value = $('form #'+field).val();
	var is_required = REQUIRED_FIELDS.includes(field);
	var is_missing = (value == '');
	if ( is_required && is_missing) {
	    if (valid) {
		result = {"error": "incomplete"};
		valid = false;
	    }
	}
	if (valid){
	    if (is_missing) {
		value = '-';
	    }
	    result[field] = value;
	} else if (is_required && is_missing) {
	    result[field] = value;
	}
    }
    return result;
}

    

// If you click "add me", post form value to the cloud (google spreadsheet)
function on_submit_signup(){
    console.log('on_submit_signup');
    var data = gather_data();
    // First, validate the email address
    if (data['error'] == 'incomplete'){
	var filtered = Object.keys(data).filter(function(value, index, arr){
	    return value != 'error';
	});
	$(filtered).each(function(i, field){
	    $('#'+field).addClass('is-invalid');
	});

	errMsg = "Some required fields are missing: " + filtered.join(', ');

	callback({result: errMsg});
	return false;
    } else {
	// Address is good, go POST it
	$('.spinner').show();
	$.ajax({url: GOOGLE_URL,
		data: data,
		jsonpCallback: 'callback',
		error: on_fail,
		dataType: 'jsonp'
	       });
	return false;    // e.preventDefault
    }
}

function on_fail(jqXHR, textStatus, errorThrown){
    console.log('fail', jqXHR, textStatus, errorThrown);
    show_alert({result:"Could not post data to server."});
}

// Called when AJAX returns success or failure
// result_struct is either
//  { result: "success" } or
//  { result: <error string> }
function callback(result_struct){
    $('.spinner').hide();
    show_alert(result_struct);
    return false;
}

function show_alert(result_struct){
    $('.spinner').hide();
    $('.modals').show();
    var result = result_struct.result;
    if (result == 'success'){
	$('.modals .fail').hide();
	$('.modals .success').show();
    } else {
	$('.modals .success').hide();
	$('.modals .fail').show();
	$('.modals .fail .reason').html(result);
    }
    return false;
}

// returns true if email is valid, else returns false.
function validateEmail(email) {
  var re = /(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return re.test(email);
}


