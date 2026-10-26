# Quickstart & Verification Guide: Community-Driven Store Layout Shopping List with Stock Android UI

## Prerequisites

- Node.js 18+ and `npm`
- Modern web browser (Chrome, Edge, Firefox, Safari)

## Local Setup

```bash
# 1. Install project dependencies
npm install

# 2. Run unit & integration test suite
npm test

# 3. Launch local development server
npm run dev
```

---

## Runnable Validation Scenarios

### Scenario 1: End-to-End Tesco Shopping Trip Sequence Simulation

Prove that picking items at **Tesco Szentpéteri kapu, Miskolc** in real time updates the store layout graph and reorders future shopping lists.

#### Step 1: Create a Shopping List
1. Open application in browser (`http://localhost:5173`).
2. Click the Floating Action Button (**Add Item**) or Create New List and enter `Weekly Tesco Trip`.
3. Add items:
   - Nectarines (`Produce`)
   - Organic rice drink (`Plant milks`)
   - Whole wheat crescent roll (`Bakery`)
   - Pick winter salami (`Cold cuts`)
   - Bulgur (`Flour & Pantry`)
   - Rat poison (`Household paper & Rodent control`)
   - Toothpaste (`Personal hygiene`)

#### Step 2: Select Store Location
1. Select store location dropdown or modal sheet $\rightarrow$ Search **Tesco Szentpéteri kapu, Miskolc**.
2. Click **Apply Store Layout**.

#### Step 3: Execute Interactive Shopping Mode
1. Click **Start Shopping** or switch to the Shopping Mode navigation tab.
2. Observe the Stock Android linear progress indicator and tactile checklist checkboxes.
3. Tap items as collected in sequential shelf order:
   1. `Got the nectarines`
   2. `Got the organic rice drink`
   3. `Got the whole wheat crescent roll`
   4. `Got the cheese` / `Pick winter salami`
   5. `Got the bulgur`
   6. `Got the rat poison`
   7. `Got the toothpaste`
4. Click **Finish Shopping**.

#### Expected Outcome
- App saves the sequence log locally and registers relative section transitions.
- Creating a new list with the same items for **Tesco Szentpéteri kapu** automatically orders them matching the exact physical progression of the store.

---

### Scenario 2: Stock Android UI & Theming Verification

Prove that the interface renders with authentic Stock Android (Material Design 3) elements.

1. Launch app at `http://localhost:5173`.
2. Verify the Top App Bar and the Bottom Navigation Bar with pill indicators (`Shopping List`, `Shopping Mode`, `Store Map`).
3. Verify that the Floating Action Button (FAB) adheres to Material 3 geometry and floating elevation.
4. Toggle theme (Light / Dark mode):
   - In light mode, surface containers use high-contrast light tonal palettes.
   - In dark mode, surface containers adapt to deep tonal grey/blue surfaces with WCAG AA compliant text.
5. Inspect touch targets: all buttons and checkboxes measure at least 48x48px equivalent touch area.

---

### Scenario 3: Offline Shopping Reliability Test

Prove that shopping mode operates without internet connectivity.

1. Open application and select store location.
2. Open Browser Developer Tools $\rightarrow$ Network tab $\rightarrow$ Set to **Offline**.
3. Perform item collection in interactive shopping mode.
4. Click **Finish Shopping**.

#### Expected Outcome
- All pick timestamps and collected states are recorded without error or UI blocking.
- Sequence log is saved to local storage and queued for background sync once online mode is restored.
