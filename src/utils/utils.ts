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

function shuffle(array: string[]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export { randomNumber, convertEncodingToText, shuffle };
