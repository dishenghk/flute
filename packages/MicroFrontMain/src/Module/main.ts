export const MainModule = {
    render: () => {
        window.ReactDOM.render(
            window.React.createElement('div', null, 'Hello Micro Front For React'),
            document.getElementById('root')
        );
    },
    destory: () => {
        window.ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }
};
