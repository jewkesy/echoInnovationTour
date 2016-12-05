'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "GREETINGS": [
                "Welcome to the Innovation Suite",
                "Hello, pleased to see you"
            ],
            "SKILL_NAME" : "Welcome options",
            "GET_GREET_MESSAGE" : " ",
            "HELP_MESSAGE" : "You can say tell me about the room, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
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
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var greetArr = this.t('GREETINGS');
        var greetIndex = Math.floor(Math.random() * greetArr.length);
        var randomGreet = greetArr[greetIndex];

        // Create speech output
        var speechOutput = this.t("GET_GREET_MESSAGE") + randomGreet;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomGreet)
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