/*! FILENAME: item.js
 *  AUTHOR: Seth Peterson
 *  BRIEF: his file contains logic for displaying different forms
 *  depending on the item the user is trying to find.
 */

$(function() {
  const params = new Proxy(new URLSearchParams(window.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    });
  let item_type = params.item;
  // set all form names to their ids
  $("select").each(function() {
    $(this).attr('name',$(this).attr('id'));
  });
  $("input").each(function() {
    $(this).attr('name',$(this).attr('id'));
  });

  //Load select options from text file
  // NOTE - needs data/catalog/select_options.js in the item page
  $.each(strap, function(val, text) {
    $("#strap").append( $('<option></option>').val(val).html(text) )
  });
  $.each(thread, function(val, text) {
    $("#thread").append( $('<option></option>').val(val).html(text) )
  });
  $.each(buckle, function(val, text) {
    $("#buckle").append( $('<option></option>').val(val).html(text) )
  });

  // Set form features to respond to item type
  let title = 'You Picked"';
  if (item_type == "Leash")
  {
    $("#itemHeader").append(item_type + '"');
    $("#buckle").hidden = true;
    $("#buckle2").hidden = true;
  } else if (item_type == "Collar")
  {
    $("#itemHeader").append(item_type + '"');
  } else {
    $("main").empty();
    $("#itemHeader").append('Nothing"');
    $("main").append("<br><br><h2>Please return to the Catalog to select an item.</h2>");
  }

  $(".formField").on('change', function() {
    const params = new Proxy(new URLSearchParams(window.location.search),
      {
	get: (searchParams, prop) => searchParams.get(prop),
      });
    let item_type = params.item;
    let price = 0.0;
    if (item_type == "Leash")
    {
      price = 30.0;
    } else if (item_type == "Collar")
    {
      price = 40.0;
      if ($("#buckle").find(":selected").text() == "Magnetic")
      {
	price += 10.0;
      }
    }
    if ($("#shipping").is(':checked'))
    {
      price += 10.0;
    }
    $("p#price").first().text("Current total: $" + price.toString() +" USD");
  });

  $(".formField").trigger('change');
});
