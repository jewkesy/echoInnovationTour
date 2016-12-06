'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "WELCOMES": [
                "welcome to the Innovation Suite",
                "pleased to meet you"
            ],
            "SKILL_NAME": "Innovation Suite Tour",
            "GET_HELLO_MESSAGE": "Hello: ",
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
        // const factArr = this.t('FACTS');
        // const factIndex = Math.floor(Math.random() * factArr.length);
        // const randomFact = factArr[factIndex];

        // // Create speech output
        // const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        // this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);

        const factArr = this.t('WELCOMES');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_HELLO_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);

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