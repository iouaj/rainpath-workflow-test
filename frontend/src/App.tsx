import './App.css';
import { PromptProvider } from './context/PromptContext';

import WorkFlow from './WorkFlow';

function App() {
  return (
    <main className="app">
      <PromptProvider>
        <WorkFlow />
      </PromptProvider>
    </main>
  );
}

export default App;
