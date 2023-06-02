# Kaun Banega Gyanpati

My first typescript and styled component project 😄. All source code written in typescript, including styles. 


## TypeScript analogy

```ts
class Kaun_Banega_Gyanpati
    extends React.Component
    implements Kaun_Banega_Crorepati
{
    constructor() {
        fetch(precess.env.API_URL).then((result) => {
            this.questions = result;
        });
    }

    increaseGyan = () => {
        this.gyan++;
    };

    checkAnswer = () => {
        if (this.answerChosen === "correct") {
            incraseGyan();
            return true;
        } else {
            return false;
        }
    };

    render() {
        return <Kaun_Banega_Gyanpati_UI />;
    }
}
```

## Made using

- TypeScript
- Styled Components
- React

## Features

- Downloading score into a jpg/png file. (dom-to-image)
- Strict type checking provided by TypeScript making the app almost bug-free
- Howler.js to play sounds
- Report page for suggestions and reports. (Formspree)
- All styled also written in TypeScript using styled components.

## License

MIT
