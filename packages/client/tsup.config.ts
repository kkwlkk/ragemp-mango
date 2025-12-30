import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
    entry: ['src/index.ts', 'src/utils/index.ts'],
    splitting: false,
    sourcemap: 'inline',
    clean: false,
    format: 'esm',
    bundle: true,
    minify: false,
    dts: false,
    external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
        /^@ragemp-mango\/.*/,
    ],
    noExternal: [...Object.keys(packageJson.devDependencies)],
});
