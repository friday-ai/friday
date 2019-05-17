import { Component, h } from 'preact';

export interface AppProps {
    title: string;
}

interface AppState {
    title: string;
}

export default class App extends Component<AppProps, AppState> {

    public render() {
        return (
            <div id="app">
                <span>Hello, i'm Friday. I'm stil in devellopement :)</span>
            </div>
        );
    }
}
