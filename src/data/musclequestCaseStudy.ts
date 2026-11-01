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

export interface CaseStudySection {
  id: string;
  heading: string;
  body: string[];
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
      id: "overview",
      heading: "Overview",
      body: [
        "MuscleQuest started as a way to log workouts without ads, accounts or a spinner in the gym. It has grown into a full training app: a plan editor with supersets and drop sets, adaptive progression, a configurable stats dashboard and sharing between friends.",
      ],
    },
    {
      id: "offline-first-sqlite",
      heading: "Offline-first SQLite with versioned migrations and backup restore",
      body: [
        "Two databases sit on the device: a read-only exercise library shipped with the app, and a user database holding everything the user owns. The user database has to open cleanly on every boot, including right after a backup from a much older version has been restored.",
        "Migrations are numbered and tracked by SQLite's own schema version. Each one runs in a transaction with its version bump, so a failure leaves the database exactly where it was and the next boot tries again.",
      ],
      excerpt: {
        file: "utils/db/runMigrations.ts",
        problem:
          "Upgrading a database on a user's phone, where a half-applied schema change can never be fixed by hand.",
        language: "TypeScript",
        code: `// Brings userData.db up to the latest schema. Each pending migration runs in
// its own transaction together with the user_version bump, so a failure rolls
// both back and the next boot retries from the same version.
//
// A database newer than this bundle knows (an OTA rollback, or a restore that
// slipped past the backup check) is left as it is: there is no way down.
export const runMigrations = async (
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
      // PRAGMA takes no bound parameters; version is a number from our own
      // migration list.
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
        "So both are stored. The UTC instant drives durations, ordering and clock times, and a local day key drives streaks, the calendar, weekly goals and chart buckets.",
      ],
      excerpt: {
        file: "utils/dates.ts",
        problem: "SQLite timestamps carry no offset, and the JS engine would read them as local time and shift them.",
        language: "TypeScript",
        code: `export function parseDbTimestamp(value: string): Date {
  // The column is nullable and older rows can be empty; an invalid Date is what
  // callers already handle, so never throw here.
  if (typeof value !== "string") return new Date(NaN);
  const trimmed = value.trim();
  if (HAS_OFFSET.test(trimmed)) return new Date(trimmed);
  // A bare "YYYY-MM-DD" is already parsed as UTC midnight by spec; anything
  // longer is a date-time that needs the explicit Z.
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
        "Inside a superset, the same round moves straight on to the next member with no rest and no carry-over of values.",
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

  // Same round: on to the next member, no rest and no carry-over.
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
      id: "i18n",
      heading: "i18n with Lingui in four languages",
      body: [
        "The app follows the device language in English, German, Spanish and French, with a voice guide and terms table so all four read like one product. Hermes has no Intl.PluralRules, so plurals depend on a polyfill loaded before anything else.",
        "Stored data stays language neutral. Numbers keep a canonical format in the database and take the device's decimal separator only on screen, and library data such as muscle names is translated at display time.",
      ],
    },
    {
      id: "firebase-to-supabase",
      heading: "From Firebase to Supabase",
      body: ["This write-up follows once the move has shipped."],
    },
    {
      id: "testing",
      heading: "Testing",
      body: [
        "Jest covers the stores, the data layer and the hooks, with coverage floors per directory. Because so much of the app depends on which day something happened, CI runs the suite again under Auckland, Kathmandu, London and Los Angeles.",
        "Database policies have their own pgTAP tests against a local Supabase stack, and Maestro smoke flows drive a release build on an emulator on EAS before a release.",
      ],
    },
    {
      id: "whats-next",
      heading: "What's next",
      body: ["Coaching features, and an iOS release."],
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
