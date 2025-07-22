import { ErrorBoundary } from "react-error-boundary"

function CustomErrorBoundaryUI({error,resetErrorBoundary}){
    return(
        <div role="alert" className="alert alert-error">
            
            <p>Something went wrong:</p>
            <div>{error?.message}</div>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default function CustomErrorBoundary({children}){
    return(
        <ErrorBoundary
            FallbackComponent={CustomErrorBoundaryUI}
            onReset={() => window.location.reload()}
        >
            {children}
        </ErrorBoundary>
    )
}