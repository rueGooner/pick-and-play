import { faker } from "@faker-js/faker/locale/en_GB";

export const generateRegistrationPayload = () => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();

  return {
    firstname,
    lastname,
    email: faker.internet.email({ firstName: firstname, lastName: lastname }),
    phone: faker.phone.number({ style: "human" }),
    password: "DevPassword123!",
    confirmPassword: "DevPassword123!",
    role: faker.helpers.arrayElement(["player", "coach"]),
  };
};
