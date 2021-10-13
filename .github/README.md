# Kaun Banega Gyanpati

**PROJECT IN DEVELOPMENT**

---

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
