import { db } from "../database";

export const createUserService = async ({
  firstName,
  lastName,
  email,
  admissionNumber,
}: {
  firstName: string;
  lastName: string;
  email: string;
  admissionNumber: string;
}) => {
  try {
    const user = await db
      .insertInto("Student")
      .values({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        admission_number: admissionNumber,
      })
      .execute();

    return user;
  } catch (error) {
    return error;
  }
};
