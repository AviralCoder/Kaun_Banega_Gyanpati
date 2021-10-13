const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const convertEncodingToText = (text: string) => {
    const editedText: string = text.replaceAll("&quot;", '"');
    const editedText2: string = editedText.replaceAll("&rsquo;", "'");
    const editedText3: string = editedText2.replaceAll("&#039;", "'");
    const editedText4: string = editedText3.replaceAll("&eacute;", "é");
    const editedText5: string = editedText4.replaceAll("&amp;", "&");

    return editedText5;
};

const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export { randomNumber, convertEncodingToText, shuffleArray };
