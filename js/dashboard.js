﻿var h = 768;var w = 1024;var svg;var energyGoalProgress = 0.4;var gasGoalProgress = 0.7;var energyGoalProgressToday = 0.02;var gasGoalProgressToday = 0.05;var energyProducedToday = new Array();var energyProducedAve = new Array();var energyProducedYes = new Array();var energyProducedMon = new Array();var energyProducedYear = new Array();var energyConsumedToday = new Array();var energyConsumedAve = new Array();var energyConsumedYes = new Array();var energyConsumedMon = new Array();var energyConsumedYear = new Array();var gasToday = new Array();var gasAve = new Array();var gasYes = new Array();var gasMon = new Array();var gasYear = new Array();var weatherToday = new Array();var currentTime = new Date();var month=new Array();    month[0]="Jan";    month[1]="Feb";    month[2]="Mar";    month[3]="Apr";    month[4]="May";    month[5]="June";    month[6]="July";    month[7]="Aug";    month[8]="Sept";    month[9]="Oct";    month[10]="Nov";    month[11]="Dec";var selectedEnergyTotal = 1;var selectedEnergyCon = 0;var selectedEnergyPro = 0;var selectedEnergyAve = 0;var selectedEnergyYes = 0;var selectedEnergyMon = 0;var selectedEnergyYear = 0;var selectedGasAve = 0;var selectedGasYes = 0;var selectedGasMon = 0;var selectedGasYear = 0;var energyChart;var gasChart;$(function() {    var deferred = $.ajax({url: './data/data.json'});    deferred.success(function (data) {        getData(data);         drawDashboard();    });});function getData(data) {    energyProducedToday = data.energyProducedToday;    energyProducedAve = data.energyProducedAve;    energyProducedYes = data.energyProducedYes;    energyProducedMon = data.energyProducedMon;    energyProducedYear = data.energyProducedYear ;        console.log(energyProducedToday);    energyConsumedToday = data.energyConsumedToday;    energyConsumedAve = data.energyConsumedAve;    energyConsumedYes = data.energyConsumedYes;    energyConsumedMon = data.energyConsumedMon;    energyConsumedYear = data.energyConsumedYear ;        console.log(energyConsumedToday);        gasToday = data.gasToday;    gasAve = data.gasAve;    gasYes = data.gasYes;    gasMon = data.gasMon;    gasYear = data.gasYear;        console.log(gasToday);        weatherToday = data.weatherToday;    console.log(weatherToday);}function findMax(data, data1, data2, data3, data4) {    var max = 0;    for(var i = 0; i < 24; i++) {        if (Math.abs(data[i]) > max)            max = Math.abs(data[i]);     }    for(var i = 0; i < 24; i++) {        if (Math.abs(data1[i]) > max)            max = Math.abs(data1[i]);     }    for(var i = 0; i < 24; i++) {        if (Math.abs(data2[i]) > max)            max = Math.abs(data2[i]);     }    for(var i = 0; i < 24; i++) {        if (Math.abs(data3[i]) > max)            max = Math.abs(data3[i]);     }    for(var i = 0; i < 24; i++) {        if (Math.abs(data4[i]) > max)            max = Math.abs(data4[i]);     }    return max;}function drawDashboard() {    svg = d3.select("body")        .append("svg")        .attr("width", w)        .attr("height", h);    drawTop();    drawMid();    drawBottom();    }function drawTop() {    svg.append("rect")       .attr("x", 0)       .attr("y", 0)       .attr("width", w)       .attr("height", h*8/147)       .attr("class", "bgup");    svg.append("text")        .text("WestHouse")        .attr("x", w*2/198)        .attr("y", h*6/147)        .attr("font-size", h*5/147)        .attr("font-family", "sans-serif")        .attr("fill", "#ffffff");            var datestring = month[currentTime.getMonth()] + " " + currentTime.getDate() + ", " + currentTime.getFullYear();    svg.append("svg:text")        .attr("x", w*173/198)        .attr("y", h*6/145)        .text(datestring)        .attr("font-size", h*3/145)        .attr("font-family", "sans-serif")        .attr("fill", "#878986");    drawClock(svg, w, h);}function drawMid() {    svg.append("rect")       .attr("x", 0)       .attr("y", h*8/147)       .attr("width", w)       .attr("height", h*119/147)       .attr("class", "bgmid");         svg.append("rect")       .attr("x", w*59/198)       .attr("y", h*8/147)       .attr("width", w*139/198)       .attr("height", h*119/147)       .attr("class", "bgchart");       svg.append("line")       .attr("x1", 0)       .attr("y1", h*67/147)       .attr("x2", w)       .attr("y2", h*67/147)       .attr("class", "seg");            drawEnergyChart();     drawGasChart();        drawEnergyGoal();    drawGasGoal();}function drawBottom() {    svg.append("rect")       .attr("x", 0)       .attr("y", h*127/147)       .attr("width", w)       .attr("height", h*20/147)       .attr("class", "bgdown");}    function drawEnergyGoal() {    var offSetX = 0;    var offSetY = h*9/147;    var wd = w*55/198;    var ht = h*55/147;    energyGoal = svg.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")").attr("class", "energyGoal");     energyGoal.append("text")        .text("YOUR ENERGY GOAL")        .attr("x", w/198)        .attr("y", h*4/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#716e72");            infoButton = energyGoal.append("image")        .attr("x", w*53/198)        .attr("y", -h*0.5/147)        .attr("width", w*5/198)        .attr("height", h*5/147)        .attr("xlink:href", "./images/info.png")        .style("cursor", "pointer");               infoButton.on("mouseup", function(evt){        alert('Info');    });           var arc = d3.svg.arc()        .outerRadius(w*23/198)        .innerRadius(w*17/198)        .startAngle(0);            var meter = energyGoal.append("g")        .attr("class", "progress")        .attr("transform", "translate(" + (w*29/198) + "," + (h*29/147) + ")");    meter.append("path")        .attr("class", "energyGoalBg")        .attr("d", arc.endAngle(2 * Math.PI));            var totalprogress = 2 * Math.PI * (energyGoalProgress + energyGoalProgressToday);    meter.append("path")        .attr("class", "energyGoalFgT")        .attr("d", arc.endAngle(totalprogress));               var progress = 2 * Math.PI * energyGoalProgress;    meter.append("path")        .attr("class", "energyGoalFg")        .attr("d", arc.endAngle(progress));               energyGoal.append("text")        .text("CURRENT PROGRESS: " + ((energyGoalProgress + energyGoalProgressToday)*100).toFixed(2) + "%")        .attr("x", w/198)        .attr("y", h*57/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#82bf42");   energyGoal.append("text")        .text("YOU HAVE")        .attr("x", w*21/198)        .attr("y", h*18/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#82bf42");  energyGoal.append("text")        .text("CONTRIBUTED")        .attr("x", w*18/198)        .attr("y", h*22/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#82bf42");  energyGoal.append("text")        .text((energyGoalProgressToday*100).toFixed(2)+"%")        .attr("x", w*17.5/198)        .attr("y", h*32/147)        .attr("font-size", h*9/147)        .attr("font-family", "sans-serif")        .attr("fill", "#709c45");  energyGoal.append("text")        .text("TODAY")        .attr("x", w*22/198)        .attr("y", h*39/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#82bf42");}function drawGasGoal() {    var offSetX = 0;    var offSetY = h*69/147;    var wd = w*55/198;    var ht = h*55/147;    gasGoal = svg.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")").attr("class", "gasGoal");    gasGoal.append("text")        .text("YOUR GAS GOAL")        .attr("x", w/198)        .attr("y", h*3/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#716e72");            infoButton = gasGoal.append("image")        .attr("x", w*53/198)        .attr("y", -h*1.5/147)        .attr("width", w*5/198)        .attr("height", h*5/147)        .attr("xlink:href", "./images/info.png")        .style("cursor", "pointer");             infoButton.on("mouseup", function(evt){        alert('Info');    });           var arc = d3.svg.arc()        .outerRadius(w*23/198)        .innerRadius(w*17/198)        .startAngle(0);            var meter = gasGoal.append("g")        .attr("class", "progress")        .attr("transform", "translate(" + (w*29/198) + "," + (h*29/147) + ")");    meter.append("path")        .attr("class", "gasGoalBg")        .attr("d", arc.endAngle(2 * Math.PI));       var totalprogress = 2 * Math.PI * (gasGoalProgress + gasGoalProgressToday);    meter.append("path")        .attr("class", "gasGoalFgT")        .attr("d", arc.endAngle(totalprogress));              var progress = 2 * Math.PI * gasGoalProgress;    meter.append("path")        .attr("class", "gasGoalFg")        .attr("d", arc.endAngle(progress));              gasGoal.append("text")        .text("CURRENT PROGRESS: " + ((gasGoalProgress + gasGoalProgressToday)*100).toFixed(2) + "%")        .attr("x", w/198)        .attr("y", h*57/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#60bdcf");  gasGoal.append("text")        .text("YOU HAVE")        .attr("x", w*21/198)        .attr("y", h*18/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#60bdcf");  gasGoal.append("text")        .text("CONTRIBUTED")        .attr("x", w*18/198)        .attr("y", h*22/147)        .attr("font-size", h*3/147)        .attr("font-family", "sans-serif")        .attr("fill", "#60bdcf");  gasGoal.append("text")        .text((gasGoalProgressToday*100).toFixed(2)+"%")        .attr("x", w*17.5/198)        .attr("y", h*32/147)        .attr("font-size", h*9/147)        .attr("font-family", "sans-serif")        .attr("fill", "#4d9db4");  gasGoal.append("text")        .text("TODAY")        .attr("x", w*22/198)        .attr("y", h*39/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#60bdcf");}function drawEnergyChart() {    var offSetX = w*59/198;    var offSetY = h*9/147;    energyChart = svg.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")").attr("class", "energyChart");        energyChart.append("text")        .text("TODAY'S ENERGY ACTIVITY")        .attr("x", w/198)        .attr("y", h*4/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#716e72");     infoButton = energyChart.append("image")        .attr("x", w*134/198)        .attr("y", -h*0.5/147)        .attr("width", w*5/198)        .attr("height", h*5/147)        .attr("xlink:href", "./images/info.png")        .style("cursor", "pointer");         infoButton.on("mouseup", function(evt){        alert('Info');    });            drawEnergyLineChart(energyChart);        drawEnergyControls(energyChart);}function drawGasChart() {    var offSetX = w*59/198;    var offSetY = h*69/147;    gasChart = svg.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")").attr("class", "gasChart");        gasChart.append("text")        .text("TODAY'S GAS ACTIVITY")        .attr("x", w/198)        .attr("y", h*3/147)        .attr("font-size", h*4/147)        .attr("font-family", "sans-serif")        .attr("fill", "#716e72");     infoButton = gasChart.append("image")        .attr("x", w*134/198)        .attr("y", -h*1.5/147)        .attr("width", w*5/198)        .attr("height", h*5/147)        .attr("xlink:href", "./images/info.png")        .style("cursor", "pointer");       infoButton.on("mouseup", function(evt){        alert('Info');    });    drawGasLineChart(gasChart);        drawGasControls(gasChart);}var curEnergyLineChart;function drawEnergyLineChart(svg) {    if(curEnergyLineChart != null)        curEnergyLineChart.remove();        var chart = svg.append("g").attr("class", "energyLineChart");     curEnergyLineChart = chart;        var data = new Array();     var data1 = new Array();     var data2 = new Array();     var data3 = new Array();     var data4 = new Array();                         if (selectedEnergyTotal == 1) {        for(var i = 0; i < 24; i++)  {            data.push(energyProducedToday[i]-energyConsumedToday[i]);            data1.push(energyProducedAve[i]-energyConsumedAve[i]);            data2.push(energyProducedYes[i]-energyConsumedYes[i]);            data3.push(energyProducedMon[i]-energyConsumedMon[i]);            data4.push(energyProducedYear[i]-energyConsumedYear[i]);        }    }    else if (selectedEnergyCon == 1) {        data = energyConsumedToday;        data1 = energyConsumedAve;        data2 = energyConsumedYes;        data3 = energyConsumedMon;        data4 = energyConsumedYear;    }    else if (selectedEnergyPro == 1) {        data = energyProducedToday;        data1 = energyProducedAve;        data2 = energyProducedYes;        data3 = energyProducedMon;        data4 = energyProducedYear ;    }    var max = findMax(data, data1, data2, data3, data4);          if (selectedEnergyAve == 1)        energyLineChart(chart, max, data1);    if (selectedEnergyYes == 1)        energyLineChart(chart, max, data2);    if (selectedEnergyMon == 1)        energyLineChart(chart, max, data3);    if (selectedEnergyYear == 1)        energyLineChart(chart, max, data4);    energyLineChartToday(chart, max, data);          energyLineChartAxis(chart);}function energyLineChartAxis(svg) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;        svg.append("line")       .attr("x1", w/198)       .attr("y1", h*29/147)       .attr("x2", w*138/198)       .attr("y2", h*29/147)       .attr("class", "seg");              for(var i = 0; i < 24; i = i+3) {        svg.append("text")            .text(i+":00")            .attr("x", startX+i*interval)            .attr("y", h*33/147)            .attr("font-size", h*3/147)            .attr("font-family", "sans-serif")            .attr("fill", "#716e72");    }   }function energyLineChart(chart, max, data) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;    var d, x, y;    x = startX;    y = h*29/147 - data[0]*maxh/max;    d = "M " +  x + " " + y + " ";    for(var i = 0; i < currentTime.getHours()-1; i++) {        x = startX + (i+1)*interval;        y = h*29/147 - data[i+1]*maxh/max;        d = d + "L " + x + " " + y + " ";        chart.append("circle")        .attr("cx", startX + i*interval)        .attr("cy", h*29/147 - data[i]*maxh/max)        .attr("r", 10)        .attr("fill", "#878986")        .attr("opacity", 0)        .append("svg:title")        .text(data[i]+"kwh");        chart.append("circle")        .attr("cx", startX + i*interval)        .attr("cy", h*29/147 - data[i]*maxh/max)        .attr("r", 2)        .attr("fill", "#878986")        .attr("opacity", 0.6);    }    y = h*29/147;    d = d + "L " + x + " " + y ;    x = startX;    d = d + "L " + x + " " + y  + " z";    chart.append("path")        .attr("d", d)        .attr("stroke-width", 2)        .attr("stroke", "#878986")        .attr("fill", "#f5f7f7")        .attr("opacity", 0.7);}function energyLineChartToday(chart, max, data) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;    var d, x, y;        //console.log(data);    x = startX;    y = h*29/147 - data[0]*maxh/max;    d = "M " +  x + " " + y + " ";    for(var i = 0; i < currentTime.getHours()-1; i++) {        x = startX + (i+1)*interval;        y = h*29/147 - data[i+1]*maxh/max;        d = d + "L " + x + " " + y + " ";        chart.append("circle")        .attr("cx", startX + i*interval)        .attr("cy", h*29/147 - data[i]*maxh/max)        .attr("r", 10)        .attr("fill", "#709c45")        .attr("opacity", 0)        .append("svg:title")        .text(data[i]+"kwh");        chart.append("circle")        .attr("cx", startX + i*interval)        .attr("cy", h*29/147 - data[i]*maxh/max)        .attr("r", 2)        .attr("fill", "#709c45");    }    y = h*29/147;    d = d + "L " + x + " " + y ;    x = startX;    d = d + "L " + x + " " + y  + " z";    chart.append("path")        .attr("d", d)        .attr("stroke-width", 2)        .attr("stroke", "#709c45")        .attr("fill", "#daebb8")        .attr("opacity", 0.8);}var curGasLineChart;function drawGasLineChart(svg) {    if(curGasLineChart != null)        curGasLineChart.remove();            var chart = svg.append("g").attr("class", "gasLineChart");     curGasLineChart = chart;        var data = new Array();     var data1 = new Array();     var data2 = new Array();     var data3 = new Array();     var data4 = new Array();     data = gasToday;    data1 = gasAve;    data2 = gasYes;    data3 = gasMon;    data4 = gasYear;        var max = findMax(data, data1, data2, data3, data4);        if (selectedGasAve == 1)        gasLineChart(chart, max, data1);    if (selectedGasYes == 1)        gasLineChart(chart, max, data2);    if (selectedGasMon == 1)        gasLineChart(chart, max, data2);    if (selectedGasYear == 1)        gasLineChart(chart, max, data4);            gasLineChartToday(chart, max);            gasLineChartAxis(chart);}function gasLineChartAxis(svg) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;        svg.append("line")       .attr("x1", w/198)       .attr("y1", h*29/147)       .attr("x2", w*138/198)       .attr("y2", h*29/147)       .attr("class", "seg");             for(var i = 0; i < 24; i = i+3) {        svg.append("image")            .attr("x", startX + i*interval)            .attr("y", h*32/147)            .attr("width", w*6/198)            .attr("height", h*6/147)            .attr("xlink:href", "./images/" + weatherToday[i]+".png");         svg.append("text")            .text(i+":00")            .attr("x", startX+i*interval)            .attr("y", h*33/147)            .attr("font-size", h*3/147)            .attr("font-family", "sans-serif")            .attr("fill", "#716e72");    }   }function gasLineChart(chart, max,data) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;    var d, x, y;    x = startX;    y = h*29/147 - data[0]*maxh/max;    d = "M " +  x + " " + y + " ";    for(var i = 0; i < currentTime.getHours()-1; i++) {        x = startX + (i+1)*interval;        y = h*29/147 - data[i+1]*maxh/max;        d = d + "L " + x + " " + y + " ";        chart.append("circle")            .attr("cx", startX + i*interval)            .attr("cy", h*29/147 - data[i+1]*maxh/max)            .attr("r", 10)            .attr("fill", "#878986")            .attr("opacity", 0)            .append("svg:title")            .text((data[i]));        chart.append("circle")            .attr("cx", startX + i*interval)            .attr("cy", h*29/147 - (data[i])*maxh/max)            .attr("r", 2)            .attr("fill", "#878986")            .attr("opacity", 0.6);    }    y = h*29/147;    d = d + "L " + x + " " + y ;    x = startX;    d = d + "L " + x + " " + y  + " z";    chart.append("path")        .attr("d", d)        .attr("stroke-width", 2)        .attr("stroke", "#878986")        .attr("fill", "#f5f7f7")        .attr("opacity", 0.7);}function gasLineChartToday(chart, max) {    var wd = w*135/198;    var ht = h*48/147;    var maxh = ht/2;    var startX = w*3/147;    var interval = wd/25;    var d, x, y;    x = startX;    y = h*29/147 - gasToday[0]*maxh/max;    d = "M " +  x + " " + y + " ";    for(var i = 0; i < currentTime.getHours()-1; i++) {        x = startX + (i+1)*interval;        y = h*29/147 - gasToday[i+1]*maxh/max;        d = d + "L " + x + " " + y + " ";        chart.append("circle")            .attr("cx", startX + i*interval)            .attr("cy", h*29/147 - gasToday[i+1]*maxh/max)            .attr("r", 10)            .attr("fill", "#4d9db4")            .attr("opacity", 0)            .append("svg:title")            .text((gasToday[i]));        chart.append("circle")            .attr("cx", startX + i*interval)            .attr("cy", h*29/147 - (gasToday[i])*maxh/max)            .attr("r", 2)            .attr("fill", "#4d9db4");    }    y = h*29/147;    d = d + "L " + x + " " + y ;    x = startX;    d = d + "L " + x + " " + y  + " z";    chart.append("path")        .attr("d", d)        .attr("stroke-width", 2)        .attr("stroke", "#4d9db4")        .attr("fill", "#a1e7f6")        .attr("opacity", 0.7);}function drawEnergyControls(svg) {    var totalButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             totalButton.append("rect")        .attr("x", w/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*9/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            totalButton.append("text")        .text("TOTAL")        .attr("x", w*2/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");        if (selectedEnergyTotal == 1)         totalButton.attr("opacity", 0.6);    totalButton.on("mouseup", function(evt){        selectedEnergyTotal = 1;        selectedEnergyCon = 0;        selectedEnergyPro = 0;        totalButton.attr("opacity", 0.6);        consumptionButton.attr("opacity", 1);        productionButton.attr("opacity", 1);        drawEnergyLineChart(energyChart);    });    var consumptionButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             consumptionButton.append("rect")        .attr("x", w*12/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*18/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            consumptionButton.append("text")        .text("CONSUMPTION")        .attr("x", w*13/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    consumptionButton.on("mouseup", function(evt){        selectedEnergyTotal = 0;        selectedEnergyCon = 1;        selectedEnergyPro = 0;        consumptionButton.attr("opacity", 0.6);        totalButton.attr("opacity", 1);        productionButton.attr("opacity", 1);        drawEnergyLineChart(energyChart);    });    var productionButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             productionButton.append("rect")        .attr("x", w*32/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*15/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            productionButton.append("text")        .text("PRODCTION")        .attr("x", w*33/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    productionButton.on("mouseup", function(evt){        selectedEnergyTotal = 0;        selectedEnergyCon = 0;        selectedEnergyPro = 1;        productionButton.attr("opacity", 0.6);        totalButton.attr("opacity", 1);        consumptionButton.attr("opacity", 1);        drawEnergyLineChart(energyChart);    });    svg.append("text")        .text("COMPARE TO:")        .attr("x", w*55/198)        .attr("y", h*56.7/147)        .attr("font-size", h*2.4/147)        .attr("font-family", "sans-serif")        .attr("class", "energyLabel");               var averageButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             averageButton.append("rect")        .attr("x", w*73/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*12/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            averageButton.append("text")        .text("AVERAGE")        .attr("x", w*74/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    if (selectedEnergyAve == 1)         totalButton.attr("opacity", 0.6);             averageButton.on("mouseup", function(evt){         if (selectedEnergyAve == 0) {            averageButton.attr("opacity", 0.6);            selectedEnergyAve = 1;            drawEnergyLineChart(energyChart);         }         else {            averageButton.attr("opacity", 1);            selectedEnergyAve = 0;            drawEnergyLineChart(energyChart);         }    });    var yesterdayButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             yesterdayButton.append("rect")        .attr("x", w*87/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*15/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            yesterdayButton.append("text")        .text("YESTERDAY")        .attr("x", w*88/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    yesterdayButton.on("mouseup", function(evt){         if (selectedEnergyYes == 0) {            yesterdayButton.attr("opacity", 0.6);            selectedEnergyYes = 1;            drawEnergyLineChart(energyChart);         }         else {            yesterdayButton.attr("opacity", 1);            selectedEnergyYes = 0;            drawEnergyLineChart(energyChart);         }    });    var lastmonthButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             lastmonthButton.append("rect")        .attr("x", w*104/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*15/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            lastmonthButton.append("text")        .text("LAST MONTH")        .attr("x", w*105/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    lastmonthButton.on("mouseup", function(evt){         if (selectedEnergyMon == 0) {            lastmonthButton.attr("opacity", 0.6);            selectedEnergyMon = 1;            drawEnergyLineChart(energyChart);         }         else {            lastmonthButton.attr("opacity", 1);            selectedEnergyMon = 0;            drawEnergyLineChart(energyChart);         }    });    var lastyearButton = svg.append("g")        .attr("class", "energyButton")        .style("cursor", "pointer");             lastyearButton.append("rect")        .attr("x", w*121/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*14/198)        .attr("height", h*3/147)        .attr("class", "energyButtonBg");            lastyearButton.append("text")        .text("LAST YEAR")        .attr("x", w*122/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "energyButtonBg");    lastyearButton.on("mouseup", function(evt){         if (selectedEnergyYear == 0) {            lastyearButton.attr("opacity", 0.6);            selectedEnergyYear = 1;            drawEnergyLineChart(energyChart);         }         else {            lastyearButton.attr("opacity", 1);            selectedEnergyYear = 0;            drawEnergyLineChart(energyChart);         }    });}function drawGasControls(svg) {    svg.append("text")        .text("COMPARE TO:")        .attr("x", w*55/198)        .attr("y", h*56.7/147)        .attr("font-size", h*2.4/147)        .attr("font-family", "sans-serif")        .attr("class", "gasLabel");       var averageButton = svg.append("g")        .attr("class", "gasButton")        .style("cursor", "pointer");             averageButton.append("rect")        .attr("x", w*73/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*12/198)        .attr("height", h*3/147)        .attr("class", "gasButtonBg");            averageButton.append("text")        .text("AVERAGE")        .attr("x", w*74/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "gasButtonBg");    averageButton.on("mouseup", function(evt){         if (selectedGasAve == 0) {            averageButton.attr("opacity", 0.6);            selectedGasAve = 1;            drawGasLineChart(gasChart);         }         else {            averageButton.attr("opacity", 1);            selectedGasAve = 0;            drawGasLineChart(gasChart);         }    });    var yesterdayButton = svg.append("g")        .attr("class", "gasButton")        .style("cursor", "pointer");             yesterdayButton.append("rect")        .attr("x", w*87/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*15/198)        .attr("height", h*3/147)        .attr("class", "gasButtonBg");            yesterdayButton.append("text")        .text("YESTERDAY")        .attr("x", w*88/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "gasButtonBg");    yesterdayButton.on("mouseup", function(evt){         if (selectedGasYes == 0) {            yesterdayButton.attr("opacity", 0.6);            selectedGasYes = 1;            drawGasLineChart(gasChart);         }         else {            yesterdayButton.attr("opacity", 1);            selectedGasYes = 0;            drawGasLineChart(gasChart);         }    });    var lastmonthButton = svg.append("g")        .attr("class", "gasButton")        .style("cursor", "pointer");             lastmonthButton.append("rect")        .attr("x", w*104/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*15/198)        .attr("height", h*3/147)        .attr("class", "gasButtonBg");            lastmonthButton.append("text")        .text("LAST MONTH")        .attr("x", w*105/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "gasButtonBg");    lastmonthButton.on("mouseup", function(evt){         if (selectedGasMon == 0) {            lastmonthButton.attr("opacity", 0.6);            selectedGasMon = 1;            drawGasLineChart(gasChart);         }         else {            lastmonthButton.attr("opacity", 1);            selectedGasMon = 0;            drawGasLineChart(gasChart);         }    });    var lastyearButton = svg.append("g")        .attr("class", "gasButton")        .style("cursor", "pointer");             lastyearButton.append("rect")        .attr("x", w*121/198)        .attr("y", h*54/147)        .attr("rx", 3)        .attr("ry", 3)        .attr("width", w*14/198)        .attr("height", h*3/147)        .attr("class", "gasButtonBg");            lastyearButton.append("text")        .text("LAST YEAR")        .attr("x", w*122/198)        .attr("y", h*56.5/147)        .attr("font-size", h*2/147)        .attr("font-family", "sans-serif")        .attr("class", "gasButtonBg");    lastyearButton.on("mouseup", function(evt){         if (selectedGasYear == 0) {            lastyearButton.attr("opacity", 0.6);            selectedGasYear = 1;            drawGasLineChart(gasChart);         }         else {            lastyearButton.attr("opacity", 1);            selectedGasYear = 0;            drawGasLineChart(gasChart);         }    });}/*function getEnergyProduced() {    for(var i = 0; i < 24; i++) {        energyProducedToday[i] = 100+Math.floor((Math.random()*5));        energyProducedAve[i] = 100+Math.floor((Math.random()*5));        energyProducedYes[i] = 100+Math.floor((Math.random()*5));        energyProducedMon[i] = 100+Math.floor((Math.random()*5));        energyProducedYear[i] = 100+Math.floor((Math.random()*5));    }document.write(energyProducedToday+"         \n");document.write(energyProducedAve+"            \n ");document.write(energyProducedYes+"             \n ");document.write(energyProducedMon+"              \n");document.write(energyProducedYear+"            \n ");}function getEnergyConsumed() {    for(var i = 0; i < 24; i++) {        energyConsumedToday[i] = 100+Math.floor((Math.random()*10));        energyConsumedAve[i] = 100+Math.floor((Math.random()*10));        energyConsumedYes[i] = 100+Math.floor((Math.random()*10));        energyConsumedMon[i] = 100+Math.floor((Math.random()*10));        energyConsumedYear[i] = 100+Math.floor((Math.random()*10));    }document.write(energyConsumedToday+"  ");document.write(energyConsumedAve+"  ");document.write(energyConsumedYes+"  ");document.write(energyConsumedMon+"  ");document.write(energyConsumedYear+"  ");}function getGas() {    for(var i = 0; i < 24; i++) {        gasToday[i] = 50+Math.floor((Math.random()*50));        gasAve[i] = 50+Math.floor((Math.random()*50));        gasYes[i] = 50+Math.floor((Math.random()*50));        gasMon[i] = 50+Math.floor((Math.random()*50));        gasYear[i] = 50+Math.floor((Math.random()*50));    }document.write(gasToday+"         \n");document.write(gasAve+"         \n");document.write(gasYes+"         \n");document.write(gasMon+"         \n");document.write(gasYear+"         \n");}*/