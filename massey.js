$(document).ready(function() {
	$("#teams").hide();
	$("#matches").hide();
	$("#finish").hide();
});
var teams = [];
var massey_matrix = [];
var massey_diff = [];
$("#intro-continue").click(function() {
	$("#intro").hide();
	$("#teams").show();
});
$("#add-team").click(function() {
	var team = $("#new-team").val();
	if (team != "") {
		$("#team-list").append("<li>"+team+"</li>");
		teams.push(team);
		$("#new-team").val("");
	}
});
$("input#new-team").keypress(function (e) {
	if (e.which == 13) {
		var team = $("#new-team").val();
		if (team != "") {
			$("#team-list").append("<li>"+team+"</li>");
			teams.push(team);
			$("#new-team").val("");
		}
	}
});
$("#teams-continue").click(function() {
	$("#teams").hide();
	$("#matches").show();
	$.each(teams, function(key, value) {   
		$("#winner").append($("<option></option>").attr("value",key).text(value));
		$("#loser").append($("<option></option>").attr("value",key).text(value));
	});
});
$("#add-match").click(function() {
	var winner = $("#winner").val();
	var loser = $("#loser").val();
	var match_diff = $("#diff").val();
	var match_row = Array.apply(null, Array(teams.length)).map(Number.prototype.valueOf,0);
	match_row[winner] = 1;
	match_row[loser] = -1;
	if (match_diff != "") {
		$("#match-list").append("<li>"+teams[winner]+" - "+teams[loser]+" = "+match_diff+"</li>");
		massey_diff.push(match_diff);
		massey_matrix.push(match_row);
		$("#diff").val("");
	}
});
$("#matches-continue").click(function() {
	$("#matches").hide();
	$("#finish").show();
	var code = "";
	var matrix = "W = [";
	for (var i = 0; i < massey_matrix.length; i++) {
		var line = massey_matrix[i].join(" ");
		matrix += line + ";<br/>";
	}
	matrix = matrix.substring(0, matrix.length-6) + "];<br/>";
	var vector = "D = [" + massey_diff.join(";");
	vector = vector.substring(0, vector.length) + "];<br/>";
	var ones = "";
	for (var i = 0; i < teams.length; i++) {
		ones += "1 ";
	}
	code += matrix + vector + "WT = transpose(W);<br/>M = WT*W;<br/>B = WT*D;<br/>ones = ["+ones+"];<br/>M("+teams.length+",:)=ones;<br/>B("+teams.length+") = 0;<br/>R = M&#92;B;<br/>disp(R);";
	$("#matlab-code").html(code);
	for (var i = 0; i < teams.length; i++) {
		$("#team-final").append("<li>"+teams[i]+"</li>");
	}
});