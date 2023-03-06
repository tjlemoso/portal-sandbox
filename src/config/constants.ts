export const BASE_NAME = '/reservationsystem';

export const LINK_HOME = `home`;
export const LINK_ABOUT = `${BASE_NAME}/about`;
// export const LINK_FACILITIES = `${BASE_NAME}/facilities`;
export const LINK_EVENTS_SPORTS = `${BASE_NAME}/events&sports`;
export const LINK_PLAN_TRIP = `${BASE_NAME}/plan`;
export const LINK_CONTACT = `${BASE_NAME}/contact`;
export const LINK_RENTAL = `rental`;
export const LINK_VIEWMAP = `map`;
export const LINK_FACILITIES = `facilities`;
export const LINK_RETALREQUEST = `rentalRequest`;

export const TAB_PARAMETER = 'tab';
export const TAB_HOME = 'home';
export const TAB_ABOUT = 'about';
export const TAB_FACILITIES = 'facilities';
export const TAB_EVENTS_SPORTS = 'events&sports';
export const TAB_PLAN_TRIP = 'plan';
export const TAB_CONTACT = 'contact';

export const HEADERS_BUTTONS_CLEAR = [];

export const HEADERS_BUTTONS = [
  {
    tab: TAB_HOME,
    text: 'Home',
    label: 'home',
  },
  {
    tab: TAB_ABOUT,
    text: 'About',
    label: 'about',
  },
  {
    tab: TAB_FACILITIES,
    text: 'Facilities',
    label: 'facilities',
  },
  {
    tab: TAB_EVENTS_SPORTS,
    text: 'events&sports',
    label: 'home',
  },
  {
    tab: TAB_PLAN_TRIP,
    text: 'Plan Your Trip',
    label: 'plan',
  },
  {
    tab: TAB_CONTACT,
    text: 'Contact',
    label: 'contact',
  },
];

export const FILTERS_FACILITIES = [
  {
    label: 'FIELD SPORTS',
  },
  {
    label: 'DIAMOND SPORTS',
  },
  {
    label: 'COURT SPORTS',
  },
  {
    label: 'ATHLETE DEVELOPMENT',
  },
  {
    label: 'EVENTS CENTER',
  },
  {
    label: 'TRAILS(5K COURSE)',
  },
];

export const FACILITIES = [
  {
    label: 'F1',
    description: 'FIELD SPORTS',
    capacity: '10',
  },
  {
    label: 'F31',
    description: 'FIELD SPORTS',
    capacity: '11',
  },
  {
    label: 'F3',
    description: 'FIELD SPORTS',
    capacity: '12',
  },
  {
    label: 'D1',
    description: 'DIAMOND SPORTS',
    capacity: '13',
  },
  {
    label: 'D22',
    description: 'DIAMOND SPORTS',
    capacity: '14',
  },
  {
    label: 'D26',
    description: 'DIAMOND SPORTS',
    capacity: '15',
  },
];
