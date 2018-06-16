$(document).ready(function() {

  $(".worldcup18_save--button").click(function() {

    worldcup18_apikey = $("#worldcup18_apikey").val();

    $.post('setConfigValueAjax.php', {'key': 'worldcup18_apikey', 'value': worldcup18_apikey}).success(function(){
      $('#ok').show(30, function() {
        $(this).hide('slow');
        location.reload();
      });
    }).fail(function(){
      $('#error').show(30, function() {
        $(this).hide('slow');
      });
    });

  });

});
