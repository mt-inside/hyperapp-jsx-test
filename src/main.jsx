import { app } from 'hyperapp';
import h from 'hyperapp-jsx-pragma';

function calcNpersist(state, drinksFunc) {
    console.log("calc");

    /* == calc == */

    state = { ...state, drinks: drinksFunc(state.drinks) };
    state = { ...state, drunk: state.drinks.reduce((acc, n) => acc + n, 0)};

    state = { ...state, lastTimestamp: Date.now() };


    return state;
}

const Drank = (state, amount) => calcNpersist(state, (ds) => ds.concat(amount));
const DrankCustom = (state) => calcNpersist(state, (ds) => ds.concat(Number(document.getElementById('custom').value)));
const Undo = (state) => calcNpersist(state, (ds) => ds.slice(0, ds.length - 1));

function viewButton(name, amount) {
    return <div class="level-item has-text-centered">
        <div class="field has-addons">
            <p class="control">
                <button class="button" onClick={[Drank, amount]}>
                    {name} ({amount}ml)
                </button>
            </p>
        </div>
    </div>
}
function viewCustomButton() {
    return <div class="level-item has-text-centered">
        <div class="field has-addons">
            <p class="control">
                <input style={{width: "4em"}} class="input" type="text" id="custom" placeholder="ml"></input>
            </p>
            <p class="control">
                <button class="button" onClick={DrankCustom}>
                    Custom
                </button>
            </p>
        </div>
    </div>
}
function viewUndoButton() {
    return <div class="level-item has-text-centered">
        <div class="field has-addons">
            <p class="control">
                <button class="button" onClick={Undo}>
                    Undo
                </button>
            </p>
        </div>
    </div>
}
function viewFn(state) {
    console.log(state);
    return <main>
        <section class={`hero ${state.className}`}>
            <div class="hero-body">
                <h1 class="title has-text-centered">
                    {state.drunk} / {state.target}ml
                </h1>
            </div>
        </section>
        <section class="section">
            <nav class="level">
                {viewButton("Glass", 250)}
                {viewButton("Pint", 568)}
                {viewButton("Bottle", 700)}
                {viewCustomButton()}
                {viewUndoButton()}
            </nav>
        </section>
    </main>
}

const initialState = () => ({
  drinks: [],
  drunk: 0,
  target: 2000,
  lastTimestamp: Date.now(),
});

app({
  init: initialState(),
  view: viewFn,
  node: document.getElementById("app")
})
