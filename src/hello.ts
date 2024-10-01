


/**
 * Returns a random "hello" greeting in different languages.
 * The function selects a greeting from a predefined list of languages
 * and returns the corresponding "hello" in that language.
 *
 * @returns {string} - A greeting in a randomly selected language.
 */
export const getRandomHello = () => {
    const greetings: { [key: string]: string } = {
        English: "Hello",
        Spanish: "Hola",
        French: "Bonjour",
        German: "Hallo",
        Italian: "Ciao",
        Chinese: "Nǐ hǎo",
        Japanese: "Konnichiwa",
        Russian: "Zdravstvuyte",
        Arabic: "Marhaban",
        Hindi: "Namaste",
        Portuguese: "Olá",
        Turkish: "Merhaba",
        Greek: "Yia sas",
        Dutch: "Hallo",
        Swahili: "Habari",
        Swedish: "Hej",
        Thai: "Sawasdee",
        Hebrew: "Shalom",
        Filipino: "Kamusta",
    };

    const languages = Object.keys(greetings);
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

     // Return the greeting corresponding to the selected random language.
    return greetings[randomLanguage];
}