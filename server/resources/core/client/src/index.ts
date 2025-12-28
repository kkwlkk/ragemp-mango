import '@abraham/reflection';
import { createAppBuilder } from '@ragemp-mango/client';
import { RootModule } from './root.module';
import { MAIN_WEBVIEW } from '@shared/constants';

const appBuilder = await createAppBuilder();
const app = await appBuilder.addWebView(MAIN_WEBVIEW, { url: 'http://localhost:5173', visible: true }).build();
mp.gui.cursor.show(true, true);
await app.start(RootModule);
 