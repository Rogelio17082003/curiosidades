/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'. SE INTEGRAN LAS 
const i18n = require('i18next');//idiomas 
const sprintf = require('i18next-sprintf-postprocessor'); //idiomas

//ESTO ES LO DE LENGUAJES
const languageStrings = {
en: {
    translation: {
        WELCOME_MESSAGE: 'Hi Eduardo! thanks for using formula 1 trivia, to start you can say: mention: tell me a fun fact about racing... or if you want to stop me just say, Cancel! ...so how can I help you?',
        GET_FRASES_MSG:'EUU: A curious fact is...',
        HELLO_MESSAGE: 'hello word Eduardo',
        HELP_MESSAGE: 'You can say hello to me! How can I help eduardo?',
        GOODBYE_MESSAGE: 'Goodbye eduardo!',
        REFLECTOR_MESSAGE: 'You just triggered %s',
        FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
        ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
        GET_MESSAGE2: 'you can ask for another fun fact... mention: explain to me an important fact about car racing... or if you want to stop me just say, Cancel! ... How can I help you?',
        FRASES_DATA: [
            '[1]** Formula 1, also known as F1, is the highest class of single-seater auto racing worldwide. **',
            '[2]** Among the most well-known teams are Mercedes, Ferrari, Red Bull Racing, and McLaren. **',
            '[3]** Some famous drivers are Lewis Hamilton, Michael Schumacher, Ayrton Senna, and Sebastian Vettel. **',
            '[4]** The season takes place on circuits such as Monaco, Silverstone, Monza, and Spa-Francorchamps. **',
            '[5]** Formula 1 has strict regulations that include technical specifications and conduct rules. **',
            '[6]** The races are highly popular events that attract millions of spectators. **',
            '[7]** The first race was held in 1950 at Silverstone, United Kingdom. **',
            '[8]** The world championship is held annually, awarding titles to the best driver and team of the season. **'
        ]
    }
},
es: {
    translation: {
        WELCOME_MESSAGE: '¡Hola Eduardo! gracias por usar curiosidades de formula 1, para comenzar puedes decir: menciona: dime un dato curioso sobre carreras ... o si deseas detenerme solo di, ¡Cancela! ... entonces ¿cómo te puedo ayudar?',
        GET_FRASES_MSG:'MX: Un dato curioso es ...',
        HELLO_MESSAGE: 'hola mundo Eduardo',
        HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar eduardo?',
        GOODBYE_MESSAGE: 'Adiós eduardo!',
        REFLECTOR_MESSAGE: 'Acabas de activar %s',
        FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
        ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
        GET_MESSAGE2: 'puedes pedir otro dato curioso ... menciona: explicame un dato importante sobre las carreras de autos ... o si deseas detenerme solo di, ¡Cancela! ... ¿cómo te puedo ayudar?',
        FRASES_DATA: [
            '[1]** La Fórmula 1, también conocida como F1, es la máxima categoría del automovilismo a nivel mundial. **',
            '[2]** Entre los equipos más conocidos están Mercedes, Ferrari, Red Bull Racing y McLaren. **',
            '[3]** Algunos pilotos famosos son Lewis Hamilton, Michael Schumacher, Ayrton Senna y Sebastian Vettel. **',
            '[4]** La temporada se disputa en circuitos como Mónaco, Silverstone, Monza y Spa-Francorchamps. **',
            '[5]** La Fórmula 1 tiene un reglamento estricto que incluye especificaciones técnicas y normas de comportamiento. **',
            '[6]** Las carreras son eventos muy populares que atraen a millones de espectadores. **',
            '[7]** La primera carrera se celebró en 1950 en Silverstone, Reino Unido. **',
            '[8]** El campeonato mundial se celebra anualmente, otorgando títulos al mejor piloto y equipo de la temporada. **'
        ]
    }
}
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const frasesArray = requestAttributes.t('FRASES_DATA');
        
        const frasesIndice = Math.floor(Math.random() * frasesArray.length);
        const randomFrase = frasesArray[frasesIndice];
        const speakOutput = `${requestAttributes.t('GET_FRASES_MSG')} ${randomFrase} ... ${requestAttributes.t('GET_MESSAGE2')}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//PRIMERA FUNCION AGREGADA
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

//SEGUNDA FUNCION AGREGADA
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

//TERCERA FUNCION AGREGADA
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();