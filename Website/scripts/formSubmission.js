/*! FILENAME: formSubmission.js
 *  AUTHOR: Seth Peterson
 *  BRIEF: This file contains submission logic to record user form entries.
 */

/*When the document is loaded, sign up for button click events and
 * focus on the first email address field of the form.
 */

// Form Submission function
$(function() {$("form#itemForm").on("submit", function( event )
  {
    event.preventDefault();
    //Test to see if things are valid
    if(!validateForm("name","email1","email2"))
    {
      return;
    }
    let formValues = formArrayToCSV($(this).serializeArray() );
    let time = (new Date($.now()).toString() + ",");

    download("3438_Gear_submission-"+time,formValues+time);

    $("#email1").dblclick(function() {$(this).val("").next().text("*");});
    $("#email2").dblclick(function() {$(this).val("").next().text("*");});
    $("#name").dblclick(function() {$(this).val("").next().text("*");});
  });
});

//Turn our fixed strings from HTML select forms into CSV format.
const strToCSV = function (data) {
  let input_string = data;
  input_string.replace('"','""'); //CSV needs two " double quote to register a quote.
  if (input_string.indexOf(',') >= 0)
  {
    input_string = '"' + input_string + '"'; //surround the entry in single quotes to protect vs comma strings
  }
  return input_string;
}

// turns an array into a row for CSV format
const formArrayToCSV = function (data) {
  let csv = "";
  $.each(data, function(key, value) {
    csv += data[key].name + ":" + data[key].value + ", ";
  });
  csv = csv.slice(0,-1);
  return csv;
}

function validateForm(name,item1,item2)
{
  let n1 = $("#" + name);
  let i1 = $("#" + item1);
  let i1e = i1.next();
  let i2 = $("#" + item2);
  let i2e = i2.next();
  var emailAddress1 = i1.val();
  var emailAddress2 = i2.val();
  var addressRegex = /^[ {};:"\\|,<>\/\?~]+$/;
  var isValid = true;

  if (emailAddress1 == "")
  {
    i1e.text("This field is required.");
    isValid = false;
  } else if (addressRegex.test(emailAddress1)) {
    i1e.text("Invalid special characters detected.");
    isValid = false;
  }

  // validate the second email address
  // NOTE - no extra validation required, it is forced to be equal to
  //   the first email, and by extension gains restrictions from there.
  if (emailAddress2 != emailAddress1) { 
    i2e.text("This entry must equal first entry.");
    isValid = false; 
  } else if (emailAddress1 == "") { 
    i2e.text("This field is required.");
    isValid = false;
  } else {
    i2e.text("");
  }

  // Names are defined as at least two non whitespace characters.
  var nameRegex = /^[^\s][^\s]+$/;
  // validate the first name entry  
  if (n1.val() == "") {
    n1.next().text("This field is required.");
    isValid = false;
  } 
  else {
    if(nameRegex.test(n1.val()))
    {
      //Valid name message.
      n1.next().text("");
    } else {
      n1.next().text("Must be two adjacent non whitespace characters");
    }
  }
  // submit the form if all entries are valid
  return isValid;
}

// This function replaces all user text entries in the form with empty strings
//   and returns the asterisks for the error text.
//   also returns focus to the first text box.
function clearList()
{
  //$("#email_address1").val("").next().text("*");
  //$("#email_address2").val("").next().text("*");
  $("#name").val("").next().text("*");
  $("#subject").val("").next().text("*");
  $("#subject").focus();
}

// generic CSV header generator based on current spreadsheet columns
const headerCSV = function () 
{
  let header = ["Date","Loss","Profit","Other Party","External Order ID","Order ID","Type","Commission Number","Alias","Details"];
  header.forEach(strToCSV);
  //console.log(header);
  return header.join(',') + '\n';
}

function download(filename, text) 
{
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
