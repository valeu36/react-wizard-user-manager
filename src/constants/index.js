export const ROUTES = Object.freeze({
  home: '/',
  users: '/users',
  newUser: '/users/new',
  user: (id) => {
    const route = '/users/:id';
    return id ? route.replace(':id', id) : route;
  },
  editUser: (id) => {
    const route = '/users/:id/edit';
    return id ? route.replace(':id', id) : route;
  },
});

export const ICONS = Object.freeze({
  eye: 'eye',
  eyeSlash: 'eye-slash',
  user: 'user',
  add: 'add',
  userFriends: 'user-friends',
  minus: 'minus',
  pen: 'pen',
  times: 'times',
  chevronLeft: 'chevron-left',
});

export const GENDER_INPUT_VALUES = Object.freeze(['Male', 'Female']);

export const MEGABYTE = 1024 * 1024;

export const LANGUAGES_LIST = Object.freeze({
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  ar: 'Arabic',
  cmn: 'Mandarin',
  ru: 'Russian',
  pt: 'Portuguese',
  de: 'German',
  ja: 'Japanese',
  hi: 'Hindi',
  ms: 'Malay',
  fa: 'Persian',
  sw: 'Swahili',
  ta: 'Tamil',
  it: 'Italian',
  nl: 'Dutch',
  bn: 'Bengali',
  tr: 'Turkish',
  vi: 'Vietnamese',
  pl: 'Polish',
  jv: 'Javanese',
  pa: 'Punjabi',
  th: 'Thai',
  ko: 'Korean',
});

export const SKILLS = Object.freeze([
  'HTML',
  'CSS',
  'Javascript',
  'React',
  'Angular',
  'jQuery',
  'NodeJS',
  'Python',
  'PHP',
  'Ruby On Rails',
  'SQL',
  'BackboneJS',
  'Web Design',
  'Project management',
  'Git',
  'Docker',
  'AWS Lambda',
  'Firebase',
]);

export const HOBBIES = Object.freeze([
  'Music',
  'Art',
  'Traveling',
  'Procrastinating',
  'Sport',
  'Driving',
  'Singing',
]);
