interface Window {
    React: any;
    ReactDOM: any;
    System: {
        import: (url: string) => Promise<any>;
    };
}
