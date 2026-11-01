import logASet from "../images/musclequest/log-a-set.jpg";
import adaptiveProgression from "../images/musclequest/adaptive-progression.jpg";
import exerciseProgress from "../images/musclequest/exercise-progress.jpg";
import trainingWeek from "../images/musclequest/training-week.jpg";
import planEditor from "../images/musclequest/plan-editor.jpg";
import stats from "../images/musclequest/stats.jpg";
import measurements from "../images/musclequest/measurements.jpg";
import friends from "../images/musclequest/friends.jpg";

export interface CaseStudyExcerpt {
  file: string;
  problem: string;
  language: string;
  code: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface ArchitectureLayer {
  name: string;
  items: { name: string; role: string }[];
}

export interface ArchitectureGroup {
  label: string;
  layers: ArchitectureLayer[];
}

export interface CaseStudySection {
  id: string;
  heading: string;
  body: string[];
  diagram?: ArchitectureGroup[];
  excerpt?: CaseStudyExcerpt;
}

export interface CaseStudyScreenshot {
  src: string;
  alt: string;
}

export interface CaseStudy {
  title: string;
  tagline: string;
  summary: string[];
  stats: CaseStudyStat[];
  stack: string[];
  sections: CaseStudySection[];
  screenshots: CaseStudyScreenshot[];
  previewImage: string;
  links: {
    playStore: string;
    website: string;
  };
}

// Excerpts are copied text, not imports from the app repo, so a change in the app cannot break this site's build.
// Keep each one to 30 lines at most.
export const caseStudy: CaseStudy = {
  title: "MuscleQuest",
  tagline: "An offline-first workout tracker for Android, built with React Native and Expo.",
  summary: [
    "Plans, sets, history and measurements live in SQLite on the device, so the app works without a connection or an account.",
    "A sign-in is only needed for backups and the opt-in social layer: friends, shared plans and shared records.",
    "Available in English, German, Spanish and French.",
  ],
  stats: [
    { value: "90,000", label: "lines of TypeScript, without tests" },
    { value: "374", label: "test files" },
    { value: "1,000+", label: "exercises" },
    { value: "4", label: "languages" },
    { value: "2024", label: "development started" },
  ],
  stack: [
    "TypeScript",
    "React Native",
    "Expo",
    "Expo Router",
    "SQLite",
    "TanStack Query",
    "Zustand",
    "Supabase",
    "Cloudflare R2",
    "Lingui",
    "Jest",
    "Maestro",
    "EAS",
  ],
  sections: [
    {
      id: "why-i-built-it",
      heading: "Why I built it",
      body: [
        "I worked as a fitness coach and personal trainer and trained a lot myself. It annoyed me how many good apps showed ads or locked features I thought were essential behind a paywall. I also wasn't quite happy with any app I tried: there was always something I would have liked to be different, even if it was just a tiny detail, and I couldn't influence it at all.",
        "At the time I was also working as a web developer with React on the side. React Native seemed good enough for a production app, so I thought: why not branch out and get stuck in?",
        "I started using the app for my own workouts very early on, and that shaped everything after it. Between sets I added whatever I noticed to a Trello board: things that got in the way, and features I was missing or would have liked to have. Back at the desk I fixed those and built the next features, then took the result to the gym and tested it again.",
        "A little over two years later, MuscleQuest is a fully functional app that works very well and is more or less exactly what I always wanted. It has no ads, and every feature is free.",
      ],
    },
    {
      id: "overview",
      heading: "Overview",
      body: [
        "MuscleQuest is a workout tracker for people who train regularly and want the app to stay out of the way between sets. It has no ads, works without a connection and needs no account. Each set opens pre-filled from last time, so logging one usually takes a single tap, and a rest timer runs between sets.",
        "Training starts from one of ten premade plans or from the plan editor, which handles supersets, drop sets and warm-ups across a library of over 1,000 exercises with animated demonstrations. Adaptive progression then suggests the next step for each exercise from what the user actually lifted.",
        "Progress has its own space: one-rep max charts, personal records and top sets per exercise, a stats dashboard users arrange themselves, and body weight, body fat, measurements and custom metrics over time. Signing in adds cloud backups and an opt-in social layer, where friends can compare records and copy each other's plans.",
        "Most of the engineering follows from those promises. If the app must work in a gym with no signal, the device has to be the source of truth, schema upgrades have to be safe on phones I can never reach, and a workout has to survive the app being killed halfway through. The sections below cover the problems that turned out hardest.",
      ],
    },
    {
      id: "architecture",
      heading: "Architecture",
      body: [
        "The device is the source of truth. All training data lives in SQLite, and the app reads and writes it the same way with or without a connection. The cloud is an optional layer on top: it holds backups and whatever the user explicitly chooses to share, and nothing syncs back into the local database except an import the user asked for.",
        "TanStack Query handles every SQLite read and write, so screens stay in step through query invalidation rather than a global data store. Zustand holds the state that is not a query result, above all the workout in progress.",
      ],
      diagram: [
        {
          label: "On the device",
          layers: [
            {
              name: "Screens",
              items: [
                { name: "Expo Router", role: "File-based navigation" },
                { name: "React Native Paper", role: "UI components and theming" },
              ],
            },
            {
              name: "State",
              items: [
                { name: "TanStack Query", role: "SQLite reads and writes, one-shot cloud reads" },
                { name: "Zustand", role: "Workout in progress, plan drafts, social state" },
              ],
            },
            {
              name: "Storage",
              items: [
                { name: "appData.db", role: "Read-only exercise library, shipped with the app" },
                { name: "userData.db", role: "Plans, history, settings, measurements" },
                { name: "AsyncStorage", role: "Active session and queued sharing writes" },
              ],
            },
          ],
        },
        {
          label: "Optional, online",
          layers: [
            {
              name: "Cloud",
              items: [
                { name: "Supabase", role: "Sign-in, backups, friends and shared items" },
                { name: "Cloudflare R2", role: "Exercise animations" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "offline-first-sqlite",
      heading: "Offline-first SQLite with versioned migrations and backup restore",
      body: [
        "Two databases sit on the device: a read-only exercise library shipped with the app, and a user database holding everything the user owns. The user database has to open cleanly on every boot, including right after a backup from a much older version has been restored.",
        "Migrations are numbered and tracked by SQLite's own schema version. Each one runs in a transaction with its version bump, so a failure leaves the database exactly where it was and the next boot tries again. The app can never ask a user to repair a half-upgraded schema, so that guarantee has to come from the code.",
        "Restoring a backup is the riskiest moment in the app, because it replaces the only copy of the user's history. The download goes to a staging folder and is checked before anything is touched. The swap itself is journaled: a marker file is written before any file moves, so if the app is killed partway through, the next startup puts the originals back before any database opens. Opening first would create an empty database over the missing original.",
        "The originals are then kept until the restored database has booted successfully, so a backup that fails to start can still be undone from the recovery screen.",
      ],
      excerpt: {
        file: "utils/db/runMigrations.ts",
        problem:
          "Upgrading a database on a user's phone, where a half-applied schema change can never be fixed by hand.",
        language: "TypeScript",
        code: `export const runMigrations = async (
  db: SQLiteDatabase,
  migrations: readonly Migration[] = allMigrations,
): Promise<number> => {
  let current = await getSchemaVersion(db);
  for (const migration of migrations) {
    if (migration.version <= current) continue;
    Bugsnag.leaveBreadcrumb("Running migration", {
      version: migration.version,
      name: migration.name,
    });
    await db.withExclusiveTransactionAsync(async (txn) => {
      await migration.up(txn);
      await txn.execAsync(\`PRAGMA user_version = \${migration.version};\`);
    });
    current = migration.version;
  }
  return current;
};`,
      },
    },
    {
      id: "timezone-model",
      heading: "The timezone model",
      body: [
        "A workout has two different times: the instant it finished and the day it counts towards. A session on Monday evening in Auckland must stay on Monday after the user flies to London, or a streak breaks for no reason.",
        "So both are stored. The UTC instant drives durations, ordering and clock times, and a local day key drives streaks, the calendar, weekly goals and chart buckets. The day key is stored rather than derived, so later travel or a daylight saving change cannot move it.",
        "The instant has its own trap. SQLite's timestamps carry no offset, and a JavaScript date-time without one is read as local time, which silently shifts every value by the device's offset. All parsing goes through one function, and a lint rule rejects the direct version on those columns.",
      ],
      excerpt: {
        file: "utils/dates.ts",
        problem: "SQLite timestamps carry no offset, and the JS engine would read them as local time and shift them.",
        language: "TypeScript",
        code: `export function parseDbTimestamp(value: string): Date {
  if (typeof value !== "string") return new Date(NaN);
  const trimmed = value.trim();
  if (HAS_OFFSET.test(trimmed)) return new Date(trimmed);
  if (/^\\d{4}-\\d{2}-\\d{2}$/.test(trimmed)) return new Date(trimmed);
  return new Date(trimmed.replace(" ", "T") + "Z");
}`,
      },
    },
    {
      id: "set-navigation",
      heading: "Set and superset navigation",
      body: [
        "Completing a set looks like a small action, but nextSet() decides where the user goes next: the next set, the next member of a superset, the next round, or the first unfinished set of a later exercise. Users can jump around and redo sets freely, so it can never assume the workout is being done in order.",
        "That freedom is where the bugs live. If someone swiped ahead, completed a few sets and swiped back, the stored position for that later exercise could point at a set already done, so the app landed there with the Complete button disabled. Moving to another exercise now always works out its first unfinished set rather than trusting the stored one.",
        "Inside a superset, the same round moves straight on to the next member with no rest and no carry-over of values.",
        "The session is also saved to storage as it changes, so it survives the app being killed. A gym is a bad place to lose a workout: phones get locked, apps get evicted and batteries die. An end-to-end test kills the app mid-workout to prove it, and another installs a new build over a workout in progress.",
      ],
      excerpt: {
        file: "store/activeWorkoutStore.ts",
        problem: "Moving through a superset, where the next set belongs to a different exercise.",
        language: "TypeScript",
        code: `const members = getGroupMembers(
  workout.exercises,
  currentExerciseIndex,
);
if (members.length > 0) {
  const next = nextGroupPosition(
    workout.exercises,
    updatedCompletedSets,
    currentExerciseIndex,
    currentSetIndex,
  );

  if (next && next.setIndex === currentSetIndex) {
    return {
      currentExerciseIndex: next.exerciseIndex,
      currentSetIndices: {
        ...currentSetIndices,
        [next.exerciseIndex]: next.setIndex,
      },
      completedSets: updatedCompletedSets,
    };
  }`,
      },
    },
    {
      id: "adaptive-progression",
      heading: "Adaptive progression",
      body: [
        "After an exercise the app asks how hard it was and whether anything hurt, and later checks in on recovery. A rules engine combines those answers with the reps actually completed and suggests the next step: add weight, add a rep, hold or reduce. It is deterministic and has no machine learning, so every suggestion comes with a plain explanation of why.",
        "The rules are ordered by what matters most. Pain comes first and holds the load on the first report, reducing it only if pain comes back in a row. Discomfort never reduces load, failed sets get one warning before a reduction, and only then do performance and rep targets count.",
        "The details are in the numbers. Increments are configured per equipment type, so a suggestion is a weight the user can actually load. After 14 days away from a muscle, the app suggests easing back in by 10%, rising to 20% at four weeks. Assisted exercises invert everything, because the logged weight is the help the machine gives, so getting stronger means the number goes down.",
      ],
      excerpt: {
        file: "utils/progressionEngine.ts",
        problem: "Making a load easier when, on an assisted exercise, easier means a higher number.",
        language: "TypeScript",
        code: `export function computeReducedLoad(
  currentWeight: number,
  trackingType?: string,
): number {
  if (trackingType === "assisted") {
    const raised = Math.ceil((currentWeight * 1.05) / 0.5) * 0.5;
    return roundWeight(Math.max(raised, currentWeight + 0.5));
  }
  if (currentWeight <= 0) return 0;
  const reduced = currentWeight * 0.95;
  const rounded = Math.floor(reduced / 0.5) * 0.5;
  return roundWeight(Math.max(0, Math.min(rounded, currentWeight - 0.5)));
}`,
      },
    },
    {
      id: "sharing-queue",
      heading: "An offline queue for sharing",
      body: [
        "Sharing is an explicit publish model: the device pushes what the user chose to share, and nothing syncs back on its own. Since the app has to work offline, a change made without a connection still has to reach the server later, in the right order, and Supabase does not replay offline writes the way Firestore did.",
        "So background writes go through a persisted queue, one per account, flushed on sign-in, on returning to the foreground, on reconnecting and after each new entry. An entry only names what changed. The flush re-reads the local row, so a stale payload is never uploaded, and publishing a row that has since been deleted becomes an unpublish.",
        "Accounts make it harder. A flush only runs under the session of the account that queued it. Signing out or switching accounts drops queued publishes, but keeps unpublishes and revocations, because the user asked for that data to stop being visible and nothing else records it.",
      ],
      excerpt: {
        file: "utils/social/opsQueue.ts",
        problem: "Switching accounts without publishing stale data or forgetting a request to stop sharing.",
        language: "TypeScript",
        code: `export const dropSocialPublishes = async (uid: string): Promise<void> => {
  clearCounts.set(uid, (clearCounts.get(uid) ?? 0) + 1);
  await removePublishOps(uid);
};`,
      },
    },
    {
      id: "i18n",
      heading: "i18n with Lingui in four languages",
      body: [
        "The app follows the device language in English, German, Spanish and French, across around 1,900 strings, with a voice guide and terms table so all four read like one product. Hermes has no Intl.PluralRules, so plurals depend on a polyfill loaded before anything else.",
        "Stored data stays language neutral. Numbers keep a canonical format in the database and take the device's decimal separator only on screen, and library data such as muscle names is translated at display time. Weights are stored in kilograms and converted only at the edges of the UI.",
        "Language also reaches further than text. A European keyboard types 62,5, so every decimal field has to accept a comma as well as a point, and one German end-to-end suite runs onboarding and a quick workout on a German device.",
      ],
    },
    {
      id: "lint-rules",
      heading: "Turning mistakes into lint rules",
      body: [
        "A fix in one place does not stop the same mistake appearing somewhere else six months later. So when a bug comes from an easy-to-repeat pattern, the fix comes with an ESLint rule that rejects the pattern and points to the right helper.",
        "A hand-written number sanitiser that keeps digits and points drops the comma a European keyboard types, turning 62,5 into 625. Copies of the unit conversion factors drifted apart until they were banned outside one module. Parsing a stored date directly shifts it by the device's time zone. An unwrapped Supabase call can stall on a bad connection, so a custom rule requires the wrapper that adds the deadline.",
        "The rule below guards against a bug that came from the framework itself. After an SDK upgrade, typing 60 into an empty field on Android could save 0. React Native selected the text on the field's first layout, which for an empty field is the first keystroke, so the next digit replaced it.",
      ],
      excerpt: {
        file: "eslint.config.js",
        problem: "Stopping a framework quirk that silently saved the wrong weight from coming back.",
        language: "JavaScript",
        code: `const selectTextOnFocusRestriction = {
  selector:
    'JSXOpeningElement[name.name=/^(TextInput|BottomSheetTextInput)$/] > JSXAttribute[name.name="selectTextOnFocus"]',
  message:
    "Use AppTextInput from @/components/ui/AppTextInput (or DecimalInput) for selectTextOnFocus.",
};`,
      },
    },
    {
      id: "firebase-to-supabase",
      heading: "From Firebase to Supabase",
      body: [
        "Version 2.0 replaces Firebase with Supabase: sign-in, backups, friends and sharing all move in one release. The reason is what comes next. Coaching needs a single backend with one identity for app users and trainers, and the move is cheapest while the number of signed-in accounts is still small. Firestore's rules depend on Firebase Auth, so sign-in could not move alone without a token bridge that would have cost more than moving everything.",
        "Security moved from Firestore rules to row level security in Postgres, tested with pgTAP in CI. The publishable key ships in the app, so the rules have to hold on their own, and they cannot depend on the repository being private. Features that Firebase gave for free had to be rebuilt deliberately: live listeners became refetches on sign-in, on returning to the app, on pull to refresh and after a change, and Firestore's offline replay became the queue described above. A failed fetch resets only its own slice of state, and a passing outage keeps the cached copy.",
        "The hard part is moving real users without a cutover moment. People update at their own pace, and old builds keep writing to Firebase in the meantime, so the migration script is a mirror rather than a one-off copy. It can run again and again, and each run makes Supabase match Firebase for every user who has not signed in on 2.0 yet, including deletions. Once someone signs in with the same Google account they are cut over, and the script never touches their data again.",
        "Old builds also need a controlled ending. An over-the-air update adds a minimum supported version check to the store versions still in use, each published from that version's own code. When the minimum is raised, those builds show an update screen, and it waits until a workout in progress has been saved. Only after a final migration run does Firebase get switched off.",
        "One trap is worth remembering. Google registers each package name and signing key pair in one Cloud project only, so the OAuth clients have to stay in the old Firebase project. Deleting that project would break Google sign-in in every build, so the Firebase resources go and the empty project stays.",
        "The code is finished and the migration has been rehearsed against real Firebase data with no failures. Publishing the release and running the migration are the last steps.",
      ],
      excerpt: {
        file: "utils/supabase/call.ts",
        problem: "A one-shot request can stall on a bad connection, and it must always settle.",
        language: "TypeScript",
        code: `export const supabaseCall = async <T>(
  label: string,
  build: (signal: AbortSignal) => PromiseLike<T>,
  timeoutMs: number = DEFAULT_CALL_TIMEOUT_MS,
): Promise<T> => {
  const controller = new AbortController();
  try {
    return await withTimeout(build(controller.signal), timeoutMs, label);
  } catch (error) {
    if (error instanceof TimeoutError) controller.abort();
    throw error;
  }
};`,
      },
    },
    {
      id: "testing",
      heading: "Testing",
      body: [
        "Jest covers the stores, the data layer and the hooks across 374 test files, with coverage floors per directory that only move up. Because so much of the app depends on which day something happened, CI runs the suite again under Auckland, Kathmandu, London and Los Angeles.",
        "Database policies have their own pgTAP tests against a local Supabase stack, so access rules are checked rather than assumed, and CI fails if the generated database types drift from the migrations.",
        "Maestro flows drive a release build on an Android emulator before a release. They cover what unit tests cannot see: a rest that ends with the app in the background and must still notify, a quick workout that survives the app being killed, and a workout left in progress on an old build that resumes after a new one is installed over it.",
      ],
    },
    {
      id: "whats-next",
      heading: "What's next",
      body: [
        "Next is coaching, which brings the project back to where it started: my work as a trainer. A trainer gets a web app to invite clients, build and assign plans from the same exercise library, review what clients actually did and correct it where needed. A client enters an invite code in the app, agrees to what will be shared and from then on trains on plans marked as coming from their trainer.",
        "The offline promise stays. Sessions are recorded on the phone, as they are today, and go to the trainer through a queue that survives restarts and syncs when a connection is back, after a workout is saved or on demand. Every table is separated per organisation, with access rules tested in CI, so a trainer never sees another organisation's clients.",
        "Nothing changes for someone training alone. Every existing feature stays, and a solo user's training data never leaves the phone except for backups and what they choose to share with friends. Coaching also brings the first iOS release, so clients with iPhones can be coached too.",
      ],
    },
  ],
  screenshots: [
    { src: logASet, alt: "Active workout screen with weight and reps fields, a Complete Set button and a rest timer" },
    { src: adaptiveProgression, alt: "Workout overview with suggested weights and reps from adaptive progression" },
    { src: exerciseProgress, alt: "Exercise progress screen with all-time PR and a one-rep max chart" },
    { src: trainingWeek, alt: "Home screen with this week's calendar, weekly goal and today's workouts" },
    { src: planEditor, alt: "Plan editor with a four-day split and a superset" },
    { src: stats, alt: "Stats dashboard with workouts per week, volume, total time and workout history" },
    { src: measurements, alt: "Measurement entry with body weight, body fat, waist and chest, above a history chart" },
    { src: friends, alt: "Friend profile with shared strength PRs, workouts and plans" },
  ],
  previewImage: trainingWeek,
  links: {
    playStore: "https://play.google.com/store/apps/details?id=com.isotronic.musclequest",
    website: "https://musclequest.app/",
  },
};
