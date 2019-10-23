import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
export default {
    input: './src/Module/index.ts',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs(),
        typescript()
    ],
    output: {
        name: 'microfrontmain',
        file: './dist/module.js',
        format: 'umd'
    }
};
