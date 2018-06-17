var worldcup18_url;
var worldcup18_apikey;

$(document).ready(function() {

	worldcup18_url = "https://api.football-data.org/v1/competitions/467/fixtures";
	worldcup18_apikey = "<?php echo getConfigValue('worldcup18_apikey'); ?>";

	$.ajaxSetup({
	  headers : {
	    "X-Auth-Token": worldcup18_apikey
	  },
	  async: false
	});

	worldcup18();
});

function worldcup18(){

	if (worldcup18_apikey != "") {
		$.getJSON(worldcup18_url).done(function(data){
				today = new Date();
				today_string = today.getDate().pad(2) + "." + (today.getMonth()+1).pad(2) + "." + today.getFullYear();
				$("#worldcup18_table").empty();

		    $(data.fixtures).each(function(index, fixture) {
		      date = new Date(fixture.date);

					$("#worldcup18_date").text(today_string);

		      if (date.getMonth() == today.getMonth() && date.getDate() == today.getDate()){
		        $.getJSON(fixture._links.awayTeam.href).done(function(awayTeam){
		          awayTeamFlagUrl = awayTeam.crestUrl;

		          $.getJSON(fixture._links.homeTeam.href).done(function(homeTeam){
		            $("#worldcup18_table").append("<tr></tr>");
		            $("#worldcup18_table tr:last").append("<td>" + date.getHours().pad(2) + ":" + date.getMinutes().pad(2) + "<td>");

		            if (fixture.status == "IN_PLAY"){
		              $("#worldcup18_table tr:last").append("<td><i class='fa fa-circle' style='color: red'></i><td>");
		            }

		            if (fixture.status == "FINISHED"){
		              $("#worldcup18_table tr:last").append("<td><i class='fa fa-check'></i><td>");
		            }

		            if (fixture.status == "TIMED"){
		              $("#worldcup18_table tr:last").append("<td><i class='fa fa-clock-o'></i><td>");
		            }

		            $("#worldcup18_table tr:last").append("<td> <img width='20px' src='" + homeTeam.crestUrl + "'> " + fixture.homeTeamName + "</td>");

		            if (fixture.status == "FINISHED" || fixture.status == "IN_PLAY") {
		              $("#worldcup18_table tr:last").append("<td>" + fixture.result.goalsHomeTeam + "<td>");
		              $("#worldcup18_table tr:last").append("<td>-<td>");
		              $("#worldcup18_table tr:last").append("<td>" + fixture.result.goalsAwayTeam + "<td>");
		            } else {
		              $("#worldcup18_table tr:last").append("<td>?<td>");
		              $("#worldcup18_table tr:last").append("<td>-<td>");
		              $("#worldcup18_table tr:last").append("<td>?<td>");
		            }

		            $("#worldcup18_table tr:last").append("<td><img width='20px' src='" + awayTeam.crestUrl + "'> " + fixture.awayTeamName + "</td>");
		          });
		        });
		      }
		    });

				if ($("#worldcup18_table tr").size() == 0) {
					$("#worldcup18_table").append("<tr></tr>");
					$("#worldcup18_table tr:last").append("<td><i class='fa fa-2x fa-futbol-o'></i><td>");
					$("#worldcup18_table tr:last").append("<td><?php echo _('worldcup18worldcup18_no_games_today'); ?><td>");
				}

		  });
		} else {
			$("#worldcup18_table").append("<tr></tr>");
			$("#worldcup18_table").append("<td><?php echo _('worldcup18_configure_in_settings'); ?><td>");
		}


	window.setTimeout(function() {
		worldcup18();
	}, 2 * 1000 * 60);
}


Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
