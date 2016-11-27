var topl = ["Aatrox","Cho\'Gath","Darius","Dr. Mundo","Fiora","Gangplank","Garen","Gnar","Heimerdinger","Illaoi","Irelia","Jax","Jayce","Kayle","Kennen","Kled","Maokai","Mordekaiser","Nasus","Olaf","Pantheon","Poppy","Quinn","Renekton","Riven","Rumble","Ryze","Shen","Singed","Sion","Swain","Teemo","Trundle","Tryndamere","Urgot","Vladimir","Wukong","Yorick"]
var jun = ["Amumu","Elise","Evelynn","Fiddlesticks","Gragas","Graves","Hecarim","Ivern","Jarvan IV","Kha\'Zix","Kindred","Lee Sin","Master Yi","Nidalee","Nocturne","Nunu","Rammus","Rek\'Sai","Rengar","Sejuani","Shaco","Shyvana","Skarner","Udyr","Vi","Volibear","Warwick","Xin Zhao","Zac"]
var mid = ["Ahri","Akali","Annie","Anivia","Aurelion Sol","Azir","Brand","Cassiopeia","Diana","Ekko","Fizz","Galio","Karthus","Kassadin","Katarina","LeBlanc","Lissandra","Lux","Malzahar","Orianna","Syndra","Taliyah","Talon","Twisted Fate","Veigar","Vel\'Koz","Viktor","Xerath","Yasuo","Zed","Ziggs"]
var adc = ["Ashe","Caitlyn","Corki","Draven","Ezreal","Jhin","Jinx","Kalista","Kog\'Maw","Lucian","Miss Fortune","Sivir","Tristana","Twitch","Varus","Vayne"]
var sup = ["Alistar","Bard","Blitzcrank","Braum","Janna","Karma","Leona","Lulu","Morgana","Nami","Nautilus","Sona","Soraka","Tahm Kench","Taric","Thresh","Zilean","Zyra"]
var currentChamp = "Nami";
var dataset;
const MAX_DEALT = 29000.321167883;
const MAX_WARDS = 27.114444278;
const MAX_FARM = 221.382937212;
const MAX_GOLD = 12493.970097955;
const MAX_KILLS = 7.987258141;
const MAX_DEATH = 7.018248175;
var colorscale = d3.scaleOrdinal(d3.schemeSet1);
var w = 180, h = 180;

d3.json("championstotal.json", function(data){
	dataset = data.data;
});

//You have served well, young function. Your job won't be for nothing. Long live and prosper.
/*
//if someone reads this function: i'm really sorry for this code. i'm not proud of it myself.
function getMax(){
  var dealt = 0;
  var wards = 0;
  var farm = 0;
  var gold = 0;
  var kills = 0;
  var death = 0;

  //watch out: bad code below this line!
  var tmpdealt = 0;
  var tmpwards = 0;
  var tmpfarm = 0;
  var tmpgold = 0;
  var tmpkills = 0;
  var tmpdeath = 0;
  for(i = 0; i < dataset.length ; i++) {
      tmpdealt = dataset[i].DamageChampionGame;
      if(typeof(tmpdealt) == "string") { tmpdealt = tmpdealt.replace(',','.'); }
      if(parseFloat(tmpdealt) > dealt) {
        dealt = parseFloat(tmpdealt);
      }
      tmpwards = dataset[i].WardsPlacedGame;
      if(typeof(tmpwards) == "string") { tmpwards = tmpwards.replace(',','.'); }
      if(parseFloat(tmpwards) > wards) {
        wards = parseFloat(tmpwards);
      }
      tmpfarm = dataset[i].MinionGame;
      if(typeof(tmpfarm) == "string") { tmpfarm = tmpfarm.replace(',','.'); }
      if(parseFloat(tmpfarm) > farm) {
        farm = parseFloat(tmpfarm);
      }
      tmpkills = dataset[i].KillGame;
      if(typeof(tmpkills) == "string") { tmpkills = tmpkills.replace(',','.');  }
      if(parseFloat(tmpkills) > kills) {
        kills = parseFloat(tmpkills);
      }
      tmpgold = dataset[i].GoldSpentGame;
      if(typeof(tmpgold) == "string") { tmpgold = tmpgold.replace(',','.');}
      if(parseFloat(tmpgold) > gold) {
        gold = parseFloat(tmpgold);
      }
      tmpdeath = dataset[i].DeathGame;
      if(typeof(tmpdeath) == "string") { tmpdeath = tmpdeath.replace(',','.'); }
      if(parseFloat(tmpdeath) > death) {
        death = parseFloat(tmpdeath);
      }
  }
  console.log("dealt: " + dealt);
  console.log("wards: " + wards);
  console.log("farm: " + farm);
  console.log("gold: " + gold);
  console.log("kills: " + kills);
  console.log("death: " + death);

  return 0;
}
*/



function clickCircles(stuff) {
	var child = document.getElementById("champSelLeft").children;
	var champList = document.getElementById("championsList").children;

	clearChampList();
	document.getElementById("lanePortrait").src = "champions/blank.gif"
	document.getElementById("championPortrait").src = "champions/blank.gif"
	currentChamp = "";
  document.getElementById("starplot").innerHTML = "";
  document.getElementById("titleTile2").innerHTML = "";




	for(i=0 ; i < child.length ; i++){
		document.getElementById(child[i].id).className = ("not-highlight");
	}

	var auxList = checkClicked(stuff.id);


	for(i=0; i < champList.length ; i++) {
		champList[i].style.display = "inline";
		if(auxList.indexOf(champList[i].children[0].innerHTML) < 0){
			champList[i].style.display = "none";
		}
	}

	document.getElementById(stuff.id).className=("highlight");
}

function clickChamps() {
	var child = document.getElementById("champSelLeft").children;
	var champList = document.getElementById("championsList").children;

	document.getElementById("titleChamp").innerHTML = "Champions";
	document.getElementById("lanePortrait").src = "champions/blank.gif"
	document.getElementById("championPortrait").src = "champions/blank.gif"
  document.getElementById("starplot").innerHTML = "";
  document.getElementById("titleTile2").innerHTML = "";


	clearChampList();


	for(i=0; i < champList.length ; i++) {
		champList[i].style.display = "inline";
	}

	for(i = 0; i < child.length ; i++){
		document.getElementById(child[i].id).className = "";
		document.getElementById(child[i].id).style.visibility = "visible";
	}
}

function highlightClickList(element) {
	var champion = element.innerHTML;
	var child = document.getElementById("champSelLeft").children;

	for(i=0 ; i < child.length ; i++){
		document.getElementById(child[i].id).className = ("not-highlight");
	}

	clearChampList();

	if(adc.indexOf(champion) >= 0){
		$("#adcCircle").addClass("highlight");
		document.getElementById("lanePortrait").src = "images/adc.jpg"
    $("#adcCircle").removeClass("not-highlight");
    $("#championsCircle").addClass("highlight");
    $("#championsCircle").removeClass("not-highlight");
    moveCircles();        //console.log(champObject.ChampionName)

	} else if(sup.indexOf(champion) >= 0){
    $("#supportCircle").addClass("highlight");
		document.getElementById("lanePortrait").src = "images/sup.jpg"
    $("#supportCircle").removeClass("not-highlight");
    $("#championsCircle").addClass("highlight");
    $("#championsCircle").removeClass("not-highlight");
    moveCircles();
	} else if(mid.indexOf(champion) >= 0){
    $("#midCircle").addClass("highlight");
		document.getElementById("lanePortrait").src = "images/mid.jpg"
    $("#midCircle").removeClass("not-highlight");
    $("#championsCircle").addClass("highlight");
    $("#championsCircle").removeClass("not-highlight");
    moveCircles();
	} else if(topl.indexOf(champion) >= 0){
    $("#topCircle").addClass("highlight");
		document.getElementById("lanePortrait").src = "images/top.jpg"
    $("#topCircle").removeClass("not-highlight");
    $("#championsCircle").addClass("highlight");
    $("#championsCircle").removeClass("not-highlight");
    moveCircles();
	} else if(jun.indexOf(champion) >= 0){
    $("#jungleCircle").addClass("highlight");
		document.getElementById("lanePortrait").src = "images/jun.jpg"
    $("#jungleCircle").removeClass("not-highlight");
    $("#championsCircle").addClass("highlight");
    $("#championsCircle").removeClass("not-highlight");
    moveCircles();
	}

	currentChamp = champion;
	document.getElementById("championPortrait").src = "champions/" + champion + "_Square_0.png";
	element.className = ("selected");
  document.getElementById("titleTile2").innerHTML = champion;

  RadarChart.draw("#starplot");

}

function moveCircles(){
    $("#supportCircle").css("top","60px");
    $("#supportCircle").css("left","75px");
    $("#adcCircle").css("top","-223px");
    $("#adcCircle").css("left","143px");
    $("#topCircle").css("top","-368px");
    $("#topCircle").css("left","32px");
    $("#midCircle").css("top","-171px");
    $("#midCircle").css("left","210px");
    $("#jungleCircle").css("top","-218px");
    $("#jungleCircle").css("left","253px");
}

function checkClicked(id){
	switch(id){
		case "supportCircle":
			document.getElementById("titleChamp").innerHTML = "Support";
			return sup;

		case "topCircle":
			document.getElementById("titleChamp").innerHTML = "Top";
			return topl;

		case "midCircle":
			document.getElementById("titleChamp").innerHTML = "Mid";
			return mid;

		case "adcCircle":
			document.getElementById("titleChamp").innerHTML = "ADC";
			return adc;

		case "jungleCircle":
			document.getElementById("titleChamp").innerHTML = "Jungle";
			return jun;
	}
}

function clearChampList() {
	var champList = document.getElementById("championsList").children;
	for(i = 0; i < champList.length ; i++){
		champList[i].children[0].className = ("");
	}
}

function formatMe(d){
          var toReturn = 0;
          switch(d.axis){
            case ("Minions"):
              toReturn = d.value*MAX_FARM;
              break;

            case ("Gold Earned"):
              toReturn = d.value*MAX_GOLD;
              break;

            case ("Kills"):
              toReturn = d.value*MAX_KILLS;
              break;

            case ("Deaths"):
              toReturn = d.value*MAX_DEATH;
              break;

            case ("Wards"):
              toReturn = d.value*MAX_WARDS;
              break;

            case ("Damage Dealt"):
              toReturn = d.value*MAX_DEALT;
              break;

          }
          return toReturn.toFixed(2)}




var RadarChart = {
  draw: function(id){

    var champObject;

    for(i = 0; i < dataset.length; i++){
      if(dataset[i].ChampionName == currentChamp){
        champObject = dataset[i];
        console.log(champObject.ChampionName)
      }
    }

    var d = [
          [
            {axis:"Damage Dealt",value: parseFloat(champObject.DamageChampionGame.replace(',','.')) / MAX_DEALT},
            {axis:"Wards",value: parseFloat(champObject.WardsPlacedGame.replace(',','.')) / MAX_WARDS},
            {axis:"Minions",value: parseFloat(champObject.MinionGame.replace(',','.')) / MAX_FARM},
            {axis:"Gold Earned",value: parseFloat(champObject.GoldSpentGame.replace(',','.')) / MAX_GOLD},
            {axis:"Kills",value: parseFloat(champObject.KillGame.replace(',','.')) / MAX_KILLS},
            {axis:"Deaths",value: parseFloat(champObject.DeathGame.replace(',','.')) / MAX_DEATH}
          ]
        ];

  var cfg = {
     radius: 5,
     w: 180,
     h: 180,
     factor: 1,
     factorLegend: .85,
     levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     opacityArea: 0.5,
     ToRight: 5,
     TranslateX: 80,
     TranslateY: 30,
     ExtraWidthX: 300,
     ExtraWidthY: 100,
     color: d3.scaleOrdinal(d3.schemeSet1)
    };

    if('undefined' !== typeof options){
      for(var i in options){
        if('undefined' !== typeof options[i]){
          cfg[i] = options[i];
        }
      }
    }
    cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
    var allAxis = (d[0].map(function(i, j){return i.axis}));
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    var Format = d3.format('%');
    d3.select(id).select("svg").remove();

    var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
            ;


    //Circular segments
    for(var j=0; j<cfg.levels-1; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
       .data(allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
       .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
       .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
       .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    }

    series = 0;

    var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

    axis.append("line")
        .attr("x1", cfg.w/2)
        .attr("y1", cfg.h/2)
        .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
        .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "1px");

    axis.append("text")
        .attr("class", "legend")
        .text(function(d){return d})
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", function(d, i){return "translate(0, -10)"})
        .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
        .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


    d.forEach(function(y, x){
      dataValues = [];
      g.selectAll(".nodes")
        .data(y, function(j, i){
          dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
          ]);
        });
      dataValues.push(dataValues[0]);
      console.log(dataValues);
      g.selectAll(".area")
                     .data([dataValues])
                     .enter()
                     .append("polygon")
                     .attr("class", "radar-chart-serie"+series)
                     .style("stroke-width", "2px")
                     .style("stroke", cfg.color(series))
                     .style("fill", function(j, i){return cfg.color(series);})
                     .style("fill-opacity", cfg.opacityArea)
                     .attr("points",function(d) {
                         var str="";
                         for(var pti=0;pti<d.length;pti++){
                             str=str+d[pti][0]+","+d[pti][1]+" ";
                         }
                         return str;
                      })

                     .on('mouseover', function (d){
                                        z = "polygon."+d3.select(this).attr("class");
                                        g.selectAll("polygon")
                                         .transition(200)
                                         .style("fill-opacity", 0.1); 
                                        g.selectAll(z)
                                         .transition(200)
                                         .style("fill-opacity", .7);
                                      })
                     .on('mouseout', function(){
                                        g.selectAll("polygon")
                                         .transition(200)
                                         .style("fill-opacity", cfg.opacityArea);
                     });
      series++;
    });
    series=0;

    var aux;
    d.forEach(function(y, x){
      g.selectAll(".nodes")
        .data(y).enter()
        .append("svg:circle")
        .attr("class", "radar-chart-serie"+series)
        .attr('r', cfg.radius)
        .attr("alt", function(j){return Math.max(j.value, 0)})
        .attr("cx", function(j, i){
          dataValues.push([
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
        ]);
        return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
        })
        .attr("cy", function(j, i){
          return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
        })
        .attr("data-id", function(j){return j.axis})
        .style("fill", cfg.color(series)).style("fill-opacity", .9)
        .on('mouseover', function (d,j){
                    newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                    newY =  parseFloat(d3.select(this).attr('cy')) - 5;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(formatMe(d))
                        .transition(200)
                        .style('opacity', 1);

                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1); 
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                  })
        .on('mouseout', function(){
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                  });

      series++;
    });
    //Tooltip
    tooltip = g.append('text')
               .style('opacity', 0)
               .style('font-family', 'sans-serif')
               .style('font-size', '13px');
  }
};