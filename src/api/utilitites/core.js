import apiProvider from './provider';

export class ApiCore {
    constructor(options) {
        console.log(options);
        if (options.exists) {
            this.onWordExists = (word) => {
                return apiProvider.onWordExists(word);
            }
        }

        if (options.random) {
            this.onRandomWord = () => {
                return apiProvider.onRandomWord();
            }
        }
    }
}