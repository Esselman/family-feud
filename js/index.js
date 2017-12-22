var data = {
"Name a toy you always see in pictures of Santa's Workshop": [
[
"Doll",
39
],
[
"Stuffed Animal",
13
],
[
"Train",
11
],
[
"Rocking Horse",
9
],
[
"Toy Soldier",
9
],
[
"Drum",
4
],
[
"Ball",
3
],
[
"Wagon",
3
]
],
"Name a kind of food that gets stuck between your teeth": [
[
"Corn",
37
],
[
"Meat",
23
],
[
"Popcorn",
22
],
[
"Caramel",
6
],
[
"Nuts",
3
],
[
"Peanut Butter",
3
],
[
"Taffy",
2
]
],
"Name something you find in your Christmas stocking": [
[
"Candy",
62
],
[
"Fruit",
15
],
[
"Coal",
5
],
[
"Perfume",
5
],
[
"Money",
3
],
[
"Toys",
3
],
[
"Nuts",
3
]
],"Name something of yours that costs a lot of money to keep looking good": [
[
"Car",
35
],
[
"House",
35
],
[
"Hair",
15
],
[
"Face",
3
],
[
"Body",
2
],
[
"Clothing",
2
],
[
"Yard",
2
]
],"Name a car people buy as a status symbol": [
[
"Mercedes",
27
],
[
"Cadillac",
26
],
[
"BMW",
14
],
[
"Lincoln",
9
],
[
"Rolls Royce",
8
],
[
"Porsche",
7
],
[
"Corvette",
4
]
],
"Name a good gift for the &x22;Outdoors&x22; type": [
[
"Fishing Rod",
20
],
[
"Tent",
19
],
[
"Backpack",
9
],
[
"Clothing",
8
],
[
"Sleeping Bag",
8
],
[
"Boots",
5
],
[
"Golf Clubs",
3
],
[
"Knife",
3
],
[
"Lantern",
3
]
],
"Name something, besides yourself, that you wash": [
[
"Car",
43
],
[
"Clothes",
40
],
[
"Dishes",
14
],
[
"Windows",
2
]
],
"Name someone from the Bible whose name starts with the letter &x22;M&x22;": [
[
"Moses",
65
],
[
"Mary",
20
],
[
"Matthew",
9
],
[
"Mark",
3
]
],
"What do many new husbands promise they'll get their wives &x22;someday&x22;": [
[
"House",
37
],
[
"Clothes",
33
],
[
"Jewelry",
19
],
[
"Car",
5
],
[
"Furniture",
3
]
],
"Name something important you keep in your glove compartment": [
[
"Registration",
37
],
[
"Flashlight",
34
],
[
"Insurance Card",
11
],
[
"Map",
7
],
[
"First Aid Kit",
3
]
],
"Name something on the front of a car": [
[
"Bumper",
41
],
[
"Headlights",
41
],
[
"Grill",
10
],
[
"Lic",
3
]
],
"Name a state with a desert": [
[
"Arizona",
36
],
[
"California",
36
],
[
"Nevada",
21
],
[
"Utah",
5
],
[
"New Mexico",
2
]
]
}

var app = {
  version: 1,
  // jsonFile:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/40041/FF3.json",
   jsonFile:"../images/questions.json",
  currentQ: 0,
  multiplyer: 1,
  board: $("<div class='gameBoard'>"+

             "<!--- Scores --->"+
             "<div class='score' id='boardScore'>0</div>"+
             "<div class='score' id='team1' >0</div>"+
             "<div class='score' id='team2' >0</div>"+

             "<!--- Question --->"+
             "<div id='questionHolder' class='questionHolder'>"+
               "<span id='questionName' class='question'></span>"+
             "</div>"+

             "<!--- Answers --->"+
             "<div class='colHolder'>"+

               "<div class='col1'></div>"+
               "<div class='col2'></div>"+
               "<div id='multiplyerWrapper' class='cardHolder full'>" +
                "<div class='blue' id='multiplyer'></div>"+
               "</div>" +
               "<div id='strikes'>" +
               "</div>" +
             "</div>"+

             // "<div id='strikes'>" +
             // "</div>" +
             // "<div class='multiplyerHolder blue'>" +
             //
             // "</div>" +

             "<!--- Buttons --->"+
             "<div class='btnHolder'>"+
             "<div class='multi'>" +
             "<div id='1x'>x1</div>" +
             "</div>" +
             "<div class='multi'>" +
             "<div id='2x'>x2</div>" +
             "</div>" +
             "<div class='multi'>" +
             "<div id='3x'>x3</div>" +
             "</div>" +
             "<div id='strike' class='img-button'>" +
              "<img class='thumbnail' src='images/strike.png'></>" +
             "</div>" +
             "</div>"+

           "</div>"),
  // Utility functions
  shuffle: function(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  jsonLoaded: function(data){
    console.clear()
    app.allData   = data
    app.questions = Object.keys(data)
    // app.shuffle(app.questions)
    app.makeQuestion(app.currentQ)
    $('body').append(app.board)
  },
  // Action functions
  makeQuestion: function(qNum){
    $('#strikes').html("");
    $('#questionNumber').html(qNum);
    var qText  = app.questions[qNum]
    var qAnswr = app.allData[qText]

    var qNum = qAnswr.length
        qNum = (qNum<8)? 8: qNum;
        qNum = (qNum % 2 != 0) ? qNum+1: qNum;

    var boardScore = app.board.find("#boardScore")
    var question   = app.board.find(".question")
    var col1       = app.board.find(".col1")
    var col2       = app.board.find(".col2")

    boardScore.html(0)
    question.html(qText.replace(/&x22;/gi,'"'))
    col1.empty()
    col2.empty()

    for (var i = 0; i < qNum; i++){
      var aLI
      if(qAnswr[i]){
        aLI = $("<div class='cardHolder'>"+
                  "<div class='card'>"+
                    "<div class='front'>"+
                      "<span class='DBG'>"+(i+1)+"</span>"+
                    "</div>"+
                    "<div class='back DBG'>"+
                      "<span>"+qAnswr[i][0]+"</span>"+
                      "<b class='LBG'>"+qAnswr[i][1]+"</b>"+
                    "</div>"+
                  "</div>"+
                "</div>")
      } else {
        aLI = $("<div class='cardHolder empty'><div></div></div>")
      }
      var parentDiv = (i<(qNum/2))? col1: col2;
      $(aLI).appendTo(parentDiv)
    }

    var cardHolders = app.board.find('.cardHolder')
    var cards       = app.board.find('.card')
    var backs       = app.board.find('.back')
    var cardSides   = app.board.find('.card>div')

    TweenLite.set(cardHolders , {perspective:800});
    TweenLite.set(cards       , {transformStyle:"preserve-3d"});
    TweenLite.set(backs       , {rotationX:180});
    TweenLite.set(cardSides   , {backfaceVisibility:"hidden"});

    cards.data("flipped", false)

    function showCard(){
      var card = $('.card', this)
      var flipped = $(card).data("flipped")
      var cardRotate = (flipped)?0:-180;
      var audio = $('#clang').get(0).play();
      TweenLite.to(card, 1, {rotationX:cardRotate, ease:Back.easeOut})
      flipped = !flipped
      $(card).data("flipped", flipped)
      app.getBoardScore()
    }
    cardHolders.on('click',showCard)
  },
  getBoardScore: function(){
    var cards = app.board.find('.card')
    var boardScore = app.board.find('#boardScore')
    var currentScore = {var: boardScore.html()}
    var score = 0
    function tallyScore(){
      if($(this).data("flipped")){
         var value = $(this).find("b").html()
         score += (parseInt(value) * app.multiplyer)
      }
    }
    $.each(cards, tallyScore)
    TweenMax.to(currentScore, 1, {
      var: score,
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
  },
  countStrike: function(){
    var num_strikes = $('#strikeCount').val();
    $('#strikes').css("display", "inline-block");
    var audio = $('#buzz').get(0).play();
    var strike_img = $("<img class=strikes src=../images/strike.png/>")
    if(num_strikes == 0){
      $('#strikes').append(strike_img);
      $('#strikeCount').val(1);
    }
    else if (num_strikes == 1) {
      $('#strikes').append(strike_img);
      $('#strikeCount').val(2);
    }
    else if (num_strikes == 2){
      $('#strikes').append(strike_img);
      $('#strikeCount').val(3);
    }
    else if (num_strikes == 3){
      $('#strikes').html(strike_img);
      $('#strikeCount').val(0);
    }
    return;
  },
  hideStrike: function(){
    console.log("Ended")
    $('#strikes').hide();
  },
  awardPoints: function(num){
    var audio = $('#dings').get(0).play();
    var num          = $(this).attr("data-team")
    var boardScore   = app.board.find('#boardScore')
    var currentScore = {var: parseInt(boardScore.html())}
    var team         = app.board.find("#team"+num)
    var teamScore    = {var: parseInt(team.html())}
    var teamScoreUpdated = (teamScore.var + currentScore.var)
    TweenMax.to(teamScore, 1, {
      var: teamScoreUpdated,
      onUpdate: function () {
        team.html(Math.round(teamScore.var));
      },
      ease: Power3.easeOut,
    });

    TweenMax.to(currentScore, 1, {
      var: 0,
      onUpdate: function () {
        boardScore.html(Math.round(currentScore.var));
      },
      ease: Power3.easeOut,
    });
  },
  changeQuestion: function(){
    app.currentQ++
    app.makeQuestion(app.currentQ)
  },
  prevQuestion: function(){
    if(app.currentQ >0)
    {
      app.currentQ--
      app.makeQuestion(app.currentQ)
    }
  },
  toggleQuestion: function(){
    var ques = $('#questionName')
    if(!ques.get(0).hidden){
      ques.css("visibility", "hidden")
      ques.get(0).hidden = true
    }
    else{
      ques.css("visibility", "inherit")
      ques.get(0).hidden = false
    }
  },
  setSingle: function(){
    $('#multiplyerWrapper').css("display","none")
    app.multiplyer = 1;
  },
  setDouble: function(){
    $('#multiplyerWrapper').css("display","inline-block")
    $('#multiplyer').html("Double");
    app.multiplyer = 2;
  },
  setTriple: function(){
    $('#multiplyerWrapper').css("display","inline-block")
    $('#multiplyer').html("Triple");
    app.multiplyer = 3;
  },
  // Inital function
  init: function(){
    // $.getJSON(app.jsonFile, app.jsonLoaded)
    app.jsonLoaded(data);
    app.board.find('#newQuestion' ).on('click', app.changeQuestion)
    $('#prevQuestion'  ).on('click', app.prevQuestion)
    $('#nextQuestion'  ).on('click', app.changeQuestion)
    $('#questionHolder').on('click', app.toggleQuestion)
    $('#awardTeam1'  ).on('click', app.awardPoints)
    $('#awardTeam2'  ).on('click', app.awardPoints)
    $('#strike'  ).on('click', app.countStrike)
    $('#buzz'  ).on('ended', app.hideStrike)
    $('#1x'  ).on('click', app.setSingle)
    $('#2x'  ).on('click', app.setDouble)
    $('#3x'  ).on('click', app.setTriple)
  }
}
app.init()
//http://www.qwizx.com/gssfx/usa/ff.htm
