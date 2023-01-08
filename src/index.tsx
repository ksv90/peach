import { createRoot } from 'react-dom/client';
import { App } from '@peach/components';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
