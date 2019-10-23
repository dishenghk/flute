import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
    {
        input: './src/index.ts',
        plugins: [
            nodeResolve({
                jsnext: true,
                main: true
            }),
            commonjs(),
            typescript()
        ],
        watch: {
            include: 'src/**',
            exclude: 'node_modules/**'
        },
        output: {
            name: 'MicroFrontCore',
            file: './dist/index.js',
            format: 'umd'
        }
    },
    {
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
    }
];
