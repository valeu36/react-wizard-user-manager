import faker from 'faker';

import { HOBBIES, LANGUAGES_LIST, SKILLS } from '../constants';

const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

export const getListValues = (list) => Object.entries(list).map(([, value]) => value);

const getBase64 = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
  });

export const imagePathToBlob = (imgSrc) =>
  fetch(imgSrc).then((image) =>
    image.blob().then((img) => getBase64(img).then((base64) => base64)),
  );

export const getAvatar = () =>
  new Promise((resolve, reject) => {
    imagePathToBlob('https://picsum.photos/300')
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

const getPhoneNumber = () => `+38 ${faker.phone.phoneNumber().replace(/-/g, ' ')}`;

export const getUser = async () => {
  faker.locale = 'uk';
  const randomPassword = faker.internet.password();
  return getAvatar().then((randomAvatar) => ({
    id: faker.datatype.uuid(),
    avatar: randomAvatar,
    userName: faker.internet.userName(),
    password: randomPassword,
    repeatPassword: randomPassword,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: getRandomDate(new Date(1930, 1, 1), new Date(2000, 1, 1)),
    email: faker.internet.email(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
    gender: faker.random.arrayElement(['Male', 'Female']),
    company: faker.company.companyName(),
    githubLink: `https://www.github.com/${faker.internet.domainWord()}`,
    facebookLink: `https://www.facebook.com/${faker.internet.domainWord()}`,
    mainLanguage: faker.random.arrayElement(getListValues(LANGUAGES_LIST)),
    fax: getPhoneNumber(),
    phoneNumbers: [getPhoneNumber()],
    skills: faker.random.arrayElements(SKILLS, 3),
    information: faker.lorem.sentence(),
    myHobbies: faker.random.arrayElements(HOBBIES),
    lastUpdate: getRandomDate(new Date(2021, 1, 1), new Date()),
  }));
};

export function generateFakeUsers(numberOfUsers = 50) {
  return Promise.all(Array.from({ length: numberOfUsers }, () => getUser()));
}
