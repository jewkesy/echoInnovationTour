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
                "Touch Tasty is our sixty-five inch multi-touch screen that showcases our software. ",
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
                    "alias": ["c n e o", "c. n. e. o.", "sierra leone"],
                    "desc": "A mobile phone application designed for conference attendees. ",
                    "speak": "<say-as interpret-as='spell-out'>cneo</say-as>"
                },
                {
                    "name": "South Staffs Water",
                    "alias": ["south staffs water", "self start water", "self staffs water", "yourself stats water", "south start water",  "yourself does water", "south dakota"],
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

// this.emit(':tell', speechOutput);
// this.emit(':ask', speechOutput, repromptSpeech);
// this.emit(':askWithCard', speechOutput, repromptSpeech, cardTitle, cardContent, imageObj);
// this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
// this.emit(':tellWithLinkAccountCard', speechOutput);
// this.emit(':askWithLinkAccountCard', speechOutput);
// this.emit(':responseReady'); // Called after the response is built but before it is returned to the Alexa service. Calls :saveState. Can be overridden.
// this.emit(':saveState', false); // Handles saving the contents of this.attributes and the current handler state to DynamoDB and then sends the previously built response to the Alexa service. Override if you wish to use a different persistence provider. The second attribute is optional and can be set to 'true' to force saving.
// this.emit(':saveStateError'); // Called if there is an error while saving state. Override to handle any errors yourself.

    'LaunchRequest': function () {
        this.emit('Welcome');
    },
    'HelloIntent': function () {
        this.emit(':tell', 'Hello, welcome to the Innovation Suite.');
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
        const speechOutput = this.t('GET_HELLO_MESSAGE') + this.t('INTRO') + tour;
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
        this.emit(':ask', demos + reprompt, reprompt); 
    },
    'DemoIntent': function () {
        var phrase = this.event.request.intent.slots.Demo.value.toLowerCase();
        var info = 'Hmmmmm, could not find a demo called ' + phrase;
        for (var i = 0; i < this.t('DEMOS').length; i++) {
           if (this.t('DEMOS')[i].alias.indexOf(phrase) > -1) {
                info =  "<p>" + this.t('DEMOS')[i].desc + "</p>";
                break;
           }
        }
        var reprompt = "Which demo would you like to learn about?";
        this.emit(':ask', info + reprompt, reprompt); 
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