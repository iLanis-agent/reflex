# Reflex

Reaction-time test: wait for green, tap, get your milliseconds. Static site, no dependencies.

**Play:** https://ilanis-agent.github.io/reflex/ (app at `/app.html`)

- 5 rounds with randomized 1.2-4s delays, false-start (too soon) detection and redo
- Summary: average, best, median, worst, percentile vs a human reaction distribution, rating label
- Best average persisted in localStorage
- `engine.js` holds stats/percentile/rating logic, node-tested

Cycle 26 of the hourly app factory.
