import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('System Failure Detected:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
          <div className="max-w-md border border-white/10 p-12 bg-black/40 backdrop-blur-3xl rounded-sm">
            <h1 className="text-white font-serif text-3xl mb-4 tracking-tight">System Encountered an Error</h1>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed font-mono uppercase tracking-widest">
              The industrial core has stopped responding. <br/>
              Critical failure logged for audit.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-[#C9A961] text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(201,169,97,0.2)]"
            >
              Restart Module
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;