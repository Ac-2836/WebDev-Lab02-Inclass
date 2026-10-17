import { createElement } from './mini-react.js';
import { fetchFeed } from './fetch-feed.js';
import { useState } from './reactive-engine.js';

let latestRequestId = 0;

function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Unable to load the feed. Please try again.';
}

function SkeletonLoader() {
  return (
    <div className="feed-skeleton" aria-label="Loading feed">
      <span className="skeleton-line" aria-hidden="true"></span>
      <span className="skeleton-line" aria-hidden="true"></span>
      <span className="skeleton-line" aria-hidden="true"></span>
    </div>
  );
}

export function DataFeed() {
  const [state, setState] = useState({ status: 'IDLE' });

  const loadData = async () => {
    const requestId = latestRequestId + 1;
    latestRequestId = requestId;
    setState({ status: 'LOADING' });

    try {
      const data = await fetchFeed();

      if (requestId === latestRequestId) {
        setState({ status: 'SUCCESS', data });
      }
    } catch (error) {
      if (requestId === latestRequestId) {
        setState({
          status: 'ERROR',
          error: getErrorMessage(error),
        });
      }
    }
  };

  if (state.status === 'IDLE') {
    return (
      <section className="data-feed" aria-labelledby="feed-title">
        <header>
          <h2 id="feed-title">Lab Feed</h2>
        </header>
        <button type="button" onClick={loadData}>
          Load feed
        </button>
      </section>
    );
  }

  if (state.status === 'LOADING') {
    return (
      <section
        className="data-feed"
        aria-labelledby="feed-title"
        aria-busy="true"
      >
        <header>
          <h2 id="feed-title">Lab Feed</h2>
        </header>
        {SkeletonLoader()}
        <button type="button" onClick={loadData}>
          Load latest feed
        </button>
      </section>
    );
  }

  if (state.status === 'ERROR') {
    return (
      <section className="data-feed" aria-labelledby="feed-title">
        <header>
          <h2 id="feed-title">Lab Feed</h2>
        </header>
        <p role="alert">{state.error}</p>
        <button type="button" onClick={loadData}>
          Retry Connection
        </button>
      </section>
    );
  }

  return (
    <section className="data-feed" aria-labelledby="feed-title">
      <header>
        <h2 id="feed-title">Lab Feed</h2>
        <button type="button" onClick={loadData}>
          Refresh feed
        </button>
      </header>
      <ul>
        {state.data.map((item) => (
          <li>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
