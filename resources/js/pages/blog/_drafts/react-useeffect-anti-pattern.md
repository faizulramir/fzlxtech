# The Dark Side of useEffect: Why It Does More Harm Than Good

As a developer who has spent years building complex React applications, I've come to a controversial conclusion: **`useEffect` is often the wrong tool for the job**. While it's arguably React's most powerful hook, it's also the source of countless bugs, performance issues, and unmaintainable code.

## The Promise vs Reality

React's documentation presents `useEffect` as a way to "perform side effects in function components." Sounds simple, right? But in practice, it becomes a dumping ground for everything from API calls to event listeners to DOM manipulation—often without proper cleanup or dependency management.

## What useEffect Gets Wrong

### 1. The Dependency Hell

```javascript
useEffect(() => {
  fetchData(userId, filter, sort, page, search);
}, [userId, filter, sort, page, search]);
```

Every time you add a new dependency, you risk:
- **Infinite loops** if the dependency changes inside the effect
- **Stale closures** if you forget a dependency
- **Over-fetching** when dependencies change frequently

The ESLint plugin tries to help, but it doesn't understand *why* dependencies change. It just screams at you to add everything in scope.

### 2. It Masks Architectural Problems

When you reach for `useEffect` to "sync state," you're usually dealing with a symptom of poor component design:

```javascript
// BAD: Using useEffect to derive state
const [count, setCount] = useState(0);
const [isEven, setIsEven] = useState(false);

useEffect(() => {
  setIsEven(count % 2 === 0);
}, [count]);

// GOOD: Compute it directly
const isEven = count % 2 === 0;
```

Why store derived state when you can compute it on render? `useEffect` encourages this anti-pattern.

### 3. Race Conditions Galore

Async operations in `useEffect` are notorious for race conditions:

```javascript
useEffect(() => {
  let isMounted = true;
  
  fetchData(id).then(data => {
    if (isMounted) {
      setData(data); // 💥 Might set state on unmounted component
    }
  });

  return () => {
    isMounted = false; // Manual cleanup needed!
  };
}, [id]);
```

Forget the cleanup? Your component will crash. This should be handled by the data fetching library, not manual boolean flags.

### 4. It's Impossible to Test

Testing components with complex `useEffect` logic means:
- Mocking fetch calls
- Waiting for async operations
- Cleaning up timers/subscriptions
- Dealing with unpredictable timing

Contrast this with pure functions that just return UI based on props—trivial to test.

### 5. The "Every Second" Problem

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchStatus();
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

Polling? In 2026? We have WebSockets, Server-Sent Events, and React Query's background refetching. Yet I see this pattern everywhere.

### 6. It Eats Your CPU

Unnecessary re-renders caused by `useEffect` running too often can kill performance:

```javascript
// This runs on EVERY render!
useEffect(() => {
  console.log('Component rendered');
});
```

Add heavy computations inside and watch your FPS drop.

### 7. It Breaks the Mental Model

React's core promise: **UI = f(state)**. But `useEffect` introduces side effects that happen *outside* this函数, making reasoning about your app harder. Newcomers struggle to understand *when* effects run and *why*.

## When *Should* You Use useEffect?

Before you reach for `useEffect`, ask:

1. **Is this a side effect that belongs in UI?** (DOM manipulation, subscriptions)
2. **Can this be an event handler?** (User clicks = imperative, not effect)
3. **Can I lift state up instead?** (Shared state in parent)
4. **Can I compute this during render?** (Derived state)
5. **Is there a React Query / SWR / custom hook?** (Data fetching)

Good uses of `useEffect`:
- Adding/removing event listeners
- Subscribing to WebSockets
- Manually controlling focus (rare)
- Integrating with non-React libraries

## The Better Alternatives

### Data Fetching? Use React Query or SWR
```javascript
// No useEffect needed!
const { data } = useQuery(['posts'], fetchPosts);
```

### Form State? Use React Hook Form
```javascript
const { register, handleSubmit } = useForm();
```

### Global State? Use Context, Zustand, or Redux
```javascript
const user = useContext(UserContext);
```

### Computations? Compute During Render
```javascript
const fullName = `${firstName} ${lastName}`; // No effect!
```

## My Personal Rule

> **If you find yourself writing `useEffect` more than once per component, you're probably doing it wrong.**

Most components shouldn't need effects at all. UI should be a pure function of state/props. Side effects belong in dedicated hooks or libraries built for that purpose.

## Conclusion

`useEffect` is a powerful escape hatch, not a primary tool. It's the `goto` of React—useful in rare cases but dangerous as a default. The best React codebases minimize effects, not maximize them.

The next time you reach for `useEffect`, pause. Ask: "Can I solve this without it?" More often than not, the answer is yes.

---

*What's your experience with useEffect? Have you fallen into these traps? Share your thoughts below!*
