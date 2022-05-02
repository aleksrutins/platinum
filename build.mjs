import * as esbuild from 'esbuild';
import watPlugin from 'esbuild-plugin-wat';

esbuild.build({
    entryPoints: ['src/index.ts'],
    outdir: 'lib',
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: 'esm',
    target: ['esnext'],
    plugins: [watPlugin({ bundle: true })]
}).catch(() => process.exit(1));