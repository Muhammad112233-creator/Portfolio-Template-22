/*
 * YOUR CONTENT STARTS HERE.
 * This is a fictional, editable demo. No projects, metrics, roles or quotes
 * in this file should be presented as your own professional track record.
 * Replace them before publishing a personal portfolio.
 */
export const profile = {
  name: 'Mira Sol',
  displayName: 'Mira (Miri)',
  brand: 'MIRI',
  role: 'Independent product designer',
  email: 'hello@example.com',
  intro: 'I make thoughtful product and digital experiences with research, code, interaction design, and a healthy dose of curiosity.',
  hours: 24680,
  startYear: '2016',
  endYear: '2026',
  startCity: 'Lisbon',
  city: 'Copenhagen',
  cv: 'mira-sol-demo-cv.pdf',
  portrait: 'images/portrait.webp',
  profilePortrait: 'images/profile.webp',
  socialLinks: [
    { label: 'Email Mira', icon: 'mail', href: 'mailto:hello@example.com' },
    { label: 'Explore the work wall', icon: 'book', action: 'community' },
    { label: 'Explore experiments', icon: 'globe', action: 'ai' },
    { label: 'Start a conversation', icon: 'calendar', href: 'mailto:hello@example.com?subject=Let%E2%80%99s%20make%20something%20thoughtful' },
  ],
  bio: [
    'Mira Sol is an independent product designer who cares about the small things that make digital products feel natural. She works between research, interaction design and front-end craft, helping untangle unfamiliar problems before making anything look finished. Her favourite question is not “what can we add?” but “what can we make easier?”',
    'Her practice moves between complex tools and everyday experiences: climate dashboards, healthcare decisions, neighbourhood services and the occasional delightfully impractical experiment. She is comfortable with a messy whiteboard, a carefully constructed component, and the conversation that changes the brief. The work is precise, but the process leaves room for surprise.',
    'Away from the screen, she collects old design books, draws city façades, and writes about the relationship between people and their tools. This is a fictional, editable portfolio demo. The concept work below is here to show how your own stories can live in this template.',
  ],
};

export const skills = [
  ['Product Strategy', 93], ['User Research & Insights', 91],
  ['Human–AI Interaction', 95], ['End-to-End Product Design', 96],
  ['UX & Interface Design', 98], ['Information Architecture', 90],
  ['Creative Development', 89], ['Design Systems & Scalable UI', 97],
  ['Data-Informed Design', 94], ['Rapid Prototyping', 96],
  ['Interaction & Motion', 92], ['Conversion & Onboarding', 88],
  ['Cross-Functional Collaboration', 95], ['Accessibility & Inclusion', 94],
  ['Visual Storytelling', 93],
];
export const tools = ['Figma', 'Claude Code', 'Cursor', 'Google AI Studio', 'Adobe CC', 'GitHub', 'Analytics', 'Framer'];

const projectSeeds = [
  {
    slug: 'kindred-cover', title: 'Kindred Cover', category: 'Insurance & Healthcare', accent: '#86ca43',
    subtitle: 'A little clarity at a complicated moment.',
    brief: 'A self-initiated concept for choosing health cover without the jargon. We explored a calm, step-by-step conversation that makes trade-offs visible and keeps the person, not the plan, at the centre.',
    goal: 'Help a first-time customer understand cover, compare only relevant plans, and leave with a decision they can explain in their own words.',
    challenge: 'People did not need another comparison table. They needed to understand why one option might fit their life better than another.',
    outcome: 'A guided, accessible prototype with plain-language explanations, transparent plan costs and a clear hand-off to a human adviser.',
    metrics: [['72%', 'Example reduction in steps across the concept’s two comparison journeys.'], ['24', 'Fictional interview profiles in the editable research dataset.'], ['3', 'Distinct rounds of prototype revisions, from tables to guided choices.']],
    insights: ['A familiar question beats an unfamiliar term.', 'Comparison needs context, not more columns.', 'A person should always be able to ask a person.', 'Show what is excluded as clearly as what is included.'],
    iterations: ['A QUESTION, NOT A COMPARISON TABLE', 'MAKING THE TRADE-OFFS VISIBLE', 'THE RIGHT AMOUNT OF HUMAN HELP', 'ONBOARDING AT A HUMAN PACE', 'A CLEAR DECISION, WITH ROOM TO CHANGE IT'],
    notes: ['The first sketches started with the questions people ask a friend. We grouped cover by life situation instead of policy language.', 'A conversational sequence replaced the dense table. Each answer changed the next question; the interface always explained why.', 'Plain-language labels, generous type and obvious focus states were designed into the prototype, not added at the end.', 'The assistant suggests a next step, never an unqualified recommendation. A visible “Talk to a person” option keeps the user in control.'],
  },
  {
    slug: 'tempo', title: 'Tempo', category: 'Health & Wellness', accent: '#b9df72',
    subtitle: 'A routine that makes room for real life.',
    brief: 'An independent wellbeing concept built around consistency, not streaks. Tempo offers gentle movement and recovery plans that respond to the week you are actually having.',
    goal: 'Make a useful daily check-in possible in under a minute.',
    challenge: 'Most habit tools made a missed day feel like a failure. The concept needed to support returning, rather than maintaining a perfect record.',
    outcome: 'A flexible daily plan, an honest progress view and a forgiving re-entry flow.',
    metrics: [['1 min', 'Target length of the daily check-in.'], ['4', 'Different energy levels informing the plan.'], ['0', 'Punitive streak counters in the final concept.']],
    insights: ['Progress is not a straight line.', 'A short plan is still a plan.', 'Rest deserves its own visual language.', 'The return is more important than the streak.'],
    iterations: ['A CHECK-IN THAT DOES NOT ASK TOO MUCH', 'MOVEMENT FOR THE DAY YOU HAVE', 'RECOVERY IS PROGRESS', 'AN HONEST WEEKLY VIEW', 'WELCOME BACK, NOT START AGAIN'],
    notes: ['Diary-study scenarios helped distinguish motivation from capacity.', 'The daily screen was reduced to one question and three useful actions.', 'The recovery colour is as confident as the activity colour.', 'Suggested plans are editable, with no pressure to accept automated advice.'],
  },
  { slug: 'current', title: 'Current', category: 'Climate & Energy', accent: '#dfc661', subtitle: 'See where the energy goes.', brief: 'A household energy concept that turns a noisy stream of readings into useful, timely decisions. Current makes usage tangible without turning the home into a spreadsheet.', goal: 'Reveal the most useful household energy action at a glance.', challenge: 'High-resolution data is not the same as useful information.', outcome: 'A clear daily rhythm, contextual comparisons and actionable appliance insights.', metrics: [['24h', 'One coherent daily usage view.'], ['5', 'Household scenarios in the prototype.'], ['2', 'Levels of detail instead of twelve charts.']], insights: ['Show patterns before totals.', 'Put the home before the kilowatt.', 'An estimate should look like an estimate.', 'Explain the action, not just the alert.'] },
  { slug: 'panel-studio', title: 'Panel Studio', category: 'AI / Entertainment', accent: '#bfa8ed', subtitle: 'Make a story, not a prompt.', brief: 'A playful storyboard concept that lets writers arrange scenes, maintain character continuity and use generative tools without losing authorship.', goal: 'Keep the writer in control of every frame.', challenge: 'Prompt boxes are a poor replacement for an actual creative workflow.', outcome: 'An editable canvas with reusable characters, scene history and explicit creative choices.', metrics: [['6', 'Frames in the first working storyboard.'], ['3', 'Ways to revise without starting over.'], ['100%', 'Editable text and composition.']], insights: ['Continuity matters more than novelty.', 'Keep originals within reach.', 'A suggestion is not a decision.', 'Make creative intent visible.'] },
  { slug: 'fieldhouse', title: 'Fieldhouse', category: 'Sports & Events', accent: '#ef845d', subtitle: 'More time on the field.', brief: 'An event-planning concept for local sports clubs. Schedules, availability and directions live together, so organisers spend less time managing a group chat.', goal: 'Make the next practice easy to find and easy to attend.', challenge: 'Every team had a different version of the same schedule.', outcome: 'A shared event source with clear updates and lightweight RSVPs.', metrics: [['1', 'Shared schedule, not five group threads.'], ['2 taps', 'Target path to confirm attendance.'], ['4', 'Team sizes tested as concept scenarios.']], insights: ['Updates need a clear history.', 'Availability is not a yes/no question.', 'Maps belong next to the time.', 'Parents and players need different views.'] },
  { slug: 'good-work', title: 'Good Work', category: 'Employment', accent: '#b6cada', subtitle: 'Work that fits a life.', brief: 'A hiring concept that starts with a person’s working preferences, not a keyword-filled CV. It gives applicants and smaller teams a more useful first conversation.', goal: 'Surface a meaningful match before asking for an application.', challenge: 'Job descriptions often hide the realities people need to know.', outcome: 'Transparent role cards and a preferences-first discovery journey.', metrics: [['8', 'Practical preferences on each role.'], ['3', 'Clear employment types.'], ['0', 'Hidden salary ranges in the concept.']], insights: ['Flexibility needs a definition.', 'A range is better than “competitive”.', 'Let applicants ask before they apply.', 'A profile should not be homework.'] },
  { slug: 'orbit', title: 'Orbit', category: 'Wearable Tech', accent: '#aba2df', subtitle: 'Less looking. More living.', brief: 'A watch-interface exploration for simple daily signals: time, weather, movement and the next place to be. A glance should stay a glance.', goal: 'Make each interaction useful in under five seconds.', challenge: 'Phone-sized information does not belong on a wrist.', outcome: 'Four focused watch faces with restrained movement and tactile hierarchy.', metrics: [['5 sec', 'Interaction-time design target.'], ['4', 'Glanceable interface modes.'], ['1', 'Action per notification.']], insights: ['Typography does most of the work.', 'Context can replace a menu.', 'Motion needs a reason.', 'Hands are not always available.'] },
  { slug: 'small-hours', title: 'Small Hours', category: 'Digital Agency', accent: '#dd9fbc', subtitle: 'A studio with a point of view.', brief: 'A brand and website concept for a small independent creative practice. Editorial spacing and quiet interactions make room for the work.', goal: 'Give a small studio a memorable, honest introduction.', challenge: 'The work needed to feel distinctive without competing with itself.', outcome: 'A flexible identity, an editorial site and a reusable project system.', metrics: [['12', 'Reusable editorial modules.'], ['3', 'Typeface roles in the system.'], ['2', 'Breakpoints with deliberate art direction.']], insights: ['Confidence can be quiet.', 'Not every image needs a frame.', 'Use motion to make relationships clear.', 'Let the work finish the sentence.'] },
  { slug: 'neighbourhood', title: 'Neighbourhood', category: 'Community / Tech', accent: '#94b5a0', subtitle: 'Good things, closer to home.', brief: 'A community discovery concept that makes local workshops, shared resources and small events easy to find without a social-media feed.', goal: 'Help someone find one relevant thing nearby.', challenge: 'Useful local information was fragmented across closed groups.', outcome: 'A calm map, useful filters and direct contact with organisers.', metrics: [['15 min', 'Walking-distance default.'], ['6', 'Types of community activity.'], ['0', 'Engagement-ranked feeds.']], insights: ['Small is often more relevant.', 'Time and distance come first.', 'Trust grows from a named organiser.', 'A map is a starting point, not the whole experience.'] },
  { slug: 'maison-rue', title: 'Maison Rue', category: 'Hospitality', accent: '#c2a18a', subtitle: 'A place worth slowing down for.', brief: 'An editorial hospitality concept for a neighbourhood guesthouse. The booking journey feels as considered as the stay, with honest room details and a sense of place.', goal: 'Help guests know what their stay will actually feel like.', challenge: 'A beautiful photograph could not answer every practical question.', outcome: 'An atmospheric site with straightforward room comparison and booking.', metrics: [['3', 'Room types with full details.'], ['4 steps', 'Target booking journey.'], ['1', 'Consistent pricing summary.']], insights: ['Atmosphere and clarity can coexist.', 'Show the view from the room.', 'Accessibility details are essential.', 'The neighbourhood is part of the stay.'] },
  { slug: 'mira-card', title: 'Mira Card', category: 'Product Design', accent: '#c8c9df', subtitle: 'An introduction you can keep.', brief: 'A small exploration of the physical and digital business card. One thoughtful object opens a lightweight, accessible introduction, with no app required.', goal: 'Make exchanging contact details feel personal again.', challenge: 'Novelty should not create friction for the person receiving the card.', outcome: 'An NFC-ready card and a compact web profile.', metrics: [['1 tap', 'To open a profile.'], ['0', 'Apps required.'], ['2', 'Physical finishes explored.']], insights: ['Provide a non-NFC alternative.', 'The object should age well.', 'Make the contact easy to save.', 'A small surface rewards restraint.'] },
  { slug: 'type-garden', title: 'Type Garden', category: 'Education', accent: '#e6a9b4', subtitle: 'A living guide to letterforms.', brief: 'An interactive typography-learning concept built around the relationships between families, forms and historical movements. A garden is more inviting than a glossary.', goal: 'Make typographic differences visible and memorable.', challenge: 'Classification alone did not help learners see what changed.', outcome: 'A navigable type family tree with side-by-side specimens.', metrics: [['18', 'Illustrative type specimens.'], ['5', 'Historical families.'], ['2', 'Comparison modes.']], insights: ['Teach by showing.', 'History needs a human context.', 'A specimen should be editable.', 'Let beginners choose their own path.'] },
  { slug: 'mark-library', title: 'Mark Library', category: 'Brand & Identity', accent: '#c9d5a6', subtitle: 'Small marks. Lasting impressions.', brief: 'A collection of independent identity studies, from geometric wordmarks to expressive small symbols. Each study begins in black and white.', goal: 'Find the simplest recognisable expression of an idea.', challenge: 'A mark needs to work at sixteen pixels as well as on a wall.', outcome: 'A flexible library of symbols, proportions and responsive lock-ups.', metrics: [['9', 'Original identity studies.'], ['16px', 'Small-size design test.'], ['2', 'Core colour states.']], insights: ['Silhouette comes first.', 'A system outlasts a logo.', 'Test the boring applications.', 'Give the negative space a job.'] },
  { slug: 'daylight-apps', title: 'Daylight Apps', category: 'SaaS / Tech', accent: '#abc4df', subtitle: 'A workspace with breathing room.', brief: 'A modular workspace concept for independent teams. Projects, conversations and practical decisions live together without adding another layer of management.', goal: 'Keep the next useful action easy to see.', challenge: 'Collaboration tools were generating more coordination than clarity.', outcome: 'A simple shared workspace with contextual updates and focused views.', metrics: [['4', 'Focused workspace views.'], ['6', 'Reusable data patterns.'], ['1', 'Clear home for each decision.']], insights: ['Not every update is a notification.', 'Context beats chronology.', 'A default should be useful immediately.', 'Make ownership visible.'] },
  { slug: 'open-studio', title: 'Open Studio', category: 'Diverse Domains', accent: '#f1f493', subtitle: 'An open notebook of small ideas.', brief: 'A collection of interactive interface sketches exploring maps, playful data, adaptive components and everyday motion. Small experiments keep the larger work curious.', goal: 'Keep making, testing and asking better questions.', challenge: 'A polished screenshot cannot tell you how an interaction feels.', outcome: 'A growing collection of working, original interface experiments.', metrics: [['51', 'Original visual experiments.'], ['4', 'Exploration categories.'], ['∞', 'Room for the next idea.']], insights: ['Make the idea tangible early.', 'Build to learn, not just to impress.', 'Small tests can change big decisions.', 'Keep a record of the failures.'] },
];

export const projects = projectSeeds.map((project, index) => ({
  id: index, demo: true, role: 'Product & interaction designer', type: 'Independent concept · Web & app',
  toolkit: 'Figma, React & creative prototyping',
  images: [0, 1, 2].map(n => `projects/${project.slug}-${n}.svg`),
  iterations: ['THE FIRST USEFUL QUESTION', 'A MORE FOCUSED EXPERIENCE', 'SMALL CHANGES, BETTER DECISIONS', 'A CLEARER START', 'DETAILS THAT BUILD CONFIDENCE'],
  notes: [
    `We began with the everyday situation behind ${project.title}, mapping the decisions rather than the screens. The concept’s central question: ${project.goal.toLowerCase()}`,
    `${project.challenge} Early alternatives were compared as working flows rather than isolated mock-ups.`,
    `The interface uses consistent spacing, readable type and a deliberately small set of components. ${project.outcome}`,
    'The automated parts explain their assumptions. Every suggestion can be reviewed, changed or ignored; the user always has a clear next step.',
  ],
  ...project,
}));

export const locations = [
  { city: 'Copenhagen', lat: 55.6761, lng: 12.5683, color: '#70a7ff', roles: ['Independent design studio', 'Product & interaction design · Demo'] },
  { city: 'Lisbon', lat: 38.7223, lng: -9.1393, color: '#e8f59a', roles: ['The beginning of the practice', 'Visual & digital design · Demo'] },
  { city: 'Oslo', lat: 59.9139, lng: 10.7522, color: '#b1d4ff', roles: ['Collaborative concept projects', 'Community & climate · Demo'] },
  { city: 'Amsterdam', lat: 52.3676, lng: 4.9041, color: '#fa99bc', roles: ['Remote studio collaborations', 'Research & prototyping · Demo'] },
];

export const studioNotes = [
  { quote: '“The best interface is not always the one with fewer things. It is the one that asks less of the person using it.”', name: 'From Mira’s notebook · 01' },
  { quote: '“Give the difficult question a little room. The first answer is rarely the most useful one.”', name: 'From Mira’s notebook · 02' },
  { quote: '“A product should feel considered, not decorated. Make the useful thing a beautiful thing.”', name: 'From Mira’s notebook · 03' },
];
export const books = [
  { title: 'Small Decisions', subtitle: 'Notes on everyday interfaces', color: '#88c7ee', ink: '#122c4e' },
  { title: 'Make Space', subtitle: 'A field guide to less', color: '#f4da6a', ink: '#26251c' },
  { title: 'Unreasonable Clarity', subtitle: 'People before patterns', color: '#152f35', ink: '#faf8ef' },
  { title: 'Ways of Seeing Systems', subtitle: 'Connections worth noticing', color: '#e5adbd', ink: '#502e48' },
  { title: 'The Useful Detail', subtitle: 'Craft, care and a little curiosity', color: '#e5e7db', ink: '#1b322b' },
];
export const articles = [
  { title: 'Why a helpful interface sometimes needs to slow down', image: 'projects/kindred-cover-1.svg', body: ['Speed is an easy thing to measure. Understanding is not. That can make a fast interface look successful even when the person using it is still unsure what just happened.', 'In a complicated decision, a useful pause can be a feature: a cost explained in plain language, a consequence shown before confirmation, a chance to ask someone else. The interface is not dragging its feet. It is giving the person time to catch up.', 'A good question for a prototype review: where would a little more time create a little more confidence?'] },
  { title: 'A small case for making your first prototype less impressive', image: 'projects/panel-studio-2.svg', body: ['A beautiful prototype can become a surprisingly difficult object to question. Everyone is looking at the finish, while the assumptions underneath remain untouched.', 'The first version should make the central idea easy to test. A few rough screens and an honest question often tell you more than an elaborate transition.', 'Polish belongs in the work. It simply does not need to arrive before understanding.'] },
  { title: 'Designing for the day someone comes back', image: 'projects/tempo-0.svg', body: ['Most habit products have an excellent first day. They know how to introduce themselves, celebrate progress and show what happens next. The twelfth day, after a missed week, is often less considered.', 'A returning person does not need a lecture from a streak counter. They need an easy way to resume, a plan that fits now, and permission to change the original ambition.', 'The return flow is not an edge case. It is the real product, meeting real life.'] },
];

const experimentNames = [
  'Nordic creative week · spatial map', 'A small digital twin of the waterfront', 'Signals, not noise · live analytics', 'An interface that follows your lead',
  'A little room for unexpected motion', 'Daylight · a shared workspace', 'The useful overview', 'A modular way to manage a project', 'Connected work, in one place',
  'An elastic little button', 'The numbers behind a good week', 'Soft edges, deliberate movement', 'Moving between useful states', 'A calmer document assistant',
  'A neighbourhood property lens', 'Pocket Ledger · a financial workspace', 'A playground for helpful prompts', 'An accessible care dashboard', 'A clearer month of bookkeeping',
  'Copenhagen, connected', 'Watching a small idea grow', 'A dashboard that tells a story', 'A shelf for your favourite tools', 'One satisfying completion',
  'A ticker with a little personality', 'An object you can turn over', 'Sunday Soft · a brand in motion', 'Type that takes its time', 'A study in layers and light',
  'A component companion', 'A more thoughtful fleet overview', 'Making health signals visible', 'An event with fewer moving parts', 'The everyday object, reconsidered',
  'A quick, quiet micro-interaction', 'A desktop with breathing room', 'Archive Room · a manuscript workspace', 'A small component generator', 'Still Life · an editorial shop',
  'From information to insight', 'All the states a button can be', 'Tools that get out of the way', 'One considered component at a time', 'A financial overview without the fog',
  'An interaction worth exploring', 'A living component library', 'The next useful sales question', 'A clear view of system health', 'Understanding a small audience',
  'A palette that knows its purpose', 'A menu you can browse at your own pace',
];
export const experimentCategories = ['All', 'Design system', 'Dashboards', 'Animation/3D', 'SaaS'];
export const experiments = experimentNames.map((title, index) => {
  const category = index < 2 || index % 4 === 0 ? 'Animation/3D' : index % 4 === 1 ? 'Design system' : index % 4 === 2 ? 'Dashboards' : 'SaaS';
  return { id: index, title, category, kind: index < 2 ? 'map' : category === 'Animation/3D' ? ['orbit', 'type', 'elastic'][index % 3] : category === 'Design system' ? 'components' : 'dashboard', color: ['#acbacb', '#d6dfa8', '#b8b0d2', '#d9bcb0', '#a4cbc2'][index % 5], description: category === 'Animation/3D' ? 'An original motion study in spatial relationships, gentle feedback and purposeful movement.' : category === 'Design system' ? 'A working exploration of reusable patterns, accessible states and the small details that make a system feel coherent.' : 'An original interface concept exploring useful hierarchy, clear information and a more focused everyday workflow.' };
});

export const roadmap = [
  { phase: 'Foundations', rows: [
    ['Introduction', ['Product design', 'People & context'], ['Design thinking', 'The product team']],
    ['Defining success', ['Goal setting', 'Product vision'], ['Value proposition', 'Success metrics']],
  ] },
  { phase: 'Understand', rows: [
    ['Problem framing', ['Stakeholder interviews', 'Existing evidence'], ['Assumptions', 'Research questions']],
    ['Discovery research', ['Interviews', 'Observation', 'Diary studies'], ['Surveys', 'Competitor review']],
    ['Synthesis', ['Affinity mapping', 'Themes & tensions'], ['Jobs to be done', 'Journey maps']],
  ] },
  { phase: 'Explore', rows: [
    ['Define the opportunity', ['Problem statements', 'Design principles'], ['Prioritisation', 'Opportunity mapping']],
    ['Generate alternatives', ['Sketching', 'Co-design'], ['Storyboarding', 'Concept critique']],
    ['Shape the structure', ['Information architecture', 'Content strategy'], ['User flows', 'Navigation models']],
  ] },
  { phase: 'Make', rows: [
    ['Prototype', ['Wireframes', 'Interaction models'], ['Rapid prototypes', 'Realistic content']],
    ['Visual & interaction design', ['Typography', 'Colour & contrast'], ['Motion', 'Responsive layouts']],
    ['Build the system', ['Tokens', 'Components'], ['Accessibility', 'Documentation']],
  ] },
  { phase: 'Validate', rows: [
    ['Test with people', ['Usability sessions', 'Task success'], ['Behavioural insights', 'Inclusive testing']],
    ['Refine the experience', ['Prioritise findings', 'Iterate & retest'], ['Edge cases', 'Content checks']],
  ] },
  { phase: 'Ship & learn', rows: [
    ['Bring it to life', ['Developer collaboration', 'Design QA'], ['Launch plan', 'Instrumentation']],
    ['Keep learning', ['Measure outcomes', 'Listen to support'], ['Continuous discovery', 'The next useful question']],
  ] },
];
export const roadmapDefinitions = {
  'Introduction': ['What product design covers, and where it meets the rest of the team.', 'Map who owns research, interface design and delivery before starting.'],
  'Defining success': ['Agree what a better outcome looks like before drawing screens.', 'Choose task completion rather than time spent as your primary measure.'],
  'Interviews': ['Talk to people about what they actually do, not what they wish they did.', 'Ask someone to walk through their most recent experience.'],
  'Typography': ['Use letterforms, scale and spacing to give content an understandable hierarchy.', 'Try the longest heading and the smallest label before finalising a type scale.'],
  'Accessibility': ['Make the product usable across abilities, input methods and contexts.', 'Complete the primary journey with a keyboard and a screen reader.'],
  'Prototype': ['Build the smallest working version that can answer the next question.', 'Test whether people understand a choice before polishing its animation.'],
};
