'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "WELCOMES": [
                "welcome to the Innovation Suite. ",
                "pleased to meet you. "
            ],
            "INTRO": "Let me introduce a few of the demonstraters that we have within the room. ",
            "TOUR": [
                "Touch Tasty is our sixty-five inch, multi-touch screen that showcases our software. ",
                "The three-screen display represents our data visualisation capability. Running against the Conduce framework, we can provide a wide variety of data visuals focused around geographical information. ",
                "Big Tasty is our room feature. With four four K screens providing our presentation material. ",
                "If you look above you, you can see our Lie Fi installation. ",
                "The <say-as interpret-as='spell-out'>ar</say-as> room is where you'll find our venture in Augmented Reality. ",
                "Across the back of the room you can get hands-on with a range of our products, for example: - Jaguar Land Rover Reporting Solution and Data Quality Scorecard. "
            ],
            "DEMOS": [
                {
                    "name": "Jaguar Land Rover",
                    "alias": [ "jaguar landrover", "jaguar love", "jlr", "j l r", "jaguar land rover", "taylor", "j alarm", "jello", "jennifer", "china"],
                    "desc": "The Jaguar Land Rover Reporting Solution tracks the training progress of over six thousand employees using a Red Amber and Green dashboard. ",
                    "speak": "<say-as interpret-as='spell-out'>jlr</say-as>"
                },
                {
                    "name": "CAPA",
                    "alias": ["cup", "cap", "capa", "cappa", "cat fact", "camper"],
                    "desc": "This is a real-time dashboard monitoring solution. "

                },
                {
                    "name": "CNEO",
                    "alias": ["c n e o"],
                    "desc": "A mobile phone application designed for conference attendees. ",
                    "speak": "<say-as interpret-as='spell-out'>cneo</say-as>"
                },
                {
                    "name": "South Staffs Water",
                    "alias": ["south staffs water"],
                    "desc": "Geographical-based data analysis tool. "
                },
                {
                    "name": "Li-Fi",
                    "alias": ["lie fi", "lifi", "life five", "life i", "life fi"],
                    "desc": "Lie Fi enabled ceiling lights provide secure network access to devices sitting underneath the lamps. ",
                    "speak": "Lie Fi"
                },
                {
                    "name": "Augmented Reality",
                    "alias": ["augmented reality", "virtual reality"],
                    "desc": "Augmented Reality using smart glasses allows field engineers access to technical documents, training videos and faster workflow decisions"
                }

            ],
            "SKILL_NAME": "Innovation Suite Tour",
            "GET_HELLO_MESSAGE": "Hello: ",
            "HELP_MESSAGE": "You can say what demos are available today, tell me about Jaguar Land Rover or take a tour. What can I help you with?",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Ok! If you need me, just ask!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('Welcome');
    },
    'WelcomeIntent': function () {
        this.emit('Welcome');
    },
    'Welcome': function () {

        // Use this.t() to get corresponding language data
        const welArr = this.t('WELCOMES');
        const idx = Math.floor(Math.random() * welArr.length);
        const randomWel = welArr[idx];

        var tour = "";
        for (var i = 0; i < this.t('TOUR').length; i++) {
            tour +=  "<p>" + this.t('TOUR')[i] + "</p>";
        }

        // Create speech output
        const speechOutput = this.t('GET_HELLO_MESSAGE') + randomWel +  this.t('INTRO') + tour;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomWel);

    },
    'GetRoomDescIntent': function () {

    },
    'GetListOfDemosIntent': function () {

        var demos = "We have the following demos available: ";
        for (var i = 0; i < this.t('DEMOS').length; i++) {
            if (this.t('DEMOS')[i].speak) {
                demos += this.t('DEMOS')[i].speak + ', ';
            } else {
                demos += this.t('DEMOS')[i].name + ', ';
            }
        }

        var reprompt = "Which demo would you like to learn about?";
        this.emit(':askWithCard', demos + reprompt, this.t('SKILL_NAME'), reprompt); 
    },
    'DemoIntent': function () {
        // if(this.event.request.intent.slots.Language.value && this.event.request.intent.slots.Language.value.toLowerCase() == "java") {
           // console.log( this.event.request.intent.slots.Demo.value);
        var phrase = this.event.request.intent.slots.Demo.value.toLowerCase();
        var info = 'Hmmmmm, could not find a demo called ' + phrase;
        for (var i = 0; i < this.t('DEMOS').length; i++) {
           if (this.t('DEMOS')[i].alias.indexOf(phrase) > -1) {
                info =  "<p>" + this.t('DEMOS')[i].desc + "</p>";
                break;
           }
        }
        var reprompt = "Which demo would you like to learn about?";
        this.emit(':askWithCard', info + reprompt, this.t('SKILL_NAME'), reprompt); 
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};