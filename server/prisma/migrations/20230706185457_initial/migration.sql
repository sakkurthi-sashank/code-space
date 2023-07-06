-- CreateTable
CREATE TABLE "Professor" (
    "professor_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professor_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "course_code" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,
    "course_start_date" TIMESTAMP(3) NOT NULL,
    "course_end_date" TIMESTAMP(3) NOT NULL,
    "learning_tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "professor_id" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "admission_number" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "studentEnrolledCourse" (
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "enrollment_status" BOOLEAN NOT NULL,

    CONSTRAINT "studentEnrolledCourse_pkey" PRIMARY KEY ("student_id","course_id")
);

-- CreateTable
CREATE TABLE "CourseModule" (
    "module_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "module_name" TEXT NOT NULL,
    "module_description" TEXT NOT NULL,
    "is_full_screen_enabled" BOOLEAN NOT NULL DEFAULT false,
    "is_tab_switching_enabled" BOOLEAN NOT NULL DEFAULT false,
    "module_unit" TEXT NOT NULL,
    "module_start_date" TIMESTAMP(3) NOT NULL,
    "module_end_date" TIMESTAMP(3) NOT NULL,
    "is_result_disabled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("module_id")
);

-- CreateTable
CREATE TABLE "Section" (
    "section_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "section_name" TEXT NOT NULL,
    "is_retake_allowed" BOOLEAN NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "retake_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "CodingQuestion" (
    "coding_question_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "problem_name" TEXT NOT NULL,
    "problem_statement" TEXT NOT NULL,
    "input_format" TEXT NOT NULL,
    "output_format" TEXT NOT NULL,
    "marks" INTEGER NOT NULL DEFAULT 10,
    "section_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodingQuestion_pkey" PRIMARY KEY ("coding_question_id")
);

-- CreateTable
CREATE TABLE "TestCases" (
    "test_case_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "test_case_input" TEXT NOT NULL,
    "test_case_output" TEXT NOT NULL,
    "is_sample_testcase" BOOLEAN NOT NULL,
    "coding_question_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestCases_pkey" PRIMARY KEY ("test_case_id")
);

-- CreateTable
CREATE TABLE "MCQQuestion" (
    "mcq_question_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "question_text" TEXT NOT NULL,
    "options" TEXT[],
    "correct_answer_choice" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MCQQuestion_pkey" PRIMARY KEY ("mcq_question_id")
);

-- CreateTable
CREATE TABLE "StudentCompletedCodingQuestion" (
    "student_id" TEXT NOT NULL,
    "coding_question_id" TEXT NOT NULL,
    "completion_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCompletedCodingQuestion_pkey" PRIMARY KEY ("student_id","coding_question_id")
);

-- CreateTable
CREATE TABLE "StudentCompletedCodingQuestionTestCases" (
    "student_id" TEXT NOT NULL,
    "coding_question_id" TEXT NOT NULL,
    "test_case_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCompletedCodingQuestionTestCases_pkey" PRIMARY KEY ("student_id","coding_question_id","test_case_id")
);

-- CreateTable
CREATE TABLE "StudentCompletedMCQQuestion" (
    "student_id" TEXT NOT NULL,
    "mcq_question_id" TEXT NOT NULL,
    "answer_choice" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCompletedMCQQuestion_pkey" PRIMARY KEY ("student_id","mcq_question_id")
);

-- CreateTable
CREATE TABLE "StudentCompletedCourseModule" (
    "student_id" TEXT NOT NULL,
    "retake_count" INTEGER NOT NULL,
    "module_id" TEXT NOT NULL,
    "completion_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCompletedCourseModule_pkey" PRIMARY KEY ("student_id","module_id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor"("professor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrolledCourse" ADD CONSTRAINT "studentEnrolledCourse_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrolledCourse" ADD CONSTRAINT "studentEnrolledCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodingQuestion" ADD CONSTRAINT "CodingQuestion_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_coding_question_id_fkey" FOREIGN KEY ("coding_question_id") REFERENCES "CodingQuestion"("coding_question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQQuestion" ADD CONSTRAINT "MCQQuestion_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCodingQuestion" ADD CONSTRAINT "StudentCompletedCodingQuestion_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCodingQuestion" ADD CONSTRAINT "StudentCompletedCodingQuestion_coding_question_id_fkey" FOREIGN KEY ("coding_question_id") REFERENCES "CodingQuestion"("coding_question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCodingQuestionTestCases" ADD CONSTRAINT "StudentCompletedCodingQuestionTestCases_student_id_coding__fkey" FOREIGN KEY ("student_id", "coding_question_id") REFERENCES "StudentCompletedCodingQuestion"("student_id", "coding_question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCodingQuestionTestCases" ADD CONSTRAINT "StudentCompletedCodingQuestionTestCases_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "TestCases"("test_case_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedMCQQuestion" ADD CONSTRAINT "StudentCompletedMCQQuestion_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedMCQQuestion" ADD CONSTRAINT "StudentCompletedMCQQuestion_mcq_question_id_fkey" FOREIGN KEY ("mcq_question_id") REFERENCES "MCQQuestion"("mcq_question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCourseModule" ADD CONSTRAINT "StudentCompletedCourseModule_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompletedCourseModule" ADD CONSTRAINT "StudentCompletedCourseModule_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;
