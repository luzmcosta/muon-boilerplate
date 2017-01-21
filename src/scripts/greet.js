/**
 * Displays a greeting to the user.
 */

import $ from 'jquery';

const greet = {
  greetings: {
    english: 'Hello',
    french: 'Bonjour',
    spanish: 'Hola',
  },

  /**
   * Constructs the greeting.
   *
   * @param {string} language The greeting's language
   * @param {string} name To whom the greeting should be addressed.
   * @return {string} message
   */
  make(language, name) {
    return `${this.greetings[language.toLowerCase()]}, ${name}!`;
  },

  /**
   * Renders greeting in the given language.
   *
   * @param {string} language The greeting's language
   * @param {string} name To whom the greeting should be addressed.
   * @return {string} message
   */
  do(language, name) {
    // Construct the greeting.
    const message = this.make(language, name);

    // Display greeting to user in browser.
    $('main').append(message);

    // Display message to user in console.
    console.info(message);

    return message;
  },
};

export default greet;
